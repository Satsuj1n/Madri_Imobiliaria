/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

interface Cliente {
  nomeRazaoSocial: string;
  email: string;
  cpfCnpj: string;
  telefone: string;
  relacionamento: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cliente, setCliente] = useState<Cliente | null>(null); // Estado para armazenar os dados do cliente
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1])); // Extrai o payload do token
      const userId = payload.id; // Obtém o ID do cliente do token

      // Fazer requisição para buscar o cliente pelo ID
      fetch(`http://localhost:5000/api/clientes/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Erro ao buscar o cliente autenticado");
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.nomeRazaoSocial) {
            setCliente(data); // Atualiza com os dados do cliente logado
            setIsLoggedIn(true); // Marca como logado
          }
        })
        .catch((err) =>
          console.error("Erro ao buscar cliente autenticado:", err)
        );
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCliente(null); // Limpa os dados do cliente ao fazer logout
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Redireciona para a página de perfil
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleVenderClick = () => {
    navigate("/criar-imovel/1");
  };

  return (
    <nav className="bg-white shadow-md w-full fixed z-50">
      <div
        className="container mx-auto flex justify-between items-center p-4 md:px-8 lg:px-12"
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        {/* Logo e Nome da Marca à esquerda */}
        <div className="flex items-center gap-2">
          <Logo className="h-8 md:h-10 lg:h-9 ml-2 md:ml-4 lg:ml-6" />
          <a
            href="/"
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
          <a
            href=""
            onClick={handleVenderClick}
            className="text-sm md:text-base lg:text-md text-gray-700"
          >
            Vender
          </a>
          <a href="#" className="text-sm md:text-base lg:text-md text-gray-700">
            Gerenciar
          </a>
        </div>

        {/* Se o usuário estiver logado */}
        {isLoggedIn && cliente && (
          <div
            className="relative hidden md:flex items-center gap-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            {/* Círculo com as iniciais do usuário */}
            <div className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full">
              {cliente.nomeRazaoSocial.charAt(0)} {/* Inicial do nome */}
            </div>
            {/* Nome do usuário */}
            <span className="text-gray-700 text-sm md:text-base lg:text-md">
              {cliente.nomeRazaoSocial.split(" ")[0]} {/* Primeiro nome */}
            </span>
            <svg
              className="w-4 h-4 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>

            {/* Dropdown do usuário */}
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
                style={{ marginTop: "165px" }} // Ajuste de posição para que o dropdown fique abaixo
              >
                <a
                  href="#"
                  onClick={handleProfileClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Meu Perfil
                </a>
                <a
                  href="#"
                  onClick={handleLogoutClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sair
                </a>
              </div>
            )}
          </div>
        )}

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

            {/* Exibe "Meu Perfil" e "Sair" se o usuário estiver logado */}
            {isLoggedIn && (
              <>
                <a
                  href="#"
                  onClick={handleProfileClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Meu Perfil
                </a>
                <Button
                  onClick={handleLogoutClick}
                  className="w-[90%] mx-[5%] py-2 text-white bg-[#0053f8] hover:bg-[#003297] text-sm font-semibold rounded-md shadow-md transition"
                >
                  Sair
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
