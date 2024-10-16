import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { Button } from "../../components_i/ui/Button";

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

  // Debounce state to delay the CEP fetch
  const [debouncedCep, setDebouncedCep] = useState("");

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
              regiao: data.regiao || "", // Supondo que tenha "região"
              subRegiao: data.subRegiao || "", // Supondo que tenha "sub-região"
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
      // Aceita apenas números
      setPropertyInfo({ ...propertyInfo, cep: value });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyInfo({ ...propertyInfo, [name]: value });
  };

  const handleNext = () => {
    navigate("/criar-imovel/2", { state: propertyInfo });
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-24">
          Adicionar Endereço
        </h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form>
          <div className="grid grid-cols-2 gap-4">
            {/* CEP */}
            <div>
              <label>CEP*</label>
              <input
                type="text"
                name="cep"
                value={propertyInfo.cep}
                onChange={handleCepChange}
                placeholder="Digite o CEP"
                className="border p-2 w-full rounded"
                maxLength={8} // Limita a 8 caracteres
                required
              />
            </div>

            {/* Endereço */}
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

            {/* Número */}
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

            {/* Bairro */}
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

            {/* Região */}
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

            {/* Sub-região */}
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

            {/* Cidade - Estado */}
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

            {/* Complemento */}
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
            <Button variant="default" onClick={handleBack}>
              Voltar
            </Button>
            <Button variant="default" onClick={handleNext}>
              Próximo
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CriarImovel1;
