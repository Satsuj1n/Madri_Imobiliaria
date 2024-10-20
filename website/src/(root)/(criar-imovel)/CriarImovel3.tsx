import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { Button } from "../../components_i/ui/Button";
import { ProgressBar } from "components_i/ui/ProgressBar"; // Importando a barra de progresso

const AdicionarImagens = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { imovelId } = location.state || {};

  const [imagemPrincipal, setImagemPrincipal] = useState<File | null>(null);
  const [outrasImagens, setOutrasImagens] = useState<File[]>([]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isPrincipal: boolean = false
  ) => {
    const files = e.target.files;
    if (files) {
      if (isPrincipal) {
        setImagemPrincipal(files[0]); // Define a imagem principal
      } else {
        const newImages = Array.from(files).slice(0, 10); // Limita a 10 imagens
        setOutrasImagens((prev) => [...prev, ...newImages]); // Adiciona novas imagens ao array
      }
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que o botão "Voltar" dispare o envio do formulário
    navigate("/criar-imovel/2");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      return;
    }

    const formattedToken = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;

    // Criar um FormData para enviar o arquivo e os dados do formulário
    const formData = new FormData();

    if (imagemPrincipal) {
      formData.append("imagemPrincipal", imagemPrincipal);
    }

    if (outrasImagens.length > 0) {
      outrasImagens.forEach((imagem) => {
        formData.append("outrasImagens", imagem);
      });
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/imoveis/${imovelId}`,
        {
          method: "PUT",
          headers: {
            Authorization: formattedToken,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Imagens adicionadas:", responseData);
        navigate("/"); // Redireciona para a home após o upload
      } else {
        const errorData = await response.json();
        console.error("Erro ao adicionar imagens:", errorData);
      }
    } catch (error) {
      console.error("Erro ao adicionar imagens:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mb-80">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-24">
          Adicionar Imagens ao Imóvel
        </h1>

        {/* Inclui a barra de progresso */}
        <ProgressBar step={3} />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          {/* Estilizando o box de upload com mais arredondado e com visualização */}
          <div className="mb-4 w-full max-w-md text-center">
            <label className="block text-lg font-medium mb-2">
              Imagem Principal
            </label>
            <div className="border-2 border-dashed border-blue-500 rounded-lg p-4 cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, true)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-gray-500">
                {imagemPrincipal
                  ? "Imagem selecionada"
                  : "Clique aqui para selecionar a imagem principal"}
              </span>
            </div>

            {/* Pré-visualização da imagem principal */}
            {imagemPrincipal && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(imagemPrincipal)}
                  alt="Imagem Principal"
                  className="rounded-lg w-64 h-64 object-cover mx-auto"
                />
              </div>
            )}
          </div>

          {/* Outras imagens */}
          <div className="mb-4 w-full max-w-md text-center">
            <label className="block text-lg font-medium mb-2">
              Outras Imagens (Máximo de 10)
            </label>
            <div className="border-2 border-dashed border-blue-500 rounded-lg p-4 cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageChange(e, false)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="text-gray-500">
                {outrasImagens.length > 0
                  ? `${outrasImagens.length} imagens selecionadas`
                  : "Clique aqui para selecionar várias imagens"}
              </span>
            </div>

            {/* Pré-visualização das outras imagens */}
            {outrasImagens.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {outrasImagens.map((imagem, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(imagem)}
                    alt={`Outras Imagens ${index + 1}`}
                    className="rounded-lg w-32 h-32 object-cover"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between w-full max-w-md">
            <Button variant="default" onClick={handleBack}>
              Voltar
            </Button>
            <Button variant="default" type="submit">
              Criar Imóvel
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AdicionarImagens;
