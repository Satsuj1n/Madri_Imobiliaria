import React from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação

const Navbar = () => {
  const navigate = useNavigate(); // Inicializando a função de navegação

  const handleLoginClick = () => {
    navigate("/login"); // Redirecionando para a página de login
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redirecionando para a página de registro (opcional)
  };

  return (
    <nav className="bg-white shadow-md w-full fixed z-50">
      <div className="container flex justify-between items-center p-4">
        {/* Div para Logo e Madri Imobiliária */}
        <div className="flex items-center gap-2">
          <Logo className="h-8 ml-40" />
          <a
            href="#"
            className="text-[#100A55] font-bold text-xl whitespace-nowrap"
            style={{ fontFamily: "Plus Jakarta Sans", lineHeight: "28px" }}
          >
            Madri Imobiliária
          </a>
        </div>

        {/* Div para Links (Alugar, Comprar, Vender, Gerenciar Propriedade) */}
        <div className="flex items-center space-x-8 ml-8">
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#7065F0]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Alugar
          </a>
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#7065F0]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Comprar
          </a>
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#7065F0]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Vender
          </a>
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#7065F0]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Gerenciar Propriedade
          </a>
        </div>

        {/* Botões de Entrar e Cadastrar */}
        <div className="flex items-center gap-5">
          <Button variant="default" onClick={handleLoginClick}>
            Entrar
          </Button>
          <Button variant="outlineDefault" onClick={handleRegisterClick}>
            Cadastrar-se
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
