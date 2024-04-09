import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default App;

function App() {
const [livros, setLivros] = useState([]);
const [novoLivro, setNovoLivro] = useState({
  nome: '',
  isbn: '',
  editora: '',
  autor: '',
  ano: '',
});

useEffect(() => {
  fetchLivros();
}, []);

//GET
const fetchLivros = async () => {
  try {
    const response = await axios.get('http://localhost:8090/veiculos');
    setLivros(response.data);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
  }
};

//Atualização dos INPUTS
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setNovoLivro((prevLivro) => ({
    ...prevLivro,
    [name]: value,
  }));
};

//POST
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post('http://localhost:8090/veiculos', novoLivro);
    fetchLivros();
    setNovoLivro({
      nome: '',
      isbn: '',
      editora: '',
      autor: '',
      ano: '',
    });
  } catch (error) {
    console.error('Erro ao criar o livro:', error);
  }
};

//DELETE
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8090/livros/${id}`);
    fetchLivros();
  } catch (error) {
    console.error('Erro ao excluir o livro:', error);
  }
};

//PUT
const handleUpdate = async (id, livroAtualizado) => {
  const [modeloInput, setModeloInput] = useState('');
  try {
    await axios.put(`http://localhost:8090/livros/${id}`, livroAtualizado);
    fetchLivros();
  } catch (error) {
    console.error('Erro ao atualizar o livro:', error);
  }
};

//RENDERIZAÇÃO
return (
  <div>
    {/* Cabeçalho */}
    <h1>Gerenciamento de Livros</h1>

    {/* Formulário de adição de veículo */}
    <form onSubmit={handleSubmit}>
      {/* Campo para o titulo */}
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={novoLivro.placa}
        onChange={handleInputChange}
      />
        {/* campo para isbn */}
        <input
        type="text"
        name="isbn"
        placeholder="isbn"
        value={novoLivro.isbn}
        onChange={handleInputChange}
      />
      {/* Campo para a editora */}
      <input
        type="text"
        name="editora"
        placeholder="Editora"
        value={novoLivro.editora}
        onChange={handleInputChange}
      />
      {/* Campo para o autor */}
      <input
        type="text"
        name="autor"
        placeholder="Autor"
        value={novoLivro.autor}
        onChange={handleInputChange}
      />
      {/* Campo para o ano */}
      <input
        type="number"
        name="ano"
        placeholder="Ano"
        value={novoLivro.ano}
        onChange={handleInputChange}
      />
      {/* Botão de envio do formulário */}
      <button type="submit">Adicionar Livro</button>
    </form>

    {/* Lista de veículos */}
    <ul>
      {/* Mapeamento dos livros */}
      {livros.map((livro) => (
        <li key={livro.id}>
          {/* Exibição dos detalhes do veículo */}
          {livro.nome} - {livro.editora} {livro.autor} ({livro.ano})
          
          {/* Botão de exclusão */}
          <button onClick={() => handleDelete(livro.id)}>Excluir</button>
          
          {/* Botão de atualização */}
          <button
            onClick={() =>
              handleUpdate(livro.id, {
                ...livro,
                autor: 'Novo Autor Atualizado', 
              })
            }
          >
            Atualizar
          </button>
        </li>
      ))}
    </ul>
  </div>
);


 





}

