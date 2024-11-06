import React from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "components_i/ui/Button";

const Confirmacao = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login");
  };
  const handleClickLanding = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <header className="bg-white w-full shadow-md border-b border-gray-200 px-8 py-4 flex items-center justify-start "
      onClick={handleClickLanding}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleClickLogin}
        >
          <Logo className="h-8"
           />
          <span className="text-[#100A55] font-bold text-xl whitespace-nowrap">
            Madri Imobiliária
          </span>
        </div>
      </header>

      <div className="flex-grow flex justify-center items-center w-full">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg p-8 mt-8 mx-4 flex flex-col items-center md:bg-white md:rounded-lg md:shadow-lg">
          <h2 className="text-[#100A55] font-bold text-3xl mb-2 text-center">
            Senha Redefinida
          </h2>
          <p className="text-[#6C727F] mb-2 text-center">
            Sua senha foi redefinida com sucesso. Agora você pode fazer login.
          </p>
          <Button size="large2" variant="extraLarge" onClick={handleClickLogin}>
            Faça o Login Aqui
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmacao;
