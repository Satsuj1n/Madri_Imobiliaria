import React, { useEffect, useState } from "react";
import Navbar from "../../components_i/ui/Navbar";
import { Button } from "components_i/ui/Button";
import PropertyListing from "components_i/ui/PropertyListing";
import Footer from "components_i/ui/Footer";
import Beneficit from "components_i/ui/Beneficit";
import HeroSection from "components_i/ui/HeroSection"; // Importando o novo componente

const LandingPage = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Verifica se há uma mensagem no sessionStorage
    const successMessage = sessionStorage.getItem("message");
    if (successMessage) {
      setMessage(successMessage);

      // Remove a mensagem do sessionStorage após exibir
      sessionStorage.removeItem("message");

      // Remove a mensagem da tela após 3 segundos
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  }, []);

  return (
    <>
      <Navbar />
      <style>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
      <div className="flex min-h-screen flex-col items-center overflow-x-hidden">
        {/* Hero Section */}
        <HeroSection />

        <Beneficit />

        {/* Apply the background for the Property Listing section */}
        <div className="w-full bg-gradient-to-b from-white to-[#e7ecfd] px-4 lg:px-0">
          <PropertyListing />
        </div>

        {/* Blue section */}
        <div className="w-full bg-[#02166c] py-10 flex justify-center px-4">
          <div className="flex flex-col items-center w-full lg:w-[80%] xl:w-[1440px]">
            <h4 className="text-[#A0A3BD] text-[14px] lg:text-[16px] mb-2">
              Promessa de Não Enviar Spam
            </h4>
            <h2 className="text-white text-2xl lg:text-[32px] font-bold mb-4">
              Você é um locador?
            </h2>
            <p className="text-[#A0A3BD] mb-6 text-center text-sm lg:text-base">
              Descubra maneiras de aumentar o valor da sua propriedade e seja
              listado. Sem Spam.
            </p>

            <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-lg w-full sm:w-[400px] lg:w-[543px] p-4 sm:p-0 h-auto sm:h-[80px]">
              <input
                type="email"
                placeholder="Insira seu endereço de e-mail"
                className="w-full h-12 sm:h-full pl-4 outline-none rounded-lg text-[#100A55] mb-2 sm:mb-0"
              />
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto rounded-lg mt-2 sm:mt-0 sm:ml-2 sm:mr-4"
              >
                Inscrever-se
              </Button>
            </div>

            <p className="text-[#A0A3BD] mt-4 text-center">
              Junte-se a mais de 10.000+ outros locadores na nossa comunidade.
            </p>
          </div>
        </div>
        <Footer />
      </div>
      {/* Exibe a mensagem de sucesso no canto inferior direito */}
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
    </>
  );
};

export default LandingPage;
