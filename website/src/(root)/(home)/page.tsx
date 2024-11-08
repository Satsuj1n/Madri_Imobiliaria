import React, { useEffect, useState } from "react";
import Navbar from "../../components_i/ui/Navbar";
import { Button } from "components_i/ui/Button";
import PropertyListing from "components_i/ui/PropertyListing";
import Footer from "components_i/ui/Footer";
import Beneficit from "components_i/ui/Beneficit";
import HeroSection from "components_i/ui/HeroSection"; 
import axios from "axios";

const LandingPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailInput) {
      alert("Por favor, insira um endereço de e-mail.");
      return;
    }

    console.log("Iniciando a solicitação de inscrição com o e-mail:", emailInput);

    try {
      // Envia a requisição para o backend para o envio do e-mail
      const response = await axios.post("http://localhost:5000/api/subscribe", {
        email: emailInput,
      });

      console.log("Resposta do servidor:", response);

      if (response.status === 200) {
        setMessage("Inscrição realizada com sucesso! Confira seu e-mail.");
      } else {
        console.error("Erro inesperado na resposta:", response);
        setShowErrorPopup(true);
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail de inscrição:", error);
      setShowErrorPopup(true);
    }
  };

  return (
    <>
      <Navbar />
      <style>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
      <div className="flex min-h-screen flex-col items-center overflow-x-hidden">
        <HeroSection />
        <Beneficit />
        <div className="w-full bg-gradient-to-b from-white to-[#e7ecfd] px-4 lg:px-0">
          <PropertyListing />
        </div>
        <div className="w-full bg-[#02166c] py-10 flex justify-center px-4">
          <div className="flex flex-col items-center w-full lg:w-[80%] xl:w-[1440px]">
            <h4 className="text-[#A0A3BD] text-[14px] lg:text-[16px] mb-2">
              Promessa de Não Enviar Spam
            </h4>
            <h2 className="text-white text-2xl lg:text-[32px] font-bold mb-4">
              Você é um locador?
            </h2>
            <p className="text-[#A0A3BD] mb-6 text-center text-sm lg:text-base">
              Descubra maneiras de aumentar o valor da sua propriedade e seja listado. Sem Spam.
            </p>
            <form className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-lg w-full sm:w-[400px] lg:w-[543px] p-4 sm:p-0 h-auto sm:h-[80px]" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Insira seu endereço de e-mail"
                className="w-full h-12 sm:h-full pl-4 outline-none rounded-lg text-[#100A55] mb-2 sm:mb-0"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto rounded-lg mt-2 sm:mt-0 sm:ml-2 sm:mr-4"
                type="submit"
              >
                Inscrever-se
              </Button>
            </form>
            <p className="text-[#A0A3BD] mt-4 text-center">
              Junte-se a mais de 10.000+ outros locadores na nossa comunidade.
            </p>
          </div>
        </div>
        <Footer />
      </div>
      {message && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "#0053f8",
            fontWeight: "bold",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {message}
        </div>
      )}
      {showErrorPopup && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p className="text-black font-bold mb-4">
              Erro ao realizar a inscrição. Tente novamente.
            </p>
            <Button variant="default" onClick={() => setShowErrorPopup(false)}>
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
