<template>
  <div class="pokemon-container">
    <!-- Cuando se crea el computed de imgSrc, se coloca el v-bind (o su abreviación :)
    para poder tener acceso a el -->
    <img v-if="showPokemon" :src="imgSrc" class="fade-in" alt="">
    <img v-else :src="imgSrc" class="hidden-pokemon" alt="">
  </div>
</template>

<script>
export default {
  computed:{
    // Antes de acceder a this.pokemonId y ser usado en computed
    // fue necesario crear la prop con información adicional que es opcional
    imgSrc(){
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
    }
  },
   props:
    {
        pokemonId:{
            required: true,
            type: Number
        },
        showPokemon:{
          required: true,
            type: Boolean,
            default: false,
        }
    },
}
</script>

<style scoped>
.hidden-pokemon {
  filter: brightness(0)
}
/* Pokemon Picture */
.pokemon-container {
    height: 200px;
}
img {
    height: 200px;
    /* position: absolute; */
    /* right: 41%; */
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
.hidden-pokemon {
    filter: brightness(0);
}

</style>