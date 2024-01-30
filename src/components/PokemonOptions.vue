<template>
  <div class="options-container">
    <ul>
      <!-- video 96 explicado $emit (Custom Events)-->
      <!-- Con $emit( 'selection' ) se crea un evento llamado 'selection'
         que puede ser escuchado por su padre, osea PokemonPage.vue.
        emit recibe 2 argumentos: 1. Nombre de evento, 2. Argumentos -->
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        v-on:click="$emit( 'selection', pokemon.id )">
        {{ pokemon.name.toUpperCase() }}
        </li>
    </ul>
  </div>


</template>

<script>
export default {
  // Se crea este prop para vincular la data que venga de 
  // PokemonPage.vue donde se tiene -> <PokemonOptions :pokemons="pokemonArr"/>
  // Entonces se recibe el pokemonArr y se monta en pokemons
  // y se usa en el template de este componente
  props:{
    pokemons:{
      type: Array,
      required: true
    }
  },  
}
</script>

<style scoped>
ul {
    list-style-type: none;
}
li {
    background-color: white;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin-bottom: 10px;
    width: 250px;
}

li:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
    display: flex;
    justify-content: center;
}
</style>