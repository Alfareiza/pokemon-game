<template>
    
    <!-- Así se monta la imagen del pokemon -->
    <h1 v-if="!pokemonRandom">Wait please ...</h1>
    
    <!-- pokemonRandom es un pokemon aleatorio tomado del pokemonArr -->
    <!-- Y desde aquí se le envía ese id al componente PokemonPicture -->
    <div v-else>
      <h1 class="">Who is this pokemon?</h1>
      <PokemonPicture
        :pokemonId="pokemonRandom.id"
        :showPokemon="showPokemon" 
        />
    </div>
  

  <!-- Así se montan los nombres de los pokemons -->
  <!-- pokemonArr recibe un valor real cuando se ejecuta la func getPokemonOptions -->
  <!-- pokemonArr se puede usar aquí porque es definido en data -->
  <!-- Entonces, se crea en data para saber que en otra parte del código 
  se va a manipular (agregarle contenido) -->
  <PokemonOptions
    :pokemonRandom="pokemonRandom.id"
    v-if="pokemonRandom"
    :pokemons="pokemonArr" 
    @selection="checkAnswer( $event )" 
    />
  <!-- video:96 @selection="checkAnswer" se crea aquí por qué en PokemonOptions se creó un custom event
  así -> $emit( 'selection' ). Entonces al ejecutarse la acción que venga del  $emit( 'selection' )
  que en este caso es click, se va a ejecutar la función checkAnswer -->
  
  <!-- Caso, quiera enviar otros valores en checkAnswer, entonces se hace así:
  checkAnswer(arg1, arg2, arg3, $event) siendo $event -->
  
  <!-- Obs.: '@' aquí es como un 'v-on' -->


  <!-- Opciones para reiniciar juego -->
  <!-- Al usar la tag template, agrupará los elementos en el contexto de vue, y no de html -->
  <template v-if="showAnswer">
    <h2 class="fade-in">{{ message }}</h2>
    <button class="btn" @click="restartGame">
      New Game
    </button>
  </template>
</template>

<script>

// EL @ significa que se va a ir al src/ y desde ahi hace el descubrimiento
import PokemonOptions from '@/components/PokemonOptions'
import PokemonPicture from '@/components/PokemonPicture'

import getPokemonOptions from '../helpers/getPokemonOptions'

export default {
    components: {
        PokemonPicture, 
        PokemonOptions
  },
  // Recordemos que la data es reactiva y si algo cambia
  // vue lo actualiza y renderiza de nuevo, es por eso que se coloca
  // aquí, para monitorear sus cambios
  data() {
    return {
      pokemonArr: [],
      pokemonRandom: null,  // video 95
      showPokemon: false,  // video 95
      showAnswer: false,  // video 97. esta flag decide si mostrar imagen de pokemon o no
      message: '',  // video 97
    }
  },
  methods:{
    // video 94
    async mixPokemonArray(){
      // Esto quiere decir: espera a que getPokemonOptions se resuelva y lo 
      // asignas a pokemonArr
      this.pokemonArr = await getPokemonOptions()
      
      // Se accede aleatoriamente a un elemento del array
      // y se le asigna a pokemonRandomId que tiene que existir
      // previamente en data()
      this.pokemonRandom = this.pokemonArr[Math.floor(Math.random() * this.pokemonArr.length)]
    },
    checkAnswer(pokemonId){
      // Se ejecuta cuando el usuario escoge un pokemon
      // video 96
      this.showAnswer = true  // se muestra respuesta + botón de new game
      if (pokemonId === this.pokemonRandom.id) {
        this.showPokemon = true  // muestra pokemon
        this.message = `Correct!, ${this.pokemonRandom.name.toUpperCase()}`
      } else {
        this.message = `Wrong, this pokemon was ${this.pokemonRandom.name.toUpperCase()}!`
      }
      // Como hago para que desde aquí se envie una notificación a PokemonOptions
      // y haga un cambio en el css si el jugador se equivocó o no ?
    },
    restartGame(){
      this.message = ''
      this.showAnswer = ''
      this.showPokemon = false,
      this.pokemonRandom = null,  // Se coloca null para que desaparezca enseguida la imagen del pokemon escogido

      this.mixPokemonArray()
    }
  },
  // video 94
  // lifeciclye hooks
  // cada vez que el componente está montado se ejecuta esto
  mounted(){
    // Luego cuando se llama esta función
    // se le carga a la variable this.pokemonArr lo que haga la func getPokemonOptions()
    this.mixPokemonArray()
  }

}
</script>