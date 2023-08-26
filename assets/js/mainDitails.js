const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const listpokemon = document.getElementById('pokedex');
const number = document.getElementsByClassName('number');

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
                        
                        <section class="pokeDetailContent">
                        <h2 class="pokeDetailData">Sobre</h2>
                        <ul class="pokeDetailAbout">
                          <li><strong>Altura</strong></li>
                          <li>${(pokemon.height / 10).toFixed(2)} m</li>
                          <li><strong>Peso</strong></li>
                          <li>${(pokemon.weight / 10).toFixed(2)} kg</li>
                          <li><strong>Abilidades</strong></li>
                          <li>${pokemon.abilities}</li>
                        </ul>
                        <h2 class="pokeDetailData">Status base</h2>
                        <div class="pokeDetailStatus">
                          <div class="statusName">
                            ${pokemon.stats.map((name_stats) => `
                            <p class="${type}">${name_stats.stat.name}</p>
                            `) .join("")}
                          </div>
                          <div class="statusNum">
                            ${pokemon.stats.map((base_stats) => `
                            <p>${base_stats.base_stat}</p>
                            `) .join('')}
                          </div>
                        </div>
                      </section>
                       
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