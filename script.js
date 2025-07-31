let team = [];
let input = document.querySelector("input");
let pokemonName = "";
let pokemonData = null;

// Function to fetch data
// Need to learn async, await, promises, requests, whatnot
async function getPokeData(pokemonName) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function setPokemonContainer(pokemonData) {
  let name = document.getElementById("name");
  let sprite = document.getElementById("sprite");
  let types = document.getElementById("types");
  let stats = document.getElementById("stats");
  let addButton = document.getElementById("addToTeam");
  name.innerText = pokemonData.name;
  console.log(pokemonData.sprites.front_default);
  sprite.innerHTML = `<img src="${pokemonData.sprites.front_default}">`;
  let typesContainer = document.createElement("ul");
  for (i = 0; i < pokemonData.types.length; i++) {
    let type = pokemonData.types[i].type.name;
    let element = document.createElement("li");
    element.innerText = type;
    typesContainer.appendChild(element);
  }
  types.innerHTML = "";
  types.appendChild(typesContainer);
  let statsContainer = document.createElement("ul");
  for (i = 0; i < pokemonData.stats.length; i++) {
    let statType = pokemonData.stats[i].stat.name;
    let statValue = pokemonData.stats[i].base_stat;
    let listItem = document.createElement("li");
    listItem.innerText = statType + " : " + statValue;
    statsContainer.appendChild(listItem);
  }
  stats.innerHTML = "";
  stats.appendChild(statsContainer);
}

input.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    pokemonName = input.value;
    pokemonData = await getPokeData(pokemonName);
    input.value = "";
    setPokemonContainer(pokemonData);
  }
});
