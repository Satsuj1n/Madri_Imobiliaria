import { ReactComponent as CheckIcon } from "../../assets/icons/checkIcon.svg";

interface ProgressBarProps {
  step: number;
  mode?: "editar" | "criar"; // Adiciona modo para diferenciar entre editar e criar
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, mode = "criar" }) => {
  return (
    <div className="flex justify-center items-center mt-4 mb-8">
      <div className="flex items-center space-x-2">
        {/* Renderiza os passos dinamicamente com base no modo */}
        {mode === "criar" ? (
          <>
            {/* Step 1 - Endereço */}
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-white text-sm ${
                  step === 1
                    ? "bg-[#0053f8]"
                    : step > 1
                    ? "bg-[#0053f8]"
                    : "bg-gray-300"
                }`}
              >
                {step > 1 ? <CheckIcon className="w-4 h-4" /> : "1"}
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
          </>
        ) : null}

        {/* Step 2 - Informações */}
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              step === 2
                ? "bg-[#0053f8]"
                : step > 2
                ? "bg-[#0053f8]"
                : "bg-gray-300"
            }`}
          >
            {step > 2 ? (
              <CheckIcon className="w-4 h-4" />
            ) : mode === "editar" ? (
              "1"
            ) : (
              "2"
            )}
          </div>
          <span
            className={`ml-2 text-sm font-bold ${
              step >= 2 ? "text-[#100A55]" : "text-[#100a5591]"
            }`}
          >
            Informações
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
              stroke={step >= 3 ? "#0053f8" : "#100A55"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Step 3 (ou 2 no modo editar) - Upload de Imagens */}
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              step === 3
                ? "bg-[#0053f8]"
                : step > 3
                ? "bg-[#0053f8]"
                : "bg-gray-300"
            }`}
          >
            {step > 3 ? (
              <CheckIcon className="w-4 h-4" />
            ) : mode === "editar" ? (
              "2"
            ) : (
              "3"
            )}
          </div>
          <span
            className={`ml-2 text-sm font-bold ${
              step >= 3 ? "text-[#100A55]" : "text-[#100a5591]"
            }`}
          >
            Imagens
          </span>
        </div>
      </div>
    </div>
  );
};

export { ProgressBar };
