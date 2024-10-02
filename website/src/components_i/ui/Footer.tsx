import React from "react";
import { ReactComponent as InstagramIcon } from "../../assets/icons/instagram.svg"; // Ajuste o caminho para o seu projeto
import { ReactComponent as WhatsAppIcon } from "../../assets/icons/whatsapp.svg"; // Certifique-se de adicionar o ícone do WhatsApp

const Footer = () => {
  return (
    <div className="bg-white w-full flex flex-col items-center mt-8">
      {/* Linha Separadora */}

      {/* Conteúdo do Footer */}
      <div className="flex justify-between w-full max-w-5xl px-4 pb-6">
        <p className="text-sm text-gray-500">©2024 Madri Imobiliária. Todos os direitos reservados.</p>

        {/* Ícones de Redes Sociais */}
        <div className="flex space-x-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="w-6 h-6" style={{ fill: "" }} /> {/* Aplicando cor usando fill */}
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="w-6 h-6" style={{ fill: "#999999" }} /> {/* Aplicando cor usando fill */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;