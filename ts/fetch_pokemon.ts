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
  while ($pokeBox.firstChild) {
    $pokeBox.removeChild($pokeBox.firstChild);
  }  


   return fetch(url)
    .then(res => res.json())
    .then((res: listPokemon) => {
        res.results.forEach((pokemon) => {

            const $figure: HTMLElement = document.createElement("figure"),
                $img: HTMLElement = document.createElement("img"),
                $figcaption: HTMLElement = document.createElement("figcaption"),
                $namePokemon: Node = document.createTextNode(pokemon.name),
                $article: HTMLElement = document.createElement("article");

            $img.setAttribute("alt", pokemon.name)
            $img.setAttribute("title",pokemon.name)

            fetch(pokemon.url)
                .then(res => res.json())
                .then((res: pokemon) => {
                    $img.setAttribute("src", res.sprites.front_default)
                    console.log( res.types[0].type.name)
                    setBgColorType($article, res.types[0].type.name)
            });

            $figcaption.appendChild($namePokemon)
            $figure.appendChild($img)
            $figure.appendChild($figcaption)
            $article.appendChild($figure)
            $article.classList.add("pokeArticle");
            
            fragment.appendChild($article)          

        });

        $pokeBox.appendChild(fragment); 

        return res;
    });
}

function setBgColorType(element: HTMLElement, type: string): void {
  switch(type){
   case "normal": element.style.backgroundColor = "#D7DBDD"; break;
   case "fighting": element.style.backgroundColor = "#E59866"; break;
   case "flying": element.style.backgroundColor = "#85C1E9"; break;
   case "poison": element.style.backgroundColor = "#BB8FCE"; break;
   case "rock": element.style.backgroundColor = "#A1887F"; break;
   case "bug": element.style.backgroundColor = "#52BE80"; break;
   case "ghost": element.style.backgroundColor = "#7B1FA2"; break;
   case "steel": element.style.backgroundColor = "#85929E"; break;
   case "fire": element.style.backgroundColor = "#E74C3C"; break;
   case "water": element.style.backgroundColor = "#4FC3F7"; break;
   case "grass": element.style.backgroundColor = "#58D68D"; break;
   case "electric": element.style.backgroundColor = "#FFF176"; break;
   case "psychic": element.style.backgroundColor = "#A569BD"; break;
   case "ice": element.style.backgroundColor = "#4FC3F7"; break;
   case "dragon": element.style.backgroundColor = "#FFD54F"; break;
   case "dark": element.style.backgroundColor = "#5D6D7E"; break;
   case "fairy": element.style.backgroundColor = "#FF33FF"; break;
  
   
   default: console.log("Error");
  }


}


