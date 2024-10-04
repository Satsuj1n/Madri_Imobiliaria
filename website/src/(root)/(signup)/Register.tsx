import React from "react";
import { Button } from "../../components_i/ui/Button"; // Certifique-se de ajustar o caminho para o seu componente Button
import { ReactComponent as GoogleIcon } from "../../assets/icons/googleIcon.svg"; // Ajuste o caminho do ícone do Google
import { ReactComponent as Logo } from "../../assets/icons/logo.svg"; // Ajuste o caminho do seu logo
import { useNavigate } from "react-router-dom"; // Importando o hook useNavigate

const Register = () => {
    const navigate = useNavigate(); // Inicializando o hook de navegação

    const handleLoginClick = () => {
        navigate("/login"); // Redirecionando para a página de login
    };

    const handleLogoClick = () => {
        navigate("/"); // Redirecionando para a LandingPage
    };

    return (
      <div className="min-h-screen flex flex-row">
        {/* Container esquerdo com o formulário de registro */}
        <div className="w-1/2 bg-white flex flex-col">
          {/* Navbar com Logo e Título */}
          <header className="bg-white w-full flex justify-start items-center p-4 shadow-md relative z-10">
            <div className="flex items-center gap-2 ml-8 cursor-pointer" onClick={handleLogoClick}>
              <Logo className="h-8" />
              <span className="text-[#100A55] font-bold text-xl whitespace-nowrap">
                Madri Imobiliária
              </span>
            </div>
          </header>
  
          {/* Linha separadora */}
          <div className="w-full h-[1.5px] bg-[#E8E6F9] z-10 relative"></div>
  
          {/* Corpo da página de registro */}
          <div className="flex flex-grow justify-center items-center p-16 z-10">
            <form className="w-full max-w-sm">
              <h2 className="text-[#100A55] font-bold text-3xl mb-2">
                Crie sua conta
              </h2>
              <p className="text-[#6C727F] mb-8">
                Por favor, insira as informações abaixo para criar sua conta.
              </p>
  
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="name">
                  Nome
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                  type="text"
                  id="name"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="cpf">
                  CPF
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                  type="text"
                  id="cpf"
                  placeholder="Seu CPF"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                  type="email"
                  id="email"
                  placeholder="seuemail@exemplo.com"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                  Senha
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                  type="password"
                  id="password"
                  placeholder="Digite sua senha"
                />
              </div>
  
              <Button variant="default" size='lg' className="w-full mb-4">Cadastrar-se</Button>
              <Button variant="google" size="google" className="w-full">
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google Logo"
                  className="h-5 w-5"
                />
                Cadastrar-se com o Google
              </Button>
  
              <p className="mt-6 text-sm text-gray-500">
                Já tem uma conta?{" "}
                <a href="#" className="text-[#0053f8]" onClick={handleLoginClick}>
                  Faça login aqui
                </a>
              </p>
            </form>
          </div>
        </div>
  
        {/* Container direito com a imagem */}
        <div className="w-1/2 relative">
          <img
            src="https://i.imgur.com/Fm1WD6Q.png" // Adicione a URL da imagem desejada
            alt="Informações"
            className="absolute top-0 left-0 w-full h-[100%] object-fill"
            style={{ zIndex: -1 }}
          />
        </div>
      </div>
    );
  };
  
export default Register;
