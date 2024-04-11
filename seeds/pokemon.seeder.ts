import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Pokemon } from '../src/modules/pokemon-catalog/entities/Pokemon.entity';
import { Type } from '../src/modules/pokemon-catalog/entities/Type.entity';
import { PokemonType } from '../src/modules/pokemon-catalog/entities/PokemonType.entity';
import { Attack } from '../src/modules/pokemon-catalog/entities/Attack.entity';
import { Evolution } from '../src/modules/pokemon-catalog/entities/Evolution.entity';
import { PokemonTypeCategory } from '@common/enums/PokemonTypeCategory';
import { AttackCategory } from '@common/enums/AttackCategory';
import { EvolutionRequirements } from '../src/modules/pokemon-catalog/entities/EvolutionRequirements.entity';

import * as pokemonsData from './pokemons.json';

type AttackData = {
  name: string;
  type: string;
  damage: number;
};

export class PokemonSeeder extends Seeder {
  evolutions = new Map<number, Evolution>();
  pokemonTypes = new Map<string, Type>();
  pokemonAttacks = new Map<string, Attack>();

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

  persistPokemonEvolution(
    em: EntityManager,
    pokemon: Pokemon,
    previousEvolutionPokemonId?: number | null,
    evolutionRequirements?: EvolutionRequirements | null,
  ): void {
    const previousEvolutionRecord = previousEvolutionPokemonId
      ? this.evolutions.get(previousEvolutionPokemonId)
      : null;

    const evolutionRecord = em.create(Evolution, {
      pokemon,
      previousEvolution: previousEvolutionRecord,
      nextEvolution: null,
      evolutionRequirements: evolutionRequirements,
    });

    this.evolutions.set(parseInt(pokemon.id, 10), evolutionRecord);

    if (previousEvolutionRecord) {
      previousEvolutionRecord.nextEvolution = evolutionRecord;
    }
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

      newPokemon.attacks.add([
        ...this.persistPokemonAttack(
          em,
          pokemon.attacks.fast,
          AttackCategory.FAST,
        ),
        ...this.persistPokemonAttack(
          em,
          pokemon.attacks.special,
          AttackCategory.SPECIAL,
        ),
      ]);

      // Create evolution record for those pokemons that have at least one previous or next evolution
      if (pokemon['Previous evolution(s)'] || pokemon.evolutions) {
        this.persistPokemonEvolution(
          em,
          newPokemon,
          pokemon['Previous evolution(s)']?.reverse()[0].id ?? null,
          pokemon.evolutionRequirements ?? null,
        );
      }
    }

    await em.flush();
  }
}
