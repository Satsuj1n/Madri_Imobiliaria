import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { Button } from "../../components_i/ui/Button";

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
        setOutrasImagens(Array.from(files)); // Define as outras imagens
      }
    }
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
      console.log("Imagem principal adicionada:", imagemPrincipal);
    }

    if (outrasImagens.length > 0) {
      outrasImagens.forEach((imagem, index) => {
        formData.append("outrasImagens", imagem);
        console.log(`Imagem adicional ${index + 1} adicionada:`, imagem);
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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-24">
          Adicionar Imagens ao Imóvel
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Imagem Principal</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, true)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mb-4">
            <label>Outras Imagens</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e, false)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div className="mt-8 flex justify-between">
            <Button variant="default" onClick={() => navigate("/")}>
              Cancelar
            </Button>
            <Button variant="default" type="submit">
              Enviar Imagens
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AdicionarImagens;
