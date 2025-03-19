import React, { useState } from "react";
import { button } from "../../components_i/ui/button";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import { useRecoveryContext } from "./RecoveryContext";

const VerificarOtp = () => {
  const { otp } = useRecoveryContext();
  const [otpInput, setOtpInput] = useState("");
  const navigate = useNavigate();

  const handleVerify = () => {
    console.log("OTP armazenado no contexto:", otp); // Para depuração
    console.log("OTP inserido pelo usuário:", otpInput); // Para depuração

    if (parseInt(otpInput) === otp) {
      navigate("/redefinir-senha");
    } else {
      alert("Código OTP incorreto. Tente novamente.");
    }
  };
  const handleClickLanding = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <header className="bg-white w-full shadow-md border-b border-gray-200 px-8 py-4 flex items-center justify-start">
        <div className="flex items-center gap-2 cursor-pointer"
        onClick={handleClickLanding}>
          <Logo className="h-8" />
          <span className="text-[#100A55] font-bold text-xl whitespace-nowrap">
            Madri Imobiliária
          </span>
        </div>
      </header>

      <div className="flex-grow flex justify-center items-center w-full">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 mt-8 mx-4 flex flex-col items-center md:bg-white md:rounded-lg md:shadow-lg">
          <h2 className="text-[#100A55] font-bold text-3xl mb-2 text-center">
            Verificar Código
          </h2>
          <p className="text-[#6C727F] mb-8 text-center">
            Insira o código de verificação enviado para o seu e-mail.
          </p>

          <form className="w-full space-y-4" onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
            <div>
              <label className="block text-gray-700 text-sm mb-2" htmlFor="otp">
                Código OTP
              </label>
              <input
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053f8] bg-[#f9fbff]"
                type="text"
                id="otp"
                name="otp"
                placeholder="Digite o código"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                required
              />
            </div>

            <button variant="default" size="lg" className="w-full mb-4" type="submit">
              Verificar Código
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerificarOtp;
