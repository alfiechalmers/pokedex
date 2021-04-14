function searchPokedex() {
    let pokemonInput = document.getElementById("pokemonInput").value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
        .then(response => {
            return response.json();
        })
        .then(pokemon => {
            document.getElementById("pokemonName").innerHTML = pokemon.species.name;
            document.getElementById("pokemonImage").src = pokemon.sprites.other["official-artwork"].front_default;
        })
}