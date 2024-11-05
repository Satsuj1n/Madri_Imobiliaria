import React, { useState } from "react";
import { Button } from "../../components_i/ui/Button";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoveryContext } from "./RecoveryContext";

const EsqueciSenha = () => {
  const { setEmail, setOtp } = useRecoveryContext(); // Inclui setOtp aqui
  const [emailInput, setEmailInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return alert("Por favor, insira seu email.");

    try {
      // Envia a requisição para enviar o e-mail de recuperação
      const response = await axios.post("http://localhost:5000/api/clientes/send_recovery_email", {
        email: emailInput,
      });

      // Armazena o email e o OTP no contexto
      setEmail(emailInput);
      setOtp(response.data.otp); // Armazena o OTP recebido no contexto
      console.log("OTP recebido e armazenado no contexto:", response.data.otp); // Para depuração

      // Navega para a página de verificação de OTP
      navigate("/verificar-otp");
    } catch (error) {
      console.error("Erro ao enviar e-mail de recuperação:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <header className="bg-white w-full shadow-md border-b border-gray-200 px-8 py-4 flex items-center justify-start">
        <div className="flex items-center gap-2 cursor-pointer">
          <Logo className="h-8" />
          <span className="text-[#100A55] font-bold text-xl whitespace-nowrap">
            Madri Imobiliária
          </span>
        </div>
      </header>

      <div className="flex-grow flex justify-center items-center w-full">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 mt-8 mx-4 flex flex-col items-center md:bg-white md:rounded-lg md:shadow-lg">
          <h2 className="text-[#100A55] font-bold text-3xl mb-2 text-center">
            Recuperar Senha
          </h2>
          <p className="text-[#6C727F] mb-8 text-center">
            Insira seu e-mail para receber o código de verificação.
          </p>

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                type="email"
                id="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
            </div>

            <Button variant="default" size="lg" className="w-full mb-4" type="submit">
              Enviar Código
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EsqueciSenha;
