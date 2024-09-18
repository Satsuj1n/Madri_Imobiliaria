import React from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Button } from "./Button"; // Reutilizando o componente de Button

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0">
      <div className="container mx-auto flex justify-between items-center p-4 w-full">
        {/* Div para Logo e Estatery */}
        <div className="flex items-center gap-2">
          <Logo className="h-8" />
          {/* Estatery com estilos atualizados */}
          <a
            href="#"
            className="text-[#100A55] font-bold text-xl"
            style={{ fontFamily: "Plus Jakarta Sans", lineHeight: "28px" }}
          >
            Madri Imobiliária
          </a>
        </div>

        {/* Div para Links (Rent, Buy, Sell, Manage Property) */}
        <div className="flex items-center space-x-8">
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#7065F0]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Rent
          </a>
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#7065F0]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Buy
          </a>
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#7065F0]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Sell
          </a>
          <a
            href="#"
            className="text-[#000929] font-medium text-sm hover:text-[#7065F0]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Manage Property
          </a>
        </div>

        {/* Botões de Login e Sign up */}
        <div className="flex gap-5">
          <Button variant="default">Login</Button>
          <Button variant="outlineDefault">Sign up</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
