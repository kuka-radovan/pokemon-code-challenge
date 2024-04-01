import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Pokemon } from '../src/modules/pokemon-catalog/entities/Pokemon.entity';
import { PokemonType } from '../src/modules/pokemon-catalog/entities/PokemonType.entity';
import { PokemonTypeAssociation } from '../src/modules/pokemon-catalog/entities/PokemonTypeAssociation.entity';
import { PokemonTypeAssociationCategory } from '@common/enums/PokemonTypeAssociationCategory';

import * as pokemonsData from './pokemons.json';

export class PokemonSeeder extends Seeder {
  pokemons: Pokemon[] = [];
  pokemonTypes: Map<string, PokemonType> = new Map<string, PokemonType>();

  createPokemonTypeAssociationsForCategory(
    em: EntityManager,
    pokeTypes: string[],
    pokemon: Pokemon,
    category: PokemonTypeAssociationCategory,
  ): PokemonTypeAssociation[] {
    const categoryTypes = [];

    for (const pokemonType of pokeTypes) {
      let type = this.pokemonTypes.get(pokemonType);

      if (!type) {
        type = em.create(PokemonType, { name: pokemonType });
        this.pokemonTypes.set(pokemonType, type);
      }

      const association = em.create(PokemonTypeAssociation, {
        pokemon,
        type,
        category,
      });

      categoryTypes.push(association);
    }

    return categoryTypes;
  }

  async run(em: EntityManager): Promise<void> {
    for (const pokemon of pokemonsData) {
      const newPokemon = em.create(Pokemon, {
        id: pokemon.id,
        name: pokemon.name,
        classification: pokemon.classification,
        weight: pokemon.weight,
        height: pokemon.height,
        fleeRate: pokemon.fleeRate,
        maxCP: pokemon.maxCP,
        maxHP: pokemon.maxHP,
      });

      // Persist pokemon types
      newPokemon.type.add(
        this.createPokemonTypeAssociationsForCategory(
          em,
          pokemon.types,
          newPokemon,
          PokemonTypeAssociationCategory.TYPE,
        ),
      );

      // Persist weaknesses
      newPokemon.weaknesses.add(
        this.createPokemonTypeAssociationsForCategory(
          em,
          pokemon.weaknesses,
          newPokemon,
          PokemonTypeAssociationCategory.WEAKNESS,
        ),
      );

      // Persist resistances
      newPokemon.resistant.add(
        this.createPokemonTypeAssociationsForCategory(
          em,
          pokemon.resistant,
          newPokemon,
          PokemonTypeAssociationCategory.RESISTANT,
        ),
      );

      this.pokemons.push(newPokemon);
    }

    em.persist(this.pokemons);
  }
}
