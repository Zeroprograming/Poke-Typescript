export default function fetchPokemon() {
    const urlPokemon = "https://pokeapi.co/api/v2/pokemon/", $pokeBox = document.getElementById("poke-box"), fragment = document.createDocumentFragment();
    let listPokemon;
    let popup = document.getElementById("popup");
    const closePopups = popup.querySelectorAll(".closePopup");
    closePopups.forEach((closeButton) => {
        closeButton.addEventListener("click", () => {
            popup.classList.remove("open-popup");
        });
    });
    const nextButton = document.querySelector("#bNextList");
    const previousButton = document.querySelector("#bPreviousList");
    function addClickListenerClose(object) {
        object.addEventListener("click", () => {
            popup === null || popup === void 0 ? void 0 : popup.classList.remove("open-popup");
        });
    }
    loadPokemonList(urlPokemon, $pokeBox, fragment)
        .then((res) => {
        listPokemon = res;
        if (popup !== null) {
            pokeButtonActions(popup, listPokemon);
        }
    });
    previousButton.addEventListener("click", () => {
        if (listPokemon.previous !== null) {
            loadPokemonList(listPokemon.previous, $pokeBox, fragment)
                .then((res) => {
                listPokemon = res;
                if (popup !== null) {
                    pokeButtonActions(popup, listPokemon);
                }
            });
        }
    });
    nextButton.addEventListener("click", () => {
        if (listPokemon.next !== null) {
            loadPokemonList(listPokemon.next, $pokeBox, fragment)
                .then((res) => {
                listPokemon = res;
                if (popup !== null) {
                    pokeButtonActions(popup, listPokemon);
                }
            });
        }
    });
}
function loadPokemonList(url, $pokeBox, fragment) {
    while ($pokeBox.firstChild) {
        $pokeBox.removeChild($pokeBox.firstChild);
    }
    return fetch(url)
        .then((res) => res.json())
        .then((res) => {
        res.results.forEach((pokemon) => {
            const $buttonFigure = document.createElement("button"), $img = document.createElement("img"), $figcaption = document.createElement("figcaption"), $namePokemon = document.createTextNode(pokemon.name), $article = document.createElement("article");
            $img.setAttribute("alt", pokemon.name);
            $img.setAttribute("title", pokemon.name);
            fetch(pokemon.url)
                .then((res) => res.json())
                .then((res) => {
                $img.setAttribute("src", res.sprites.front_default);
                setBgColorType($buttonFigure, res.types[0].type.name);
            });
            $figcaption.appendChild($namePokemon);
            $buttonFigure.appendChild($img);
            $buttonFigure.appendChild($figcaption);
            $buttonFigure.classList.add("pokeButton");
            $article.appendChild($buttonFigure);
            $article.classList.add("pokeArticle");
            fragment.appendChild($article);
        });
        // AGREGAR EL FRAGMENTO A LA CAJA DE POKEMON
        $pokeBox.appendChild(fragment);
        return res;
    });
}
function setBgColorType(element, type) {
    switch (type) {
        case "normal":
            element.style.backgroundColor = "#D7DBDD";
            break;
        case "fighting":
            element.style.backgroundColor = "#E59866";
            break;
        case "flying":
            element.style.backgroundColor = "#85C1E9";
            break;
        case "poison":
            element.style.backgroundColor = "#BB8FCE";
            break;
        case "rock":
            element.style.backgroundColor = "#A1887F";
            break;
        case "bug":
            element.style.backgroundColor = "#52BE80";
            break;
        case "ghost":
            element.style.backgroundColor = "#7B1FA2";
            break;
        case "steel":
            element.style.backgroundColor = "#85929E";
            break;
        case "fire":
            element.style.backgroundColor = "#E74C3C";
            break;
        case "water":
            element.style.backgroundColor = "#4FC3F7";
            break;
        case "grass":
            element.style.backgroundColor = "#58D68D";
            break;
        case "electric":
            element.style.backgroundColor = "#FFF176";
            break;
        case "psychic":
            element.style.backgroundColor = "#A569BD";
            break;
        case "ice":
            element.style.backgroundColor = "#4FC3F7";
            break;
        case "dragon":
            element.style.backgroundColor = "#FFD54F";
            break;
        case "dark":
            element.style.backgroundColor = "#5D6D7E";
            break;
        case "fairy":
            element.style.backgroundColor = "#FF33FF";
            break;
        default:
            console.log("Error");
    }
}
function pokeButtonActions(popup, listPokemon) {
    const pokeButtons = document.querySelectorAll(".pokeButton");
    pokeButtons.forEach((pokeButton) => {
        pokeButton.addEventListener("click", () => {
            var _a;
            pokeButton.classList.add("pushed");
            const nameText = (_a = pokeButton.querySelector("figcaption")) === null || _a === void 0 ? void 0 : _a.textContent;
            listPokemon.results.forEach(element => {
                if (element.name === nameText) {
                    const urlPokemon = element.url;
                    fetch(urlPokemon)
                        .then((res) => res.json())
                        .then((pokemon) => {
                        const $imgPokemon = popup.querySelector(".imgPokemon");
                        const $titlePokemon = popup.querySelector(".titleNamePokemon");
                        const statsContainer = popup.querySelector(".statsContainer");
                        const pokemonList = document.createElement("ul");
                        const liId = document.createElement("li");
                        liId.textContent = "ID: " + pokemon.id;
                        pokemonList.appendChild(liId);
                        const liName = document.createElement("li");
                        liName.textContent = "Name: " + pokemon.name;
                        pokemonList.appendChild(liName);
                        const liBase_experience = document.createElement("li");
                        liBase_experience.textContent = "Base Experience: " + pokemon.base_experience;
                        pokemonList.appendChild(liName);
                        // abilities
                        const ultitle = document.createElement("li");
                        ultitle.textContent = "abilities: ";
                        const ulAbilities = document.createElement("ul");
                        ultitle.appendChild(ulAbilities);
                        pokemon.abilities.forEach((res) => {
                            const li = document.createElement("li");
                            li.textContent = res.ability.name;
                            ulAbilities.appendChild(li);
                        });
                        pokemonList.appendChild(ultitle);
                        // type Pokemon
                        const liTypePokemon = document.createElement("li");
                        liTypePokemon.textContent = "Type: ";
                        const ulTypes = document.createElement("ul");
                        liTypePokemon.appendChild(ulTypes);
                        pokemon.types.forEach((res) => {
                            const liTypes = document.createElement("li");
                            liTypes.textContent = res.type.name;
                            ulTypes.appendChild(liTypes);
                        });
                        pokemonList.appendChild(liTypePokemon);
                        // stats pokemon
                        const liStatsPokemon = document.createElement("li");
                        liStatsPokemon.textContent = "Stats: ";
                        const ulStats = document.createElement("ul");
                        liStatsPokemon.appendChild(ulStats);
                        pokemon.stats.forEach((res) => {
                            const liStats = document.createElement("li");
                            liStats.textContent = res.stat.name.replace("-", " ") + ": " + res.base_stat;
                            ulStats.appendChild(liStats);
                        });
                        pokemonList.appendChild(liStatsPokemon);
                        const existingList = statsContainer.querySelector("ul");
                        if (existingList) {
                            existingList.remove();
                        }
                        statsContainer.appendChild(pokemonList);
                        $titlePokemon.textContent = pokemon.name;
                        $imgPokemon.setAttribute("src", pokemon.sprites.front_default);
                    });
                }
            });
            popup.classList.add("open-popup");
            setTimeout(() => {
                pokeButton.classList.remove("pushed");
            }, 300);
        });
    });
}
