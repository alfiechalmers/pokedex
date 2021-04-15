fetch("https://pokeapi.co/api/v2/pokemon/")
.then(response => {
    return response.json();
})
.then(pokemon => {
for (let i = 0; i < 4; i++) {
    let lowerCaseName = pokemon.results[i].name;
    document.getElementById("name" + i).innerHTML = lowerCaseName.charAt(0).toUpperCase() + lowerCaseName.slice(1);
    fetch(pokemon.results[i].url)
        .then(response => {
            return response.json();
        })
        .then(pokemon => {
            document.getElementById("image" + i).src = pokemon.sprites.other["official-artwork"].front_default;
        });
}

})