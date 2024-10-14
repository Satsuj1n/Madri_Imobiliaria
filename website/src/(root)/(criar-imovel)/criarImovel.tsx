import React, { useState } from "react";
import { Button } from "../../components_i/ui/Button"; // Verifique o caminho para o componente Button
import Navbar from "../../components_i/ui/Navbar"; // Navbar para navegação
import Footer from "../../components_i/ui/Footer"; // Footer opcional para o final da página

const AdicionarImovelPage = () => {
  // State para os campos do formulário
  const [propertyInfo, setPropertyInfo] = useState({
    endereco: "",
    numeroUnidade: "",
    cidade: "",
    estado: "",
    cep: "",
    tipoImovel: "",
    quartos: "",
    banheiros: "",
    area: "",
    aluguelMensal: "",
    depositoSeguranca: "",
    descricao: "",
    dataDisponivel: "",
    duracaoContrato: "",
    representante: "proprietario",
    comodidades: [],
  });

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPropertyInfo({ ...propertyInfo, [name]: value });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Adicionar Novo Imóvel</h1>
        <p className="text-gray-600 mb-6">
          Certifique-se de preencher todos os campos obrigatórios e fazer o
          upload de todos os arquivos necessários.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Endereço da Propriedade
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Endereço*</label>
              <input
                type="text"
                name="endereco"
                value={propertyInfo.endereco}
                onChange={handleChange}
                placeholder="Digite o endereço"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>Número da Unidade</label>
              <input
                type="text"
                name="numeroUnidade"
                value={propertyInfo.numeroUnidade}
                onChange={handleChange}
                placeholder="Número da Unidade"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>Cidade*</label>
              <input
                type="text"
                name="cidade"
                value={propertyInfo.cidade}
                onChange={handleChange}
                placeholder="Cidade"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>Estado*</label>
              <select
                name="estado"
                value={propertyInfo.estado}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              >
                <option value="">Selecione o estado</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                {/* Adicione os outros estados */}
              </select>
            </div>
            <div>
              <label>CEP*</label>
              <input
                type="text"
                name="cep"
                value={propertyInfo.cep}
                onChange={handleChange}
                placeholder="CEP"
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Informações do Imóvel</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Tipo de Imóvel*</label>
              <select
                name="tipoImovel"
                value={propertyInfo.tipoImovel}
                onChange={handleChange}
                className="border p-2 w-full rounded"
              >
                <option value="">Selecione o tipo</option>
                <option value="apartamento">Apartamento</option>
                <option value="casa">Casa</option>
                {/* Adicione outros tipos de imóveis */}
              </select>
            </div>
            <div>
              <label>Quartos*</label>
              <input
                type="number"
                name="quartos"
                value={propertyInfo.quartos}
                onChange={handleChange}
                placeholder="Quantidade de quartos"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>Banheiros*</label>
              <input
                type="number"
                name="banheiros"
                value={propertyInfo.banheiros}
                onChange={handleChange}
                placeholder="Quantidade de banheiros"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>Área (m²)*</label>
              <input
                type="number"
                name="area"
                value={propertyInfo.area}
                onChange={handleChange}
                placeholder="Área em metros quadrados"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>Aluguel Mensal (R$)*</label>
              <input
                type="number"
                name="aluguelMensal"
                value={propertyInfo.aluguelMensal}
                onChange={handleChange}
                placeholder="Valor do aluguel"
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label>Depósito de Segurança (R$)</label>
              <input
                type="number"
                name="depositoSeguranca"
                value={propertyInfo.depositoSeguranca}
                onChange={handleChange}
                placeholder="Valor do depósito"
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="col-span-2">
              <label>Descrição*</label>
              <textarea
                name="descricao"
                value={propertyInfo.descricao}
                onChange={handleChange}
                placeholder="Descreva o imóvel"
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <Button variant="default">Voltar</Button>
          <Button variant="default">Próximo</Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdicionarImovelPage;
