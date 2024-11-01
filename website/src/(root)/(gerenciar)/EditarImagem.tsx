import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { Button } from "../../components_i/ui/Button";
import { ProgressBar } from "components_i/ui/ProgressBar";

interface ImageInfo {
  url: string;
  isPrincipal: boolean;
}

const EditarImagem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imagePrincipal, setImagePrincipal] = useState<ImageInfo | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<ImageInfo[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token não encontrado!");
        navigate("/login");
        return;
      }

      const formattedToken = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;

      try {
        const response = await fetch(
          `http://localhost:5000/api/imoveis/${id}`,
          {
            headers: {
              Authorization: formattedToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro ao buscar imagens: ${response.statusText}`);
        }

        const data = await response.json();
        setImagePrincipal(
          data.imagemPrincipal
            ? { url: data.imagemPrincipal, isPrincipal: true }
            : null
        );
        setSecondaryImages(
          data.outrasImagens
            ? data.outrasImagens.map((img: string) => ({
                url: img,
                isPrincipal: false,
              }))
            : []
        );
      } catch (error) {
        console.error("Erro ao carregar imagens:", error);
        alert("Erro ao carregar imagens do imóvel.");
      }
    };

    fetchImages();
  }, [id, navigate]);

  const handleRemoveImage = (image: ImageInfo) => {
    if (image.isPrincipal) {
      setImagePrincipal(null);
    } else {
      setSecondaryImages((prevImages) =>
        prevImages.filter((img) => img.url !== image.url)
      );
    }
  };

  const handleAddImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    isPrincipal: boolean
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append(isPrincipal ? "imagemPrincipal" : "outrasImagens", file);

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      navigate("/login");
      return;
    }

    const formattedToken = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;

    try {
      const response = await fetch(`http://localhost:5000/api/imoveis/${id}`, {
        method: "PUT",
        headers: {
          Authorization: formattedToken,
        },
        body: formData,
      });

      const data = await response.json();
      if (isPrincipal) {
        setImagePrincipal({ url: data.imagemPrincipal, isPrincipal: true });
      } else {
        setSecondaryImages((prevImages) => [
          ...prevImages,
          { url: data.novaImagem, isPrincipal: false },
        ]);
      }
    } catch (error) {
      console.error("Erro ao adicionar imagem:", error);
      alert("Erro ao adicionar imagem. Tente novamente.");
    }
  };

  const updateImages = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      navigate("/login");
      return;
    }

    const formattedToken = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;

    const updatedData = {
      imagemPrincipal: imagePrincipal ? imagePrincipal.url : null,
      outrasImagens: secondaryImages.map((img) => img.url),
    };

    try {
      const response = await fetch(`http://localhost:5000/api/imoveis/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: formattedToken,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar imagens");
      }

      alert("Imagens atualizadas com sucesso!");
      navigate("/gerenciar");
    } catch (error) {
      console.error("Erro ao atualizar imagens:", error);
      alert("Erro ao salvar imagens. Tente novamente.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-24">
          Editar Imagens do Imóvel
        </h1>
        <ProgressBar step={3} mode="editar" />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h2 className="font-bold mb-2">Imagem Principal</h2>
            {imagePrincipal ? (
              <div className="relative">
                <img
                  src={imagePrincipal.url}
                  alt="Imagem Principal"
                  className="w-full h-64 object-cover rounded"
                />
                <button
                  onClick={() => handleRemoveImage(imagePrincipal)}
                  className="absolute top-2 left-2 bg-red-600 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ) : (
              <label className="block border border-gray-300 rounded p-4 text-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleAddImage(e, true)}
                  accept="image/*"
                />
                Adicionar Imagem Principal
              </label>
            )}
          </div>
          <div className="col-span-2">
            <h2 className="font-bold mb-2">Imagens Secundárias</h2>
            <div className="grid grid-cols-2 gap-4">
              {secondaryImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt="Imagem Secundária"
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={() => handleRemoveImage(image)}
                    className="absolute top-2 left-2 bg-red-600 text-white rounded-full p-1"
                  >
                    X
                  </button>
                </div>
              ))}
              <label className="block border border-gray-300 rounded p-4 text-center cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleAddImage(e, false)}
                  accept="image/*"
                />
                Adicionar Imagem Secundária
              </label>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button variant="default" onClick={updateImages}>
            Salvar e Concluir
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditarImagem;
