let team = [];
let input = document.querySelector("input");
let pokemonName = "";
let pokemonData = null;
let teamContainer = document.getElementById('team')

// Local Storage, checks if there is and gets it if there is
team = JSON.parse(localStorage.getItem('team')) || [];
renderTeam();

// Function to fetch data
// Need to learn async, await, promises, requests, whatnot
async function getPokeData(pokemonName) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Display pokemon Info
function setPokemonContainer(pokemonData) {
  // Get HTML elements
  let name = document.getElementById("name");
  let sprite = document.getElementById("sprite");
  let types = document.getElementById("types");
  let stats = document.getElementById("stats");
  let addButton = document.getElementById("addToTeam");

  // Wipe Old pokemon Info
  types.innerHTML = "";
  stats.innerHTML = "";

  // Fill out types, takes into account if there are more than one type
  let typesContainer = document.createElement("ul");
  for (let i = 0; i < pokemonData.types.length; i++) {
    let type = pokemonData.types[i].type.name;
    let typeItem = document.createElement("li");
    typeItem.innerText = type;
    typesContainer.appendChild(typeItem);
  }

  let statsContainer = document.createElement("ul");
  for (let i = 0; i < pokemonData.stats.length; i++) {
    let statType = pokemonData.stats[i].stat.name;
    let statValue = pokemonData.stats[i].base_stat;
    let listItem = document.createElement("li");
    listItem.innerText = statType + " : " + statValue;
    statsContainer.appendChild(listItem);
  }

  // Setters, set the info back onto HTML
  types.appendChild(typesContainer);
  stats.appendChild(statsContainer);
  name.innerText = pokemonData.name;
  sprite.innerHTML = `<img src="${pokemonData.sprites.front_default}">`;

  addButton.onclick = () => addPokemonToTeam(pokemonData)
}


function renderTeam() {
  teamContainer.innerHTML = ''

  team.forEach(pokemonData => {
    const card = document.createElement('div')
    card.classList.add('pokemonContainer')

    const name = document.createElement('p')
    name.innerText = pokemonData.name;

    const img = document.createElement('img')
    img.src = pokemonData.sprites.front_default

    const removeButton = document.createElement('button')
    removeButton.innerText = 'Remove'
    removeButton.addEventListener('click', () => {
      team = team.filter(p => p.name !== pokemonData.name);
      renderTeam();
    })

    // Actually build the card
    card.appendChild(name);
    card.appendChild(img)
    card.appendChild(removeButton)

    teamContainer.appendChild(card)
  })
}
// Fix and replace with easier to read code, decouple DOM and Data
function addPokemonToTeam (pokemonData){
  if (team.length >= 6) {
    alert('Your Team is full!')
    return
  }

  team.push(pokemonData)
  localStorage.setItem('team', JSON.stringify(team))
  renderTeam();
}


input.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    pokemonName = input.value;
    pokemonData = await getPokeData(pokemonName);
    input.value = "";
    setPokemonContainer(pokemonData);
  }
});
