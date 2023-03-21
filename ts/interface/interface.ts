export interface listPokemon {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface pokemon {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    0: {
      type: {
        name: string;
      };
    };
  };
}

export interface pokemonInfo {
  id: string;
  name: string;
  base_experience: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  
  sprites: {
    front_default: string;
  };
  types: {
      type: {
        name: string;
    };
  }[];
  stats: {
      base_stat: string;
      stat: {
        name: string;
      };
  }[];
}
