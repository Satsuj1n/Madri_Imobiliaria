import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { button } from "../../components_i/ui/button";
import { Checkbox } from "../../components_i/ui/Checkbox";
import { ProgressBar } from "components_i/ui/ProgressBar";

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

  const [propertyInfo, setPropertyInfo] = useState<{
    cep: string;
    endereco: string;
    numero: string;
    bairro: string;
    regiao: string;
    subRegiao: string;
    cidadeEstado: string;
    complemento: string;
    titulo: string;
    descricao: string;
    valor: string;
    aluguelValor: string;
    tipo: string;
    categoria: string;
    torreBloco: string;
    area: string;
    quarto: string;
    banheiro: string;
    areaExterna: string;
    areaInterna: string;
    areaLote: string;
    metrosFrente: string;
    metrosFundo: string;
    metrosDireito: string;
    metrosEsquerdo: string;
    zonaUso: string;
    coeficienteAproveitamento: string;
    IPTUAnual: string;
    IPTUMensal: string;
    lazer: string[];
    dataDisponivelInicio: string;
    dataDisponivelFim: string;
  }>({
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
    tipo: "",
    categoria: "",
    torreBloco: "",
    area: "",
    quarto: "",
    banheiro: "",
    areaExterna: "",
    areaInterna: "",
    areaLote: "",
    metrosFrente: "",
    metrosFundo: "",
    metrosDireito: "",
    metrosEsquerdo: "",
    zonaUso: "",
    coeficienteAproveitamento: "",
    IPTUAnual: "",
    IPTUMensal: "",
    lazer: [],
    dataDisponivelInicio: "",
    dataDisponivelFim: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPropertyInfo({ ...propertyInfo, [name]: value });
  };

  // Função para lidar com a mudança do checkbox
  const handleLazerChange = (lazerOption: string, isChecked: boolean) => {
    const updatedLazer = isChecked
      ? [...propertyInfo.lazer, lazerOption] // Adiciona se marcado
      : propertyInfo.lazer.filter((item) => item !== lazerOption); // Remove se desmarcado

    setPropertyInfo({ ...propertyInfo, lazer: updatedLazer });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      alert("Você não está autenticado. Faça login novamente.");
      navigate("/login"); // Redireciona para a página de login
      return;
    }

    const formattedToken = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;

    // Usar um objeto simples em vez de FormData, já que não estamos lidando com arquivos
    const data: { [key: string]: string | string[] } = { ...propertyInfo };

    // Verificar os dados enviados
    console.log("Dados enviados no formulário:", data);
    console.log("Token formatado:", formattedToken);

    try {
      const response = await fetch("http://localhost:5000/api/imoveis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: formattedToken,
        },
        body: JSON.stringify(data), // Enviar os dados como JSON
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Resposta do servidor:", responseData);
        navigate("/criar-imovel/3", { state: { imovelId: responseData._id } });
      } else if (response.status === 401) {
        // Caso o token tenha expirado ou não seja válido
        console.error(
          "Token inválido ou expirado. Redirecionando para o login."
        );
        alert("Sessão expirada. Por favor, faça login novamente.");
        localStorage.removeItem("token"); // Remove o token inválido
        navigate("/login"); // Redireciona para a página de login
      } else {
        const errorData = await response.json();
        console.error("Erro ao criar imóvel:", errorData);
        alert("Erro ao criar imóvel. Verifique os dados e tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao criar imóvel:", error);
      alert("Erro ao criar imóvel. Tente novamente mais tarde.");
    }
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); // Impede que o botão "Voltar" dispare o envio do formulário
    navigate("/criar-imovel/1", { state: propertyInfo });
  };

  // Função para definir o rótulo do campo Valor dinamicamente
  const getValorLabel = () => {
    if (propertyInfo.tipo === "venda") {
      return "Valor Total (R$)*";
    } else if (propertyInfo.tipo === "aluguel") {
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
          Criar Imóvel
        </h1>
        <ProgressBar step={2} />
        <form onSubmit={handleSubmit}>
          {/* Informações do imóvel */}
          <div className="grid grid-cols-2 gap-4">
            {/* Finalidade */}
            <div>
              <label>Finalidade(Tipo)*</label>
              <select
                name="tipo"
                value={propertyInfo.tipo}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Selecione a finalidade</option>
                <option value="venda">Venda</option>
                <option value="aluguel">Aluguel</option>
              </select>
            </div>
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
                name={propertyInfo.tipo === "venda" ? "valor" : "aluguelValor"}
                value={
                  propertyInfo.tipo === "venda"
                    ? propertyInfo.valor
                    : propertyInfo.aluguelValor
                }
                onChange={handleChange}
                placeholder={
                  propertyInfo.tipo === "venda"
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

            {/* Categoria de Imóvel */}
            <div>
              <label>Categoria do Imóvel*</label>
              <select
                name="categoria"
                value={propertyInfo.categoria}
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

            {/* Área Interna */}
            <div>
              <label>Área Interna (m²)</label>
              <input
                type="number"
                name="areaInterna"
                value={propertyInfo.areaInterna}
                onChange={handleChange}
                placeholder="Área interna"
                className="border p-2 w-full rounded"
              />
            </div>

            {/* Medidas do terreno */}
            <div>
              <label>Metros Frente</label>
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
              <label>Metros Fundo</label>
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
              <label>Metros Direito</label>
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
              <label>Metros Esquerdo</label>
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
          {propertyInfo.tipo === "aluguel" && (
            <div className="mt-4">
              <label>Data disponível para alugar (Início)*</label>
              <input
                type="date"
                name="dataDisponivelInicio"
                value={propertyInfo.dataDisponivelInicio}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />

              <label className="mt-2">Data disponível para alugar (Fim)*</label>
              <input
                type="date"
                name="dataDisponivelFim"
                value={propertyInfo.dataDisponivelFim}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              />
            </div>
          )}
          {/* Lazer - Checkbox com as opções */}
          <div className="text-center mt-4">
            <div className="text-2xl ">
              <label>Lazer</label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-nowrap">
              {[
                "Academia",
                "Churrasqueira",
                "Hidromassagem",
                "Home cinema",
                "Piscina",
                "Playground",
                "Quadra poliesportiva",
                "Quadra de tênis",
                "Sala de massagem",
                "Salão de festas",
                "Salão de jogos",
                "Sauna",
                "Wifi",
                "Espaço gourmet",
                "Garage Band",
                "Quadra de squash",
                "Quadra de beach tênis",
              ].map((option) => (
                <div key={option} className="flex items-center mt-1">
                  <Checkbox
                    id={option}
                    checked={propertyInfo.lazer.includes(option)}
                    onCheckedChange={(checked) =>
                      handleLazerChange(option, checked === true)
                    }
                  />
                  <label htmlFor={option} className="ml-2">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button variant="default" onClick={handleBack}>
              Voltar
            </button>
            <button variant="default" type="submit">
              Próximo
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CriarImovel2;
