export default function fetchPokemon() {
    const urlPokemon = "https://pokeapi.co/api/v2/pokemon/", $pokeBox = document.getElementById("poke-box"), fragment = document.createDocumentFragment();
    let listPokemon;
    const nextButton = document.querySelector('#bNextList');
    const previousButton = document.querySelector('#bPreviousList');
    loadPokemonList(urlPokemon, $pokeBox, fragment)
        .then((res) => {
        listPokemon = res;
    });
    previousButton.addEventListener('click', () => {
        console.log("gola");
        if (listPokemon.previous !== null) {
            loadPokemonList(listPokemon.previous, $pokeBox, fragment)
                .then((res) => {
                listPokemon = res;
            });
        }
    });
    nextButton.addEventListener('click', () => {
        if (listPokemon.next !== null) {
            loadPokemonList(listPokemon.next, $pokeBox, fragment)
                .then((res) => {
                listPokemon = res;
            });
        }
    });
}
function loadPokemonList(url, $pokeBox, fragment) {
    return fetch(url)
        .then(res => res.json())
        .then((res) => {
        res.results.forEach((pokemon) => {
            const $figure = document.createElement("figure"), $img = document.createElement("img"), $figcaption = document.createElement("figcaption"), $namePokemon = document.createTextNode(pokemon.name);
            $img.setAttribute("alt", pokemon.name);
            $img.setAttribute("title", pokemon.name);
            fetch(pokemon.url)
                .then(res => res.json())
                .then((res) => {
                $img.setAttribute("src", res.sprites.front_default);
            });
            $figcaption.appendChild($namePokemon);
            $figure.appendChild($img);
            $figure.appendChild($figcaption);
            $figure.classList.add("pokeFigure");
            fragment.appendChild($figure);
        });
        $pokeBox.appendChild(fragment);
        return res;
    });
}
