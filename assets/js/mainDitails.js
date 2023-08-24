const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 200;
const limit = 1;
let offset = 0;

function convertPokemon(pokemon) {
    return `
    <h1 class="title">${pokemon.name} Nº&nbsp;${pokemon.number}</h1>
        <li class="pokemon ${pokemon.type}">
            
            <div class="detail">
                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
                <ol class="types">
                <h1>type</h1>
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                
                
            </div>
        </li>
    
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemon).join('')
        pokemonList.innerHTML = newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})