import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { button } from "../../components_i/ui/button";
import { ProgressBar } from "components_i/ui/ProgressBar";
import loadingIcon from "../../assets/icons/loading.svg";

const CriarImovel1 = () => {
  const navigate = useNavigate();
  const [propertyInfo, setPropertyInfo] = useState({
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    regiao: "",
    subRegiao: "",
    cidadeEstado: "",
    complemento: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loadingAuth, setLoadingAuth] = useState<boolean>(true); // Estado de carregamento de autenticação
  const [debouncedCep, setDebouncedCep] = useState(""); // Estado de debounce para CEP

  // Verifica se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token não encontrado. Redirecionando para login.");
      navigate("/login");
    } else {
      setLoadingAuth(false); // Marca a autenticação como concluída
    }
  }, [navigate]);

  // Atualiza o CEP com debounce para evitar que a busca ocorra antes de o usuário terminar de digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      if (propertyInfo.cep.length === 8) {
        setDebouncedCep(propertyInfo.cep);
      }
    }, 500); // Aguarda 500ms antes de tentar buscar o endereço

    return () => {
      clearTimeout(handler); // Limpa o timeout ao alterar o valor de CEP
    };
  }, [propertyInfo.cep]);

  // Busca o endereço automaticamente após o CEP completo ser digitado
  useEffect(() => {
    const fetchAddressByCEP = async (cep: string) => {
      try {
        if (cep.length === 8) {
          const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
          const data = await response.json();
          if (!data.erro) {
            setPropertyInfo((prev) => ({
              ...prev,
              endereco: data.logradouro,
              bairro: data.bairro,
              cidadeEstado: `${data.localidade} - ${data.uf}`,
              regiao: data.regiao || "",
              subRegiao: data.subRegiao || "",
            }));
          } else {
            setError("CEP não encontrado.");
          }
        }
      } catch (error) {
        setError("Erro ao buscar o CEP.");
      }
    };

    if (debouncedCep) {
      fetchAddressByCEP(debouncedCep);
    }
  }, [debouncedCep]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setPropertyInfo({ ...propertyInfo, cep: value });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyInfo({ ...propertyInfo, [name]: value });
  };

  const handleNext = () => {
    if (
      !propertyInfo.cep ||
      !propertyInfo.endereco ||
      !propertyInfo.numero ||
      !propertyInfo.bairro ||
      !propertyInfo.regiao ||
      !propertyInfo.cidadeEstado
    ) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setError(null);
    navigate("/criar-imovel/2", { state: propertyInfo });
  };

  const handleBack = () => {
    navigate("/");
  };

  // Exibe um ícone de carregamento enquanto verifica a autenticação
  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img src={loadingIcon} alt="Loading" className="w-20 h-20" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mb-52">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-24">
          Criar Imóvel
        </h1>
        <ProgressBar step={1} />
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>CEP*</label>
              <input
                type="text"
                name="cep"
                value={propertyInfo.cep}
                onChange={handleCepChange}
                placeholder="Digite o CEP (apenas números)"
                className="border p-2 w-full rounded"
                maxLength={8}
                required
              />
            </div>
            <div>
              <label>Endereço*</label>
              <input
                type="text"
                name="endereco"
                value={propertyInfo.endereco}
                onChange={handleChange}
                placeholder="Endereço"
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label>Número*</label>
              <input
                type="text"
                name="numero"
                value={propertyInfo.numero}
                onChange={handleChange}
                placeholder="Número"
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label>Bairro*</label>
              <input
                type="text"
                name="bairro"
                value={propertyInfo.bairro}
                onChange={handleChange}
                placeholder="Bairro"
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label>Região*</label>
              <input
                type="text"
                name="regiao"
                value={propertyInfo.regiao}
                onChange={handleChange}
                placeholder="Região"
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label>Sub-região</label>
              <input
                type="text"
                name="subRegiao"
                value={propertyInfo.subRegiao}
                onChange={handleChange}
                placeholder="Sub-região"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>Cidade - Estado*</label>
              <input
                type="text"
                name="cidadeEstado"
                value={propertyInfo.cidadeEstado}
                onChange={handleChange}
                placeholder="Cidade - Estado"
                className="border p-2 w-full rounded"
                required
              />
            </div>
            <div>
              <label>Complemento</label>
              <input
                type="text"
                name="complemento"
                value={propertyInfo.complemento}
                onChange={handleChange}
                placeholder="Complemento"
                className="border p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button variant="default" onClick={handleBack}>
              Voltar
            </button>
            <button variant="default" onClick={handleNext}>
              Próximo
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CriarImovel1;
