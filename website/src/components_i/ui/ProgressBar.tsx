import { ReactComponent as CheckIcon } from "../../assets/icons/checkIcon.svg"; // Importe o ícone SVG

const ProgressBar = ({ step }: { step: number }) => {
  return (
    <div className="flex justify-center items-center mt-4 mb-8">
      <div className="flex items-center space-x-2">
        {/* Step 1 - Endereço */}
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-white text-sm ${
              step >= 2 ? "bg-[#0053f8]" : "bg-[#0053f8]"
            }`}
          >
            {step >= 2 ? (
              <CheckIcon className="w-4 h-4" /> // Ícone de check quando o passo 1 é concluído
            ) : (
              "1"
            )}
          </div>
          <span
            className={`ml-2 text-sm font-bold ${
              step >= 1 ? "text-[#100A55]" : "text-[#100a5591]"
            }`}
          >
            Endereço
          </span>
        </div>

        {/* Setinha entre os passos */}
        <div className="mx-2">
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1L6.5 6L1.5 11"
              stroke={step >= 2 ? "#0053f8" : "#100A55"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Step 2 - Informações do Imóvel */}
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              step >= 2 ? "bg-[#0053f8]" : "bg-gray-300"
            }`}
          >
            2
          </div>
          <span
            className={`ml-2 text-sm font-bold ${
              step >= 2 ? "text-[#100A55]" : "text-[#100a5591]"
            }`}
          >
            Informações
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
