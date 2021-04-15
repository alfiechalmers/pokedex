//searches the api for the input provided by the user
function searchPokedex() {
    let pokemonInput = document.getElementById("pokemonInput").value.toLowerCase();
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
        .then(response => {
            return response.json();
        })
        .then(pokemon => {
            let lowerCaseName = pokemon.species.name;
            document.getElementById("pokemonName").innerHTML = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1);
            document.getElementById("pokemonImage").src = pokemon.sprites.other["official-artwork"].front_default;
        })
}
//allows use of the enter key to search as well as the search button
document.getElementById("pokemonInput").addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        searchPokedex();
    }
})