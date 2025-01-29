const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const elmentName = document.getElementById('pokemon-name');
const elementId = document.getElementById('pokemon-id');
const elementWeight = document.getElementById('weight');
const elementHeight = document.getElementById('height');
const elementAvatar = document.getElementById('sprite');
const elementType = document.getElementById('types');
const elementHp = document.getElementById('hp');
const elementAttack = document.getElementById('attack');
const elementDefense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const elementSpeed = document.getElementById('speed');

let listAllPokemons = [];
fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon').then((res) => res.json()).then((data) => {
    listAllPokemons = data.results;
}).catch((err) => {
    console.log('Error getting data');
});

const searchByNameOrId = (name, id) => {
    const pokemonNameOrId = listAllPokemons.find(pokemon => {
        if (name) {
            return pokemon.name.toLowerCase() === name.toLowerCase().trim();
        } else if (id) {
            return pokemon.id === parseInt(id);
        }
    });

    if (pokemonNameOrId) {
        fetch(pokemonNameOrId.url).then((res) => res.json()).then((data) => {
            console.log(data);
            const name = data.name;
            const id = data.id;
            const weight = data.weight;
            const height = data.height;
            const types = data.types.map(type => type.type.name).join(' ');
            const hp = data.stats[0].base_stat;
            const attack = data.stats[1].base_stat;
            const defense = data.stats[2].base_stat;
            const sp_attack = data.stats[3].base_stat;
            const sp_defense = data.stats[4].base_stat;
            const speed = data.stats[5].base_stat;
            const avatar = data.sprites.front_default;
            console.log(types);
            handlePokemonData(name, id, weight, height, avatar, types, hp, attack, defense, sp_attack, sp_defense, speed);
        }).catch((err) => {
            console.log('Error getting data from Pokémon details fetch:', err);
        });
    } else {
        console.log('error pokemon not found');
        alert("Pokémon not found");
    }
}

const handlePokemonData = (name, id, Weight, height, avatar, type,
    hp, attack, defense, sp_attack,
    sp_defense, speed) => {
    elementType.innerHTML = '';
    elmentName.textContent = name.toUpperCase();
    elementId.textContent = `#${id}`;
    elementWeight.textContent = `Weight: ${Weight}`;
    elementHeight.textContent = `height: ${height}`;
    elementAvatar.src = avatar;
    elementAvatar.alt = name;
    const typesArray = type.split(' ');
    elementType.innerHTML = typesArray.map(type => `<span class="type">${type.toUpperCase()}</span>`).join('  ');
    elementHp.textContent = hp;
    elementAttack.textContent = attack;
    elementDefense.textContent = defense;
    specialAttack.textContent = sp_attack;
    specialDefense.textContent = sp_defense;
    elementSpeed.textContent = speed;
    setTimeout(() => {
        randomColor();
    }, 50);
}

const randomColor = () => {
    const colors = [
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "purple",
        "pink",
        "brown",
        "white",
        "gray",
        "cyan",
        "magenta"
    ];

    const typeElements = document.querySelectorAll('.type');

    typeElements.forEach(element => {
        const randomCol = colors[Math.floor(Math.random() * colors.length)];
        element.style.backgroundColor = randomCol;
    });
};


searchBtn.addEventListener('click', (event) => {
    let inputValue = document.getElementById('search-input').value.toLowerCase();
    if (isNaN(inputValue)) {
        searchByNameOrId(inputValue, undefined)
        randomColor();
    } else if (!isNaN(inputValue)) {
        searchByNameOrId(undefined, inputValue)
        randomColor()
    } else {
        console.log('error gettin input value');
    }

})
