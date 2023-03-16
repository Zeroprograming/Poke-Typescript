import { listPokemon, pokemon } from "./interface/interface"

export default function fetchPokemon(): void {
    const urlPokemon: string = "https://pokeapi.co/api/v2/pokemon/",
    $pokeBox: HTMLElement = <HTMLElement> document.getElementById("poke-box"),
    fragment: Node = document.createDocumentFragment();

    let listPokemon: listPokemon;

    const nextButton = document.querySelector('#bNextList')!;
    const previousButton = document.querySelector('#bPreviousList')!;

    loadPokemonList(urlPokemon, $pokeBox, fragment)
  .then((res: listPokemon) => {
    listPokemon = res;
  });

    previousButton.addEventListener('click', () => {
        console.log("gola")
        if (listPokemon.previous !== null) {
          loadPokemonList(listPokemon.previous, $pokeBox, fragment)
          .then((res: listPokemon) => {
            listPokemon = res;
          });
        }
      });
      
      nextButton.addEventListener('click', () => {
        if (listPokemon.next !== null) {
          loadPokemonList(listPokemon.next, $pokeBox, fragment)
          .then((res: listPokemon) => {
            listPokemon = res;
          });
        }
      });

}

function loadPokemonList(url: string, $pokeBox: HTMLElement, fragment: Node): Promise<listPokemon>  {
    
   return fetch(url)
    .then(res => res.json())
    .then((res: listPokemon) => {
        res.results.forEach((pokemon) => {

            const $figure: HTMLElement = document.createElement("figure"),
                $img: HTMLElement = document.createElement("img"),
                $figcaption: HTMLElement = document.createElement("figcaption"),
                $namePokemon: Node = document.createTextNode(pokemon.name);

            $img.setAttribute("alt", pokemon.name)
            $img.setAttribute("title", pokemon.name)

            fetch(pokemon.url)
                .then(res => res.json())
                .then((res: pokemon) => {
                    $img.setAttribute("src", res.sprites.front_default)
            });

            $figcaption.appendChild($namePokemon)
            $figure.appendChild($img)
            $figure.appendChild($figcaption)
            $figure.classList.add("pokeFigure")
            fragment.appendChild($figure)          

        });

        $pokeBox.appendChild(fragment); 

        return res;
    });
}
