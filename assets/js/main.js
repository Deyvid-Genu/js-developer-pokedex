const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `<div class="container">
        <div class="card ${pokemon.type}">
        <img
          src="${pokemon.photo}"
          alt="${pokemon.name}">
        <div class="info">
          <span class="name">${pokemon.name}</span>
          <span class="number">#${pokemon.number}</span>
          ${pokemon.types
            .map((type) => `<span class="types ${type}">${type}</span>`)
            .join("")}
        </div>
        <div class="stats">
          <div class="points">
            <span class="subtitle">Points</span>
            ${pokemon.stats
              .map((stat) => `<span class="type ${stat}">${stat}</span>`)
              .join("")}
          </div>
          <div class="abilities">
            <span class="subtitle">Abilities</span>
            ${pokemon.abilities
              .map(
                (ability) => `<span class="type ${ability}">${ability}</span>`
              )
              .join("")}
          </div>
        </div>
      </div>
      </div> </div>   `;
}

function loadPokemonItens(offset, limit) {
  return new Promise((resolve, reject) => {
    pokeApi
      .getPokemons(offset, limit)
      .then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join("");
        pokemonList.innerHTML += newHtml;
        resolve();
      })
      .catch(reject);
  });
}

async function addClickCard() {
  await loadPokemonItens(offset, limit);

  console.log("Adicionando event listeners aos cards...");
  const cards = document.querySelectorAll(".card");
  console.log(cards);

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      console.log("Clicou no card:", card);
      card.classList.toggle("active");
    });
  });
  console.log("Event listeners adicionados aos cards.");
}

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
  addClickCard();
});

addClickCard();
