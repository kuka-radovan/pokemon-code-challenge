import {
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Collection,
  OneToMany,
  Embedded,
} from '@mikro-orm/core';
import { Attack } from './Attack.entity';
// import { Evolution } from './Evolution.entity';
import { PokemonTypeCategory } from '@common/enums/PokemonTypeCategory';
import { PokemonType } from './PokemonType.entity';
import { PokemonMeasurements } from './PokemonMeasurements.entity';

@Entity({ tableName: 'pokemons' })
export class Pokemon {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  classification!: string;

  @OneToMany(() => PokemonType, (pokemonType) => pokemonType.pokemon, {
    where: { category: PokemonTypeCategory.TYPE },
  })
  type = new Collection<PokemonType>(this);

  @OneToMany(() => PokemonType, (pokemonType) => pokemonType.pokemon, {
    where: { category: PokemonTypeCategory.RESISTANT },
  })
  resistant = new Collection<PokemonType>(this);

  @OneToMany(() => PokemonType, (pokemonType) => pokemonType.pokemon, {
    where: { category: PokemonTypeCategory.WEAKNESS },
  })
  weaknesses = new Collection<PokemonType>(this);

  @Embedded({ object: true })
  weight!: PokemonMeasurements;

  @Embedded({ object: true })
  height!: PokemonMeasurements;

  @Property({ columnType: 'float' })
  fleeRate!: number;

  @Property()
  maxCP: number;

  @Property()
  maxHP: number;

  @ManyToMany({ pivotTable: 'pokemon_attacks' })
  attacks = new Collection<Attack>(this);
}
