import { useState } from "react";
import "./App.css";

function App() {
  const [nomeInput, setNomeInput] = useState("");
  
  const [pokemon, setPokemon] = useState(null);

  async function buscarPokemon(e) {
    e.preventDefault();
    
    if (!nomeInput.trim()) return;

    try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeInput.toLowerCase()}`);
      
      if (!resposta.ok) {
        alert("Pokémon não encontrado!");
        setPokemon(null);
        return;
      }

      const dados = await resposta.json();
      setPokemon(dados);
    } catch (erro) {
      console.error("Erro ao buscar o Pokémon:", erro);
    }
  }

  const handleChange = (e) => {
    setNomeInput(e.target.value);
  };

  return (
    <div>
      <h1>Pokémon</h1>
      <form onSubmit={buscarPokemon}>
        <label>
          Digite o nome do pokemon:
          <input type="text" value={nomeInput} onChange={handleChange} />
        </label>
        <button type="submit">Buscar Pokémon</button>
      </form>

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Número: {pokemon.id}</p>
        </div>
      )}
    </div>
  );
}

export default App;