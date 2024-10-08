/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Button } from "../../components_i/ui/Button";
import { ReactComponent as GoogleIcon } from "../../assets/icons/googleIcon.svg";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importando Axios para as requisições

const Login = () => {
  const navigate = useNavigate();

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  // Estado para armazenar o erro e controlar o estilo dos inputs
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState({
    email: false,
    senha: false,
  });

  // Função para lidar com as mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Resetar o erro ao digitar novamente
    setInputError({
      ...inputError,
      [e.target.name]: false,
    });
    setError(null);
  };

  // Função para lidar com o envio do formulário e integração com o backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // Exibir a resposta do backend no console
      console.log("Resposta do backend:", response.data);

      // Salvando o token no localStorage
      localStorage.setItem("token", response.data.token); // Armazena o token

      // Redirecionar para a página inicial
      navigate("/");

      // Atualize a página para refletir o novo estado de login
      window.location.reload(); // Recarrega a página para atualizar o estado da Navbar
    } catch (err) {
      // Capturar e exibir o erro
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        console.error("Erro de autenticação:", err.response.data.message);
        setError("Email ou senha incorretos.");
        setInputError({ email: true, senha: true }); // Define erro nos inputs
      } else {
        console.error("Erro desconhecido:", err);
        setError("Ocorreu um erro ao fazer login. Tente novamente.");
      }
    }
  };

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
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <Logo className="h-8" />
          <span className="text-[#100A55] font-bold text-xl whitespace-nowrap">
            Madri Imobiliária
          </span>
        </div>
      </header>

      {/* Box de login */}
      <div className="flex-grow flex justify-center items-center w-full">
        <div
          className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 mt-8 mx-4 flex flex-col items-center 
                        md:bg-white md:rounded-lg md:shadow-lg"
        >
          <h2 className="text-[#100A55] font-bold text-3xl mb-2 text-center">
            Bem-vindo de volta
          </h2>
          <p className="text-[#6C727F] mb-8 text-center">
            Por favor, insira suas credenciais abaixo.
          </p>

          {/* Mensagem de erro, se houver */}
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                ${
                  inputError.email
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#0053f8]"
                } bg-[#f9fbff]`}
                type="email"
                id="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="senha"
              >
                Senha
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                ${
                  inputError.senha
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#0053f8]"
                } bg-[#f9fbff]`}
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>

            <a
              href="#"
              className="text-sm text-[#0053f8] mb-4 inline-block text-center"
            >
              Esqueceu a senha?
            </a>

            <Button
              variant="default"
              size="lg"
              className="w-full mb-4"
              type="submit"
            >
              Entrar
            </Button>
            <Button
              variant="google"
              size="google"
              className="w-full flex items-center justify-center"
            >
              <GoogleIcon className="h-5 w-5 mr-2" />
              Entrar com o Google
            </Button>

            <p className="mt-6 text-sm text-gray-500 text-center">
              Não tem uma conta?{" "}
              <a
                href="#"
                className="text-[#0053f8]"
                onClick={handleRegisterClick}
              >
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
