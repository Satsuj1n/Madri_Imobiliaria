/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação

const Navbar = () => {
  const navigate = useNavigate(); // Inicializando a função de navegação
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar se o usuário está logado

  useEffect(() => {
    // Verificar se o usuário está logado baseado no token armazenado no localStorage
    const token = localStorage.getItem("token"); // Verifica se o token de autenticação está presente
    setIsLoggedIn(!!token); // Define isLoggedIn para true se o token existir, caso contrário false
  }, []);

  const handleLoginClick = () => {
    navigate("/login"); // Redirecionando para a página de login
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redirecionando para a página de registro
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    setIsLoggedIn(false); // Define como deslogado
    navigate("/"); // Redireciona para a página inicial
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Alternar o estado do menu
  };

  return (
    <nav className="bg-white shadow-md w-full fixed z-50">
      <div
        className="container mx-auto flex justify-between items-center p-4 md:px-8 lg:px-12"
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        {/* Logo e Nome da Marca à esquerda, ajustando distância uniforme */}
        <div className="flex items-center gap-2">
          <Logo className="h-8 md:h-10 lg:h-9 ml-2 md:ml-4 lg:ml-6" />
          <a
            href="#"
            className="text-[#100A55] font-bold text-xl md:text-xl lg:text-2xl whitespace-nowrap"
            style={{ fontFamily: "Plus Jakarta Sans", lineHeight: "1.2" }}
          >
            Madri Imobiliária
          </a>
        </div>

        {/* Links centrais visíveis em telas maiores */}
        <div
          className={`hidden md:flex items-center justify-center gap-8 ${
            isOpen ? "hidden" : ""
          }`}
        >
          <a href="#" className="text-sm md:text-base lg:text-md text-gray-700">
            Alugar
          </a>
          <a href="#" className="text-sm md:text-base lg:text-md text-gray-700">
            Comprar
          </a>
          <a href="#" className="text-sm md:text-base lg:text-md text-gray-700">
            Vender
          </a>
          <a href="#" className="text-sm md:text-base lg:text-md text-gray-700">
            Gerenciar
          </a>
        </div>

        {/* Exibe "Entrar" e "Cadastrar-se" se o usuário NÃO estiver logado */}
        {!isLoggedIn && (
          <div
            className={`hidden md:flex items-center gap-4 mr-2 md:mr-4 lg:mr-6 ${
              isOpen ? "hidden" : ""
            }`}
          >
            <Button variant="default" onClick={handleLoginClick}>
              Entrar
            </Button>
            <Button variant="outlineDefault" onClick={handleRegisterClick}>
              Cadastrar-se
            </Button>
          </div>
        )}

        {/* Exibe o botão "Sair" se o usuário estiver logado */}
        {isLoggedIn && (
          <div
            className={`hidden md:flex items-center gap-4 mr-2 md:mr-4 lg:mr-6 ${
              isOpen ? "hidden" : ""
            }`}
          >
            <Button variant="outlineDefault" onClick={handleLogoutClick}>
              Sair
            </Button>
          </div>
        )}

        {/* Menu hamburguer para mobile */}
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown menu para dispositivos móveis */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col items-center gap-4 p-4">
            <a href="#" className="text-sm">
              Alugar
            </a>
            <a href="#" className="text-sm">
              Comprar
            </a>
            <a href="#" className="text-sm">
              Vender
            </a>
            <a href="#" className="text-sm">
              Gerenciar Propriedade
            </a>

            {/* Exibe "Entrar" e "Cadastrar-se" se o usuário NÃO estiver logado */}
            {!isLoggedIn && (
              <>
                <Button
                  onClick={handleLoginClick}
                  className="w-[90%] mx-[5%] py-2 text-white bg-blue-500 hover:bg-blue-700 text-sm font-semibold rounded-md shadow-md transition"
                >
                  Login
                </Button>
                <Button
                  onClick={handleRegisterClick}
                  className="w-[90%] mx-[5%] py-2 text-white bg-blue-500 hover:bg-blue-700 text-sm font-semibold rounded-md shadow-md transition"
                >
                  Registrar
                </Button>
              </>
            )}

            {/* Exibe o botão "Sair" se o usuário estiver logado */}
            {isLoggedIn && (
              <Button
                onClick={handleLogoutClick}
                className="w-[90%] mx-[5%] py-2 text-white bg-red-500 hover:bg-red-700 text-sm font-semibold rounded-md shadow-md transition"
              >
                Sair
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
