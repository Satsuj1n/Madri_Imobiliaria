import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { Button } from "../../components_i/ui/Button";
import { Checkbox } from "../../components_i/ui/Checkbox";
import { ProgressBar } from "components_i/ui/ProgressBar";

interface PropertyInfo {
  titulo: string;
  situacao?: string;
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

const EditarInfo: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo>({
    titulo: "",
    situacao: "",
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
          situacao: data.situacao || "",
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
          dataDisponivelInicio: data.dataDisponivelInicio || "",
          dataDisponivelFim: data.dataDisponivelFim || "",
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-24">
          Editar Imóvel
        </h1>
        <ProgressBar step={2} />

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
                <input
                  type="text"
                  name="situacao"
                  value={propertyInfo.situacao}
                  onChange={handleChange}
                  placeholder="Situação do imóvel"
                  className="border p-2 w-full rounded"
                />
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
              <Button variant="default" onClick={() => navigate(-1)}>
                Voltar
              </Button>
              <Button
                variant="default"
                type="button"
                onClick={() => alert("Implementar função de atualização")}
              >
                Salvar Alterações
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
