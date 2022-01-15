import pokemonApi from "../api/pokemonApi";

const getPokemons = () => {
  // Creamos un Array vacío con 650 huecos que cada uno contendrá 'undefined' originalmente.
  const pokemonsArr = Array.from(Array(650));

  return pokemonsArr.map((_, index) => index + 1);
};

const getPokemonOptions = async () => {
    // Hacemos un random de los 650 pokemons
  const mixPokemons = getPokemons().sort(() => Math.random() - 0.5);

  // Devolvemos un array de objetos con la información de los 4 primeros pokemons resultantes del mix obteniendo su name y su id.
  const pokemons = await getPokemonNames(mixPokemons.splice(0, 4));
  // Pokemons es lo que enviaremos al componente.
  
  return pokemons
};

const getPokemonNames = async ([a, b, c, d] = []) => {
    // Realizamos una peticion con axios a la API de pokemon para obtener la información de los 4 primeros pokemons 
  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ];

  const [pok1, pok2, pok3, pok4] = await Promise.all(promiseArr);
  return [
    { name: pok1.data.name, id: pok1.data.id },
    { name: pok2.data.name, id: pok2.data.id },
    { name: pok3.data.name, id: pok3.data.id },
    { name: pok4.data.name, id: pok4.data.id },
  ];
};

export default getPokemonOptions;
