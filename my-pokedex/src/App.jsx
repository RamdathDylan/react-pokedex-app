import { useState, useEffect, use} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const [pokemonName, setPokemonName] = useState("pikachu")
  const [pokemonData, setPokemonData] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
      const fetchData = async () => {
        if (!pokemonName) return; // Don't fetch if input is empty

        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
          if (!response.ok) throw new Error("Pokémon not found")
          const data = await response.json()
          setPokemonData(data)
          setError(null)
        } catch (err) {
          setPokemonData(null)
          setError(err.message)
        }
      }

      fetchData()
    }, [pokemonName])






  return (
    <>
      <input
        type="text"
        value={pokemonName}
        onChange={e => setPokemonName(e.target.value)}
      />

      <div>
        {pokemonData ? (
          <>
            <p><strong>Name:</strong> {pokemonData.name}</p>
            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          </>
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </>
  )
}

export default App
