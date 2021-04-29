const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get("id");

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => {
            return response.json();
        })
        .then(pokemon => {
            createPokemonNode(pokemon.id, pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1), pokemon.types[0].type.name, pokemon.id)
        })



function createPokemonNode(id, name, type, imageUrl) {
  var div = document.createElement("div");
  div.classList.add("pokemon");

  div.innerHTML = `
          <h1>${name}</h1>
          <img src="${imageUrl}"/>
          <div class="type">${type}</div>
          <a class="details-btn" href="pokemon.html?id=${id}">Details</a>
      `;

  return div;
}

function appendManyPokemon(objectOfPokemon) {
  objectOfPokemon.forEach((pokemon) => {
    pokemonDiv.appendChild(
      createPokemonNode(
        pokemon.id,
        pokemon.name,
        pokemon.type[0],
        pokemon.imageUrl
      )
    );
  });
}