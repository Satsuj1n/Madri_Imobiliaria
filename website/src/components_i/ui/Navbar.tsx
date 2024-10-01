import React from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Button } from "./Button"; // Reutilizando o componente de Button

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-40">
      <div className="container mx-auto flex justify-between items-center p-4 w-full">
        {/* Div para Logo e Madri Imobiliária */}
        <div className="flex items-center gap-2">
          <Logo className="h-10" />
          {/* Madri Imobiliária com estilos atualizados */}
          <a
            href="#"
            className="text-[#100A55] font-bold text-xl whitespace-nowrap"
            style={{ fontFamily: "Plus Jakarta Sans", lineHeight: "28px" }}
          >
            Madri Imobiliária
          </a>
        </div>

        {/* Div para Links (Alugar, Comprar, Vender, Gerenciar Propriedade) */}
        <div className="flex items-center space-x-8">
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#0053f8]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Alugar
          </a>
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#0053f8]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Comprar
          </a>
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#0053f8]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Vender
          </a>
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#0053f8]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Gerenciar Propriedade
          </a>
        </div>

        {/* Botões de Login e Cadastro */}
        <div className="flex gap-5">
          <Button variant="default">Entrar</Button>
          <Button variant="outlineDefault">Cadastrar-se</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
