import React from "react";
import { Button } from "../../components_i/ui/Button";
import { ReactComponent as GoogleIcon } from "../../assets/icons/googleIcon.svg";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Navbar fake */}
      <header className="bg-white w-full shadow-md border-b border-gray-200 px-8 py-4 flex items-center justify-start">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <Logo className="h-8" />
          <span className="text-[#100A55] font-bold text-xl whitespace-nowrap">Madri Imobiliária</span>
        </div>
      </header>

      {/* Box de login */}
      <div className="flex-grow flex justify-center items-center w-full">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 mt-8 mx-4 flex flex-col items-center 
                        md:bg-white md:rounded-lg md:shadow-lg">
          <h2 className="text-[#100A55] font-bold text-3xl mb-2 text-center">
            Bem-vindo de volta
          </h2>
          <p className="text-[#6C727F] mb-8 text-center">
            Por favor, insira suas credenciais abaixo.
          </p>
          <form className="w-full space-y-4">
            <div>
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

            <div>
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

            <a href="#" className="text-sm text-[#0053f8] mb-4 inline-block text-center">
              Esqueceu a senha?
            </a>

            <Button variant="default" size="lg" className="w-full mb-4">
              Entrar
            </Button>
            <Button variant="google" size="google" className="w-full flex items-center justify-center">
              <GoogleIcon className="h-5 w-5 mr-2" />
              Entrar com o Google
            </Button>

            <p className="mt-6 text-sm text-gray-500 text-center">
              Não tem uma conta?{" "}
              <a href="#" className="text-[#0053f8]" onClick={handleRegisterClick}>
                Cadastre-se aqui
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
