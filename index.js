const pokemonDiv = document.getElementById("main");
appendPokemon("https://pokeapi.co/api/v2/pokemon/?limit=20")
function createPokemonNode(id, name, type, imageURL) {
  var div = document.createElement("div");
  div.classList.add("pokemon");

  div.innerHTML = `
    <div id="${id}">
      <h1>${name} (#${id})</h1>
      <img class="img ${type}" src="${imageURL}"/>
      <center>
        <a class="details-btn" href="pokemon.html?id=${id}">Details</a>
      </center>
    </div>
`;
  return div;
}

function appendPokemon(link) {
  pokemonDiv.innerHTML = null;
  var pokemon = [];
  fetch(link)
  .then((response) => response.json())
  .then((data) => {
    let results = data.results;
      results.forEach((element) => {
      fetch(element.url)
        .then((response) => response.json())
        .then((data) => {
          pokemon.push(data);
            let id = data.id;
            let name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            let type = data.types[0].type.name;
            let imageURL = data.sprites.other["official-artwork"].front_default;
            pokemonDiv.appendChild(createPokemonNode(id, name, type, imageURL));
        });
    });
  })}

let link = "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=";
let offset = 0;
function previous() {
  if (offset < 20) return;
  offset = offset - 20;
  appendPokemon(link + offset)
}
function next() {
  offset = offset + 20;
  let newLink = link + offset;
  appendPokemon(newLink)
}