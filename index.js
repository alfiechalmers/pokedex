const pokemonDiv = document.getElementById("main");
var urlParams = new URLSearchParams(window.location.search);
var offset = Number(urlParams.get("offset"));

GetPokemon(0);

function createPokemonNode(id, name, type, imageURL) {
  var div = document.createElement("div");
  div.classList.add("pokemon");

  div.innerHTML = `
    <div id="${id}">
      <h1>${name} (#${id})</h1>
      <img class="img ${type}" src="${imageURL}"/>
    </div>
`;
  return div;
}

async function GetPokemon() {
  const urls = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
  )
    .then(res => res.json())
    .then(p => p.results.map(r => r.url));

  let promises = [];
  urls.forEach(u =>
    promises.push(
      new Promise(resolve =>
        fetch(u)
          .then(res => res.json())
          .then(j => resolve(j))
      )
    )
  );

  let pokis = await Promise.all(promises);

  pokemonDiv.innerHTML = "";
  pokis.forEach(poki => {
    pokemonDiv.appendChild(
      createPokemonNode(
        poki.id,
        poki.name.charAt(0).toUpperCase() + poki.name.slice(1),
        poki.types[0].type.name,
        poki.sprites.other["official-artwork"].front_default
      )
    );
  });
}
function previous() {
  if (offset < 20) return;
  offset-=20;
  window.location.href = `?offset=${offset}`;
}
function next() {
  offset+=20;
  console.log(offset)
  window.location.href = `?offset=${offset}`;
}