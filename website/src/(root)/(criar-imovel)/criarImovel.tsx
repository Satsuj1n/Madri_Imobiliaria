import React, { useState } from "react";
import axios from "axios";
import { Button } from "../../components_i/ui/Button";
import Navbar from "../../components_i/ui/Navbar";
import Footer from "../../components_i/ui/Footer";
import { useNavigate } from "react-router-dom";

const AdicionarImovelPage = () => {
  const navigate = useNavigate();
  const [propertyInfo, setPropertyInfo] = useState({
    titulo: "",
    descricao: "",
    valor: "",
    localizacao: "",
    cep: "",
    area: "",
    quarto: "",
    banheiro: "",
    tipo: "",
    categoria: "",
    imagemPrincipal: null as File | null, // Imagem principal
    imagensSecundarias: [] as File[], // Imagens secundárias
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPropertyInfo({ ...propertyInfo, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (name === "imagemPrincipal" && files) {
      setPropertyInfo({ ...propertyInfo, imagemPrincipal: files[0] }); // Armazena uma única imagem
    } else if (name === "imagensSecundarias" && files) {
      setPropertyInfo({
        ...propertyInfo,
        imagensSecundarias: Array.from(files),
      }); // Armazena múltiplas imagens
    }
  };

  const handleVoltar = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Recuperar o token JWT do localStorage
    const token = localStorage.getItem("token");

    // Se não houver token, redireciona para o login
    if (!token) {
      setError("Usuário não autenticado. Faça login para continuar.");
      navigate("/login");
      return;
    }

    // Criar o FormData para enviar os dados e arquivos
    const formData = new FormData();
    formData.append("titulo", propertyInfo.titulo);
    formData.append("descricao", propertyInfo.descricao);
    formData.append("valor", propertyInfo.valor);
    formData.append("localizacao", propertyInfo.localizacao);
    formData.append("cep", propertyInfo.cep);
    formData.append("area", propertyInfo.area);
    formData.append("quarto", propertyInfo.quarto);
    formData.append("banheiro", propertyInfo.banheiro);
    formData.append("tipo", propertyInfo.tipo);
    formData.append("categoria", propertyInfo.categoria);

    if (propertyInfo.imagemPrincipal) {
      formData.append("imagemPrincipal", propertyInfo.imagemPrincipal);
    }

    if (propertyInfo.imagensSecundarias.length > 0) {
      propertyInfo.imagensSecundarias.forEach((file) =>
        formData.append("imagensSecundarias", file)
      );
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/imoveis", // Altere para a sua URL correta
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Enviar o token JWT no cabeçalho
          },
        }
      );

      setSuccess("Imóvel criado com sucesso!");
      console.log("Resposta do servidor:", response.data);

      // Redireciona o usuário após a criação
      navigate("/"); // Altere para a rota desejada após a criação do imóvel
    } catch (err: any) {
      console.error("Erro ao criar imóvel:", err.response?.data || err);
      setError("Erro ao criar imóvel. Tente novamente.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center mt-24">
          Adicionar Novo Imóvel
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Certifique-se de preencher todos os campos obrigatórios e fazer o
          upload de todos os arquivos necessários.
        </p>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-3xl mx-auto">
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Tipo de Imóvel*
                </label>
                <select
                  name="tipo"
                  value={propertyInfo.tipo}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="venda">Venda</option>
                  <option value="aluguel">Aluguel</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Título*
                </label>
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
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {propertyInfo.tipo === "aluguel"
                  ? "Valor (R$) / Mensal"
                  : "Valor (R$)*"}
              </label>
              <input
                type="number"
                name="valor"
                value={propertyInfo.valor}
                onChange={handleChange}
                placeholder={
                  propertyInfo.tipo === "aluguel"
                    ? "Digite o valor mensal do aluguel"
                    : "Digite o valor do imóvel"
                }
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Localização*
              </label>
              <input
                type="text"
                name="localizacao"
                value={propertyInfo.localizacao}
                onChange={handleChange}
                placeholder="Digite a localização"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                CEP*
              </label>
              <input
                type="number"
                name="cep"
                value={propertyInfo.cep}
                onChange={handleChange}
                placeholder="Digite o CEP"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quartos*
              </label>
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

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Banheiros*
              </label>
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

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Área (m²)*
              </label>
              <input
                type="number"
                name="area"
                value={propertyInfo.area}
                onChange={handleChange}
                placeholder="Área em metros quadrados"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Categoria*
              </label>
              <select
                name="categoria"
                value={propertyInfo.categoria}
                onChange={handleChange}
                className="border p-2 w-full rounded"
                required
              >
                <option value="">Selecione a categoria</option>
                <option value="apartamentos">Apartamentos</option>
                <option value="casas">Casas</option>
                <option value="temporada">Temporada</option>
                <option value="terrenos">Terrenos</option>
                <option value="comercio-industria">Comércio/Indústria</option>
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Imagem Principal*
              </label>
              <input
                type="file"
                name="imagemPrincipal"
                onChange={handleImageChange}
                accept="image/*"
                className="border p-2 w-full rounded"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Imagens Secundárias
              </label>
              <input
                type="file"
                name="imagensSecundarias"
                onChange={handleImageChange}
                accept="image/*"
                multiple
                className="border p-2 w-full rounded"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8 max-w-3xl mx-auto">
            <Button variant="default" onClick={handleVoltar}>
              Voltar
            </Button>
            <Button variant="default" type="submit">
              Criar
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AdicionarImovelPage;
