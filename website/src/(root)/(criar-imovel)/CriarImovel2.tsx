import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { Button } from "../../components_i/ui/Button";

const CriarImovel2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cep,
    endereco,
    numero,
    bairro,
    regiao,
    subRegiao,
    cidadeEstado,
    complemento,
  } = location.state || {};

  const [propertyInfo, setPropertyInfo] = useState({
    cep: cep || "",
    endereco: endereco || "",
    numero: numero || "",
    bairro: bairro || "",
    regiao: regiao || "",
    subRegiao: subRegiao || "",
    cidadeEstado: cidadeEstado || "",
    complemento: complemento || "",
    titulo: "",
    descricao: "",
    valor: "", // Preço de venda se "venda" for selecionado
    aluguelValor: "", // Preço de aluguel se "aluguel" for selecionado
    finalidade: "",
    tipoImovel: "",
    torreBloco: "",
    area: "",
    quarto: "",
    banheiro: "",
    areaExterna: "",
    areaLote: "",
    metrosFrente: "",
    metrosFundo: "",
    metrosDireito: "",
    metrosEsquerdo: "",
    zonaUso: "",
    coeficienteAproveitamento: "",
    IPTUAnual: "",
    IPTUMensal: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPropertyInfo({ ...propertyInfo, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const formData = new FormData();
    Object.keys(propertyInfo).forEach((key) => {
      formData.append(key, propertyInfo[key as keyof typeof propertyInfo]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/imoveis", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        navigate("/"); // Redireciona para a home após a criação
      } else {
        console.error("Erro ao criar imóvel");
      }
    } catch (error) {
      console.error("Erro ao criar imóvel:", error);
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que o botão "Voltar" dispare o envio do formulário
    navigate("/criar-imovel/1", { state: propertyInfo });
  };

  // Função para definir o rótulo do campo Valor dinamicamente
  const getValorLabel = () => {
    if (propertyInfo.finalidade === "venda") {
      return "Valor Total (R$)*";
    } else if (propertyInfo.finalidade === "aluguel") {
      return "Valor do Aluguel (R$)*";
    } else {
      return "Valor*";
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-24">
          Criar Imóvel - Parte 2
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Informações do imóvel */}
          <div className="grid grid-cols-2 gap-4">
            {/* Título */}
            <div>
              <label>Título do Imóvel*</label>
              <input
                type="text"
                name="titulo"
                value={propertyInfo.titulo}
                onChange={handleChange}
                placeholder="Digite o título do imóvel"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <label>Descrição*</label>
              <input
                type="text"
                name="descricao"
                value={propertyInfo.descricao}
                onChange={handleChange}
                placeholder="Digite a descrição"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* Valor - com rótulo dinâmico */}
            <div>
              <label>{getValorLabel()}</label>
              <input
                type="number"
                name={
                  propertyInfo.finalidade === "venda" ? "valor" : "aluguelValor"
                }
                value={
                  propertyInfo.finalidade === "venda"
                    ? propertyInfo.valor
                    : propertyInfo.aluguelValor
                }
                onChange={handleChange}
                placeholder={
                  propertyInfo.finalidade === "venda"
                    ? "Valor total do imóvel"
                    : "Valor do aluguel"
                }
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* IPTU Anual */}
            <div>
              <label>IPTU Anual (R$)</label>
              <input
                type="number"
                name="IPTUAnual"
                value={propertyInfo.IPTUAnual}
                onChange={handleChange}
                placeholder="Digite o IPTU anual"
                className="border p-2 w-full rounded"
              />
            </div>

            {/* IPTU Mensal */}
            <div>
              <label>IPTU Mensal (R$)</label>
              <input
                type="number"
                name="IPTUMensal"
                value={propertyInfo.IPTUMensal}
                onChange={handleChange}
                placeholder="Digite o IPTU mensal"
                className="border p-2 w-full rounded"
              />
            </div>

            {/* Finalidade */}
            <div>
              <label>Finalidade*</label>
              <select
                name="finalidade"
                value={propertyInfo.finalidade}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Selecione a finalidade</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>
            </div>

            {/* Tipo de Imóvel */}
            <div>
              <label>Tipo de Imóvel*</label>
              <select
                name="tipoImovel"
                value={propertyInfo.tipoImovel}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Selecione o tipo</option>
                <option value="andar corrido">Andar Corrido</option>
                <option value="apartamento">Apartamento</option>
                <option value="área privativa">Área Privativa</option>
                <option value="casa">Casa</option>
                <option value="chácara">Chácara</option>
                <option value="cobertura">Cobertura</option>
                <option value="fazenda">Fazenda</option>
                <option value="flat">Flat</option>
                <option value="galpão">Galpão</option>
                <option value="garagem">Garagem</option>
                <option value="kitnet">Kitnet</option>
                <option value="loja">Loja</option>
                <option value="lote">Lote</option>
                <option value="lote em condomínio">Lote em Condomínio</option>
                <option value="prédio">Prédio</option>
                <option value="sala">Sala</option>
                <option value="salão">Salão</option>
                <option value="sítio">Sítio</option>
              </select>
            </div>

            {/* Área */}
            <div>
              <label>Área (m²)*</label>
              <input
                type="number"
                name="area"
                value={propertyInfo.area}
                onChange={handleChange}
                placeholder="Área total do imóvel"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* Quartos */}
            <div>
              <label>Quartos*</label>
              <input
                type="number"
                name="quarto"
                value={propertyInfo.quarto}
                onChange={handleChange}
                placeholder="Quantidade de quartos"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* Banheiros */}
            <div>
              <label>Banheiros*</label>
              <input
                type="number"
                name="banheiro"
                value={propertyInfo.banheiro}
                onChange={handleChange}
                placeholder="Quantidade de banheiros"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            {/* Área externa */}
            <div>
              <label>Área Externa (m²)</label>
              <input
                type="number"
                name="areaExterna"
                value={propertyInfo.areaExterna}
                onChange={handleChange}
                placeholder="Área externa"
                className="border p-2 w-full rounded"
              />
            </div>

            {/* Área do lote */}
            <div>
              <label>Área do Lote (m²)</label>
              <input
                type="number"
                name="areaLote"
                value={propertyInfo.areaLote}
                onChange={handleChange}
                placeholder="Área total do lote"
                className="border p-2 w-full rounded"
              />
            </div>

            {/* Medidas do terreno */}
            <div>
              <label>M. Frente</label>
              <input
                type="number"
                name="metrosFrente"
                value={propertyInfo.metrosFrente}
                onChange={handleChange}
                placeholder="Metros de frente"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>M. Fundo</label>
              <input
                type="number"
                name="metrosFundo"
                value={propertyInfo.metrosFundo}
                onChange={handleChange}
                placeholder="Metros de fundo"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>M. Direito</label>
              <input
                type="number"
                name="metrosDireito"
                value={propertyInfo.metrosDireito}
                onChange={handleChange}
                placeholder="Metros do lado direito"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>M. Esquerdo</label>
              <input
                type="number"
                name="metrosEsquerdo"
                value={propertyInfo.metrosEsquerdo}
                onChange={handleChange}
                placeholder="Metros do lado esquerdo"
                className="border p-2 w-full rounded"
              />
            </div>

            {/* Zona de uso */}
            <div>
              <label>Zona de Uso</label>
              <input
                type="text"
                name="zonaUso"
                value={propertyInfo.zonaUso}
                onChange={handleChange}
                placeholder="Zona de uso"
                className="border p-2 w-full rounded"
              />
            </div>

            {/* Coeficiente de Aproveitamento */}
            <div>
              <label>Coeficiente de Aproveitamento</label>
              <input
                type="number"
                name="coeficienteAproveitamento"
                value={propertyInfo.coeficienteAproveitamento}
                onChange={handleChange}
                placeholder="Coeficiente de aproveitamento"
                className="border p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button variant="default" onClick={handleBack}>
              Voltar
            </Button>
            <Button variant="default" type="submit">
              Criar Imóvel
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CriarImovel2;
