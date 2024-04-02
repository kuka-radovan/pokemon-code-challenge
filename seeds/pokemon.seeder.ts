import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Pokemon } from '../src/modules/pokemon-catalog/entities/Pokemon.entity';
import { Type } from '../src/modules/pokemon-catalog/entities/Type.entity';
import { PokemonType } from '../src/modules/pokemon-catalog/entities/PokemonType.entity';
import { Attack } from '../src/modules/pokemon-catalog/entities/Attack.entity';
import { PokemonTypeCategory } from '@common/enums/PokemonTypeCategory';
import { AttackCategory } from '@common/enums/AttackCategory';

import * as pokemonsData from './pokemons.json';

type AttackData = {
  name: string;
  type: string;
  damage: number;
};

export class PokemonSeeder extends Seeder {
  pokemonTypes: Map<string, Type> = new Map<string, Type>();
  pokemonAttacks: Map<string, Attack> = new Map<string, Attack>();

  getOrCreateType(em: EntityManager, name: string): Type {
    let type = this.pokemonTypes.get(name);

    if (!type) {
      type = em.create(Type, { name });
      this.pokemonTypes.set(name, type);
    }

    return type;
  }

  persistPokemonTypeWithCategory(
    em: EntityManager,
    pokemonTypes: string[],
    pokemon: Pokemon,
    category: PokemonTypeCategory,
  ): PokemonType[] {
    const categoryTypes: PokemonType[] = [];

    for (const pokemonType of pokemonTypes) {
      const pokemonTypeRecord = em.create(PokemonType, {
        pokemon,
        type: this.getOrCreateType(em, pokemonType),
        category,
      });

      categoryTypes.push(pokemonTypeRecord);
    }

    return categoryTypes;
  }

  persistPokemonAttack(
    em: EntityManager,
    attacks: AttackData[],
    category: AttackCategory,
  ): Attack[] {
    const categoryAttacks: Attack[] = [];

    for (const attack of attacks) {
      let attackRecord = this.pokemonAttacks.get(attack.name);

      if (!attackRecord) {
        attackRecord = em.create(Attack, {
          name: attack.name,
          type: this.getOrCreateType(em, attack.type),
          damage: attack.damage,
          category,
        });

        this.pokemonAttacks.set(attack.name, attackRecord);
      }

      categoryAttacks.push(attackRecord);
    }

    return categoryAttacks;
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

      newPokemon.type.add(
        this.persistPokemonTypeWithCategory(
          em,
          pokemon.types,
          newPokemon,
          PokemonTypeCategory.TYPE,
        ),
      );

      newPokemon.weaknesses.add(
        this.persistPokemonTypeWithCategory(
          em,
          pokemon.weaknesses,
          newPokemon,
          PokemonTypeCategory.WEAKNESS,
        ),
      );

      newPokemon.resistant.add(
        this.persistPokemonTypeWithCategory(
          em,
          pokemon.resistant,
          newPokemon,
          PokemonTypeCategory.RESISTANT,
        ),
      );

      newPokemon.attacks.add(
        this.persistPokemonAttack(
          em,
          pokemon.attacks.fast,
          AttackCategory.FAST,
        ),
      );

      newPokemon.attacks.add(
        this.persistPokemonAttack(
          em,
          pokemon.attacks.special,
          AttackCategory.SPECIAL,
        ),
      );
    }
  }
}
