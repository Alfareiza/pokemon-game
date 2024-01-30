import pokemonApi from "@/api/pokemonApi"

const getPokemons = ()=> {
    // Así se crea un array de 650 posiciones vacías
    const pokemonsArr = Array.from( Array(650) )

    // Así se llena con números desde 1 hasta lenght
    return pokemonsArr.map( (_, index) => index + 1)
}

const getPokemonOptions = async() => {
    // Esta función obtiene información de 4 pokemons
    // de forma aleatoria

    // Llama al getPokemons() que genera el array de 650 números
    // y lo desordena
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 )

    // Elimina y retorna los elementos desde posisicion
    // 'start' hasta 'deleteCount'
    // splice(start, deleteCount)
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))
    // console.table(pokemons)
    return pokemons
}

async function getPokemonNames( [a,b,c,d]=[] ){
    // Esta función hace 4 llamados a API de PokeAPI
    // y retorna una lista con 4 objetos
    
    // Al agregar el await aqui abajo, se agrega el async arriba
    // const resp = await pokemonApi.get(`/${a}`)
    // console.log(resp.data.name)

    // Aquí no se han enviado las peticiones aún
    const arrPromises = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
    ]

    const [ respA, respB, respC, respD ] = await Promise.all( arrPromises )

    // console.log(a, b, c, d)
    return [
        {name: respA.data.name, id:respA.data.id},
        {name: respB.data.name, id:respB.data.id},
        {name: respC.data.name, id:respC.data.id},
        {name: respD.data.name, id:respD.data.id}
    ]
}

export default getPokemonOptions