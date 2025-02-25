export interface Pokemon {
    id: string;
    name: string;
    image: string;
    types: string[];
    attacks: {
        fast: Attack[];
        special: Attack[];
    };
    evolutions?: Evolution[];
    maxCP: number;
    maxHP: number;
}

export interface Attack {
    __typename: string;
    name: string;
    type: string;
    damage: number;
}

export interface Evolution {
    id: string;
    name: string;
    image: string;
}
