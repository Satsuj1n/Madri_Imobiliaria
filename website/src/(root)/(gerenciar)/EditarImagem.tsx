import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { button } from "../../components_i/ui/button";
import { ProgressBar } from "components_i/ui/ProgressBar";
import { ReactComponent as LoadingIcon } from "../../assets/icons/loading.svg"; // Ícone de carregamento

interface ImageInfo {
  url: string;
  isPrincipal: boolean;
}

const EditarImagem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imagePrincipal, setImagePrincipal] = useState<ImageInfo | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(false); // Estado de carregamento

  useEffect(() => {
    fetchImages();
  }, [id, navigate]);

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
      const response = await fetch(`http://localhost:5000/api/imoveis/${id}`, {
        headers: {
          Authorization: formattedToken,
        },
      });

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

  const handleRemoveImage = async (image: ImageInfo) => {
    console.log("Imagem removida:", image.url);

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não encontrado!");
      navigate("/login");
      return;
    }

    const formattedToken = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;

    // Atualiza o estado local antes de enviar para o backend
    if (image.isPrincipal) {
      console.log("Removendo imagem principal");
      setImagePrincipal(null);
    } else {
      console.log("Removendo imagem secundária");
      setSecondaryImages((prevImages) =>
        prevImages.filter((img) => img.url !== image.url)
      );
    }

    // Envia a atualização para o backend usando o sufixo '/editar'
    const updatedData = {
      imagemPrincipal: image.isPrincipal ? null : imagePrincipal?.url,
      outrasImagens: secondaryImages
        .filter((img) => img.url !== image.url)
        .map((img) => img.url),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/imoveis/${id}/editar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: formattedToken,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao remover imagem no backend");
      }

      console.log("Imagem removida com sucesso no backend");
    } catch (error) {
      console.error("Erro ao remover imagem:", error);
      alert("Erro ao remover imagem. Tente novamente.");
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
        body: formData, // FormData sendo enviado diretamente no corpo
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar imagem");
      }

      const data = await response.json();
      console.log("Resposta do backend após adicionar imagem:", data);

      // Atualiza o estado local com a nova imagem ou recarrega as imagens
      if (isPrincipal) {
        if (data.imagemPrincipal) {
          setImagePrincipal({ url: data.imagemPrincipal, isPrincipal: true });
        } else {
          console.error("Nenhuma URL para imagem principal retornada.");
          fetchImages(); // Recarrega imagens em caso de inconsistência
        }
      } else {
        if (data.novaImagem) {
          setSecondaryImages((prevImages) => [
            ...prevImages,
            { url: data.novaImagem, isPrincipal: false },
          ]);
        } else {
          console.error("Nenhuma URL para imagem secundária retornada.");
          fetchImages(); // Recarrega imagens em caso de inconsistência
        }
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
      alert("Você não está autenticado. Faça login novamente.");
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

    console.log("Dados enviados para o backend:", updatedData);

    setLoading(true); // Inicia o estado de carregamento

    try {
      const response = await fetch(`http://localhost:5000/api/imoveis/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: formattedToken,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        sessionStorage.setItem(
          "messageSucesso",
          "Imovel atualizado com sucesso"
        );
        navigate(`/imovel/${id}`);
      } else if (response.status === 401) {
        console.error(
          "Token inválido ou expirado. Redirecionando para o login."
        );
        alert("Sessão expirada. Por favor, faça login novamente.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Erro ao atualizar imagens:", errorData);
        alert(
          "Erro ao atualizar imagens. Verifique os dados e tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar imagens:", error);
      alert("Erro ao atualizar imagens. Tente novamente mais tarde.");
    } finally {
      setLoading(false); // Para o estado de carregamento
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

        {/* Ícone de carregamento enquanto o estado loading estiver ativo */}
        {loading && (
          <div className="flex justify-center items-center mt-12">
            <LoadingIcon className="w-12 h-12 animate-spin" />
          </div>
        )}

        {/* Conteúdo do formulário de edição de imagens */}
        {!loading && (
          <div>
            <div className="mb-4 w-full max-w-md text-center mx-auto">
              <h2 className="font-bold mb-2">Imagem Principal</h2>
              {imagePrincipal ? (
                <div className="relative">
                  <img
                    src={imagePrincipal.url}
                    alt="Imagem Principal"
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => handleRemoveImage(imagePrincipal)}
                    className="absolute top-2 left-2 bg-red-600 text-white font-bold rounded-full p-1 px-2"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-blue-500 rounded-lg p-6 text-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleAddImage(e, true)}
                    accept="image/*"
                  />
                  Clique aqui para selecionar a imagem principal
                </label>
              )}
            </div>
            <div className="col-span-2 mt-8">
              <h2 className="font-bold mb-2 text-center">
                Outras Imagens (Máximo de 10)
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {secondaryImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt="Imagem Secundária"
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                    <button
                      onClick={() => handleRemoveImage(image)}
                      className="absolute top-2 left-2 bg-red-600 text-white rounded-full p-1 px-2"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <label className="block border-2 border-dashed border-blue-500 rounded-lg p-6 text-center cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleAddImage(e, false)}
                    accept="image/*"
                    multiple
                  />
                  Clique aqui para selecionar várias imagens
                </label>
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <button
                variant="default"
                onClick={updateImages}
                disabled={loading}
              >
                Salvar e Concluir
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EditarImagem;
