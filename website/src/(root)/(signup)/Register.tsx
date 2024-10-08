/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Button } from "../../components_i/ui/Button";
import { ReactComponent as GoogleIcon } from "../../assets/icons/googleIcon.svg";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Adicionando Axios para requisições HTTP

const Register = () => {
  const navigate = useNavigate();

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nomeRazaoSocial: "",
    cpfCnpj: "",
    email: "",
    senha: "",
    telefone: "",
    relacionamento: "", // Adicionando relacionamento ao estado
  });

  // Estado para controlar erros e mensagens de erro
  const [error, setError] = useState<string | null>(null);
  const [inputError, setInputError] = useState({
    cpfCnpj: false,
    email: false,
    telefone: false,
  });

  // Função para verificar se o CPF ou CNPJ é válido
  const isValidCpfCnpj = (value: string): boolean => {
    const onlyNumbers = value.replace(/\D/g, ""); // Remover qualquer caractere que não seja número
    return onlyNumbers.length === 11 || onlyNumbers.length === 14; // CPF: 11 dígitos, CNPJ: 14 dígitos
  };

  // Função para verificar se o email é válido
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para verificar se o número de telefone é válido (11 dígitos com DDD)
  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^\d{11}$/; // Verificar se tem exatamente 11 números
    return phoneRegex.test(phone.replace(/\D/g, "")); // Remover caracteres não numéricos e testar
  };

  // Função para lidar com a mudança dos inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  // Função para lidar com o submit do formulário e enviar os dados para o backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validações de CPF/CNPJ, email e telefone
    if (!isValidCpfCnpj(formData.cpfCnpj)) {
      setError(
        "CPF ou CNPJ inválido. Verifique se está correto e contém apenas números."
      );
      setInputError({ cpfCnpj: true, email: false, telefone: false });
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Email inválido. Verifique o formato.");
      setInputError({ cpfCnpj: false, email: true, telefone: false });
      return;
    }

    if (!isValidPhone(formData.telefone)) {
      setError(
        "Telefone inválido. Certifique-se de incluir o DDD e ter 11 dígitos."
      );
      setInputError({ cpfCnpj: false, email: false, telefone: true });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      // Exibir a resposta do backend no console
      console.log("Resposta do backend:", response.data);

      // Redirecionar para a página de login após o registro bem-sucedido
      navigate("/login");
    } catch (err) {
      // Verificar o erro detalhadamente
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        const errorMessage = err.response.data.message;

        if (errorMessage.includes("CPF") || errorMessage.includes("CNPJ")) {
          console.error("Erro de CPF/CNPJ duplicado:", errorMessage);
          setError("O CPF ou CNPJ já existe.");
          setInputError({ cpfCnpj: true, email: false, telefone: false });
        } else if (errorMessage.includes("email")) {
          console.error("Erro de email duplicado:", errorMessage);
          setError("O email já existe.");
          setInputError({ cpfCnpj: false, email: true, telefone: false });
        } else {
          console.error("Erro desconhecido:", errorMessage);
          setError(
            "Erro ao registrar. Verifique as informações e tente novamente."
          );
        }
      } else {
        console.error("Erro desconhecido:", err);
        setError(
          "Erro ao registrar. Verifique as informações e tente novamente."
        );
      }
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
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

      {/* Box de registro */}
      <div className="flex-grow flex justify-center items-center w-full">
        <div
          className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 mt-8 mx-4 flex flex-col items-center 
                        md:bg-white md:rounded-lg md:shadow-lg"
        >
          <h2 className="text-[#100A55] font-bold text-3xl mb-2 text-center">
            Crie sua conta
          </h2>
          <p className="text-[#6C727F] mb-8 text-center">
            Por favor, insira as informações abaixo para criar sua conta.
          </p>

          {/* Mensagem de erro, se houver */}
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="nomeRazaoSocial"
              >
                Nome/Razão Social
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                type="text"
                id="nomeRazaoSocial"
                name="nomeRazaoSocial"
                placeholder="Seu nome completo"
                value={formData.nomeRazaoSocial}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="cpfCnpj"
              >
                CPF/CNPJ
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                ${
                  inputError.cpfCnpj
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#0053f8]"
                } bg-[#f9fbff]`}
                type="text"
                id="cpfCnpj"
                name="cpfCnpj"
                placeholder="Seu CPF ou CNPJ"
                value={formData.cpfCnpj}
                onChange={handleChange}
                required
              />
            </div>

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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                type="password"
                id="senha"
                name="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="telefone"
              >
                Telefone
              </label>
              <input
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 
                ${
                  inputError.telefone
                    ? "border-red-500 focus:ring-red-500"
                    : "focus:ring-[#0053f8]"
                } bg-[#f9fbff]`}
                type="text"
                id="telefone"
                name="telefone"
                placeholder="Seu telefone (inclua DDD)"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm mb-2"
                htmlFor="relacionamento"
              >
                Relacionamento
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                id="relacionamento"
                name="relacionamento"
                value={formData.relacionamento}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma opção</option>
                <option value="locador">Locador</option>
                <option value="locatário">Locatário</option>
                <option value="proprietário">Proprietário</option>
                <option value="fiador">Fiador</option>
              </select>
            </div>

            <Button
              variant="default"
              size="lg"
              className="w-full mb-4"
              type="submit"
            >
              Cadastrar-se
            </Button>
            <Button
              variant="google"
              size="google"
              className="w-full flex items-center justify-center"
            >
              <GoogleIcon className="h-5 w-5 mr-2" />
              Cadastrar-se com o Google
            </Button>

            <p className="mt-6 text-sm text-gray-500 text-center">
              Já tem uma conta?{" "}
              <a href="#" className="text-[#0053f8]" onClick={handleLoginClick}>
                Faça login aqui
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
