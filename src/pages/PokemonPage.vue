<template>
  <h1 v-if="!pokemon">Cargando...</h1>

  <div v-else>
    <h1>¿Quién es este pokémon?</h1>

    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @pokemon-selected="checkAnswer" />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>

      <button @click="newGame()">Nueva partida</button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions";
import PokemonPicture from "@/components/PokemonPicture";

// HELPERS
import getPokemonOptions from "@/helpers/getPokemonOptions";

// getPokemonOptions()

export default {
  name: "pokemon-page",
  components: { PokemonOptions, PokemonPicture },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();

      const randomInt = Math.floor(Math.random() * 4);

      this.pokemon = this.pokemonArr[ randomInt ];
    },
    checkAnswer(selectedId) {
      this.showPokemon = true;
      this.showAnswer = true;

      if (selectedId === this.pokemon.id) {
        this.message = `¡Correcto! es ${this.pokemon.name}`;
      } else {
        this.message = `¡Nooooo! era... ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArr = [];
      this.pokemon = null;
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style>
</style>