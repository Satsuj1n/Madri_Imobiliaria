import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { Button } from "../../components_i/ui/Button";
import { Checkbox } from "../../components_i/ui/Checkbox";
import { ProgressBar } from "components_i/ui/ProgressBar";

interface PropertyInfo {
  titulo: string;
  situacao: "Ocupado" | "Disponivel" | "Reformando";
  descricao: string;
  valor?: string;
  aluguelValor?: string;
  tipo: "venda" | "aluguel" | "";
  categoria: string;
  torreBloco?: string;
  area: string;
  quarto: string;
  banheiro: string;
  areaExterna?: string;
  areaInterna?: string;
  areaLote?: string;
  metrosFrente?: string;
  metrosFundo?: string;
  metrosDireito?: string;
  metrosEsquerdo?: string;
  zonaUso?: string;
  coeficienteAproveitamento?: string;
  IPTUAnual?: string;
  IPTUMensal?: string;
  lazer: string[];
  dataDisponivelInicio?: string;
  dataDisponivelFim?: string;
}

// Função para formatar a data no padrão yyyy-MM-dd
const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditarInfo: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo>({
    titulo: "",
    situacao: "Disponivel",
    descricao: "",
    valor: "",
    aluguelValor: "",
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

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/imoveis/${id}`);
        const data = await response.json();

        setPropertyInfo({
          titulo: data.titulo,
          situacao: data.situacao || "Disponivel",
          descricao: data.descricao,
          valor: data.valor?.toString() || "",
          aluguelValor: data.aluguelValor?.toString() || "",
          tipo: data.tipo,
          categoria: data.categoria,
          torreBloco: data.torreBloco || "",
          area: data.area.toString(),
          quarto: data.quarto.toString(),
          banheiro: data.banheiro.toString(),
          areaExterna: data.areaExterna?.toString() || "",
          areaInterna: data.areaInterna?.toString() || "",
          areaLote: data.areaLote?.toString() || "",
          metrosFrente: data.metrosFrente?.toString() || "",
          metrosFundo: data.metrosFundo?.toString() || "",
          metrosDireito: data.metrosDireito?.toString() || "",
          metrosEsquerdo: data.metrosEsquerdo?.toString() || "",
          zonaUso: data.zonaUso || "",
          coeficienteAproveitamento:
            data.coeficienteAproveitamento?.toString() || "",
          IPTUAnual: data.IPTUAnual?.toString() || "",
          IPTUMensal: data.IPTUMensal?.toString() || "",
          lazer: data.lazer || [],
          dataDisponivelInicio: formatDate(data.dataDisponivelInicio),
          dataDisponivelFim: formatDate(data.dataDisponivelFim),
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar imóvel:", error);
        alert("Erro ao carregar imóvel.");
        setLoading(false);
      }
    };

    fetchImovel();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPropertyInfo({ ...propertyInfo, [name]: value });
  };

  const handleVoltar = () => {
    navigate("/gerenciar");
  };

  const handleLazerChange = (lazerOption: string, isChecked: boolean) => {
    const updatedLazer = isChecked
      ? [...propertyInfo.lazer, lazerOption]
      : propertyInfo.lazer.filter((item) => item !== lazerOption);
    setPropertyInfo({ ...propertyInfo, lazer: updatedLazer });
  };

  const getValorLabel = () => {
    return propertyInfo.tipo === "venda"
      ? "Valor Total (R$)*"
      : "Valor do Aluguel (R$)*";
  };

  // Função para realizar a atualização do imóvel
  const updateProperty = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("Token não encontrado!");
      alert("Você não está autenticado. Faça login novamente.");
      navigate("/login");
      return;
    }

    const formattedToken = token.startsWith("Bearer ")
      ? token
      : `Bearer ${token}`;

    try {
      const response = await fetch(
        `http://localhost:5000/api/imoveis/${id}/editar`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: formattedToken,
          },
          body: JSON.stringify(propertyInfo),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Imóvel atualizado:", data);
        navigate(`/editar-imagem/${id}`);
      } else if (response.status === 401) {
        console.error(
          "Token inválido ou expirado. Redirecionando para o login."
        );
        alert("Sessão expirada. Por favor, faça login novamente.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Erro ao atualizar imóvel:", errorData);
        alert(
          "Erro ao atualizar imóvel. Verifique os dados e tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar imóvel:", error);
      alert("Erro ao atualizar imóvel. Tente novamente mais tarde.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-24">
          Editar Imóvel
        </h1>
        <ProgressBar step={2} mode="editar" />

        {loading ? (
          <p className="text-center text-gray-500">Carregando...</p>
        ) : (
          <form>
            <div className="grid grid-cols-2 gap-4">
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

              <div>
                <label>Situação</label>
                <select
                  name="situacao"
                  value={propertyInfo.situacao}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                >
                  <option value="Disponivel">Disponível</option>
                  <option value="Ocupado">Ocupado</option>
                  <option value="Reformando">Reformando</option>
                </select>
              </div>

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

              <div>
                <label>{getValorLabel()}</label>
                <input
                  type="number"
                  name={
                    propertyInfo.tipo === "venda" ? "valor" : "aluguelValor"
                  }
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

              <div>
                <label>Categoria</label>
                <select
                  name="categoria"
                  value={propertyInfo.categoria}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                >
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

              <div>
                <label>IPTU Anual (R$)</label>
                <input
                  type="number"
                  name="IPTUAnual"
                  value={propertyInfo.IPTUAnual}
                  onChange={handleChange}
                  placeholder="IPTU Anual"
                  className="border p-2 w-full rounded"
                />
              </div>

              <div>
                <label>IPTU Mensal (R$)</label>
                <input
                  type="number"
                  name="IPTUMensal"
                  value={propertyInfo.IPTUMensal}
                  onChange={handleChange}
                  placeholder="IPTU Mensal"
                  className="border p-2 w-full rounded"
                />
              </div>

              {/* Datas de Disponibilidade - apenas para aluguel */}
              {propertyInfo.tipo === "aluguel" && (
                <>
                  <div>
                    <label>Data disponível para alugar (Início)</label>
                    <input
                      type="date"
                      name="dataDisponivelInicio"
                      value={propertyInfo.dataDisponivelInicio}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />
                  </div>

                  <div>
                    <label>Data disponível para alugar (Fim)</label>
                    <input
                      type="date"
                      name="dataDisponivelFim"
                      value={propertyInfo.dataDisponivelFim}
                      onChange={handleChange}
                      className="border p-2 w-full rounded"
                    />
                  </div>
                </>
              )}

              {/* Checkbox de Lazer */}
              <div className="text-center mt-4 col-span-2">
                <label>Lazer</label>
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
            </div>

            <div className="mt-8 flex justify-between">
              <Button variant="default" onClick={handleVoltar}>
                Voltar
              </Button>
                <Button variant="default" type="button" onClick={updateProperty}>
                Próximo
                </Button>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default EditarInfo;
