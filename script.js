const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const clearBtn = document.getElementById("clear-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");
const wildPokemon = document.getElementById("wildpokemon");

// stats
const pokemonHp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// images
const pokemonImage = document.getElementById("pokemonImg");
const ashImage = document.getElementById("ashimg");
const pokeball = document.getElementById("pokeball");

// don't show the divs for the pokemon info and stats yet
const pokemonInfo = document.getElementById("pokemon-info");
pokemonInfo.style.display = "none";

// function to show pokemon info
const showInfo = () => {
  // make the value of the searchInput lowercase to make it case-insensitive
  const searchValue = searchInput.value.toLowerCase();
  console.log(searchValue);

  pokemonTypes.innerHTML = "";

  if (searchValue === "") {
    alert("Please enter Pokemon name or ID to search for.");
    return;
  }

  //fetch from the API to find the matching Pokémon
  fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
    .then((response) => response.json())
    .then((data) => {
      const pokemon = data.results.find(
        (p) =>
          p.name.toLowerCase() === searchValue || p.id === parseInt(searchValue)
      );
      if (pokemon) {
        // fetch the detailed info using the URL from the first API
        return fetch(pokemon.url);
      } else {
        //throw new Error("Pokémon not found");
        alert("Pokémon not found");
      }
    })
    .then((response) => response.json())
    .then((pokemonData) => {
      // destructure pokemonData so no need to put pokemonData.category for each call
      const { name, id, weight, height, stats, sprites, types } = pokemonData;
      // display the Pokémon data from the URL

      pokemonInfo.style.display = "block";
      // capitalized the first letter of the pokemon name
      pokeName = name.charAt(0).toUpperCase() + name.slice(1);

      pokemonName.innerHTML = pokeName;

      // put name in the wildpokemon div as well
      wildPokemon.innerHTML = `Oh! A Wild ${pokeName} appeared!`;

      pokemonId.innerHTML = `#${id}`;
      pokemonWeight.innerHTML = `Weight: ${weight}`;
      pokemonHeight.innerHTML = `Height: ${height}`;

      //access the stats through the array 'stats' , then base_stat is storing the stats value
      pokemonHp.innerHTML = pokemonData.stats[0].base_stat;
      attack.innerHTML = stats[1].base_stat;
      defense.innerHTML = stats[2].base_stat;
      specialAttack.innerHTML = stats[3].base_stat;
      specialDefense.innerHTML = stats[4].base_stat;
      speed.innerHTML = stats[5].base_stat;

      // pokemon image
      pokemonImage.innerHTML = `<img src="${sprites.front_default}" alt="${name} image" id="sprite" class="pokemonimg" /> `;

      // ash image
      // credits: Ash Ketchum v2 back sprite by robloxmaster376 on DeviantArt

      ashImage.innerHTML = `<img
      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d036937d-a72f-43c1-b155-bafe45d2d742/ddtk694-d14642bf-9b73-430a-99c8-2c199bacc469.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QwMzY5MzdkLWE3MmYtNDNjMS1iMTU1LWJhZmU0NWQyZDc0MlwvZGR0azY5NC1kMTQ2NDJiZi05YjczLTQzMGEtOTljOC0yYzE5OWJhY2M0NjkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ubwKxezYeMnYAb7E0T2d0dCzqVM7P1h243KP1vctY0w"
      alt="ash image" class="ash"
    />`;

      // ashImage.innerHTML = `<img
      //     src="ash.png"
      //     alt="ash image" class="ash"
      //   />`;

      pokeball.innerHTML = `<img src="pokeballs.png" alt="pokeball image" class="pokeballs"/>`;

      // object to map types to their corresponding colors
      const typeColors = {
        normal: "#A8A878",
        fire: "#F08030",
        water: "#6890F0",
        electric: "#F8D030",
        grass: "#78C850",
        ice: "#98D8D8",
        fighting: "#C03028",
        poison: "#A040A0",
        ground: "#E0C068",
        flying: "#A890F0",
        psychic: "#F85888",
        bug: "#A8B820",
        rock: "#B8A038",
        ghost: "#705898",
        dragon: "#7038F8",
        dark: "#705848",
        steel: "#B8B8D0",
        fairy: "#F0B6BC",
      };

      pokemonTypes.innerHTML = types
        .map(
          (type) =>
            `<span class="${type.type.name.toLowerCase()}" style="background-color: ${
              typeColors[type.type.name]
            }">${type.type.name.toUpperCase()}</span>`
        )
        .join(" ");

      // so that there will be a single inner div for types
      // pokemonData.types.forEach((type) => {
      //   const typeName = type.type.name.toUpperCase();
      //   const typeColor = typeColors[type.type.name];

      //   // create a new div for each type
      //   const typeBox = document.createElement("div");
      //   typeBox.className = "types-box";
      //   typeBox.style.backgroundColor = typeColor;
      //   typeBox.textContent = typeName;

      //   // Append the new div to the #types container
      //   pokemonTypes.appendChild(typeBox);
      // });
    })
    .catch((error) => {
      pokemonInfo.innerHTML = `<p>${error.message}</p>`;
    });
};

// show info when button is clicked or when user 'entered' on the search bar
searchBtn.addEventListener("click", showInfo);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    showInfo();
  }
});

// clear
clearBtn.addEventListener("click", () => {
  //clear the search input field
  searchInput.value = "";

  pokemonInfo.style.display = "none";
});
