<template>
  <!-- PokemonPage posee dos compomentes: PokemonOptions y PokemonPicture
  que son los responsables por la imagen y respuesta del juego -->
  <PokemonPage/>
</template>

<script>
import PokemonPage from './pages/PokemonPage'

export default {
  name: 'App',
  components: {
    PokemonPage,
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
