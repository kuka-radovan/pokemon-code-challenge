import {
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
import { Attack } from './Attack.entity';
import { Evolution } from './Evolution.entity';
import { PokemonTypeAssociation } from './PokemonTypeAssociation.entity';

@Entity({ tableName: 'pokemons' })
export class Pokemon {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  classification!: string;

  @OneToMany(() => PokemonTypeAssociation, (association) => association.pokemon)
  associations = new Collection<PokemonTypeAssociation>(this);

  @Property({ type: 'jsonb' })
  weight!: { minimum: string; maximum: string };

  @Property({ type: 'jsonb' })
  height!: { minimum: string; maximum: string };

  @Property({ columnType: 'float' })
  fleeRate!: number;

  @OneToMany(() => Evolution, (evolution) => evolution.pokemon)
  evolutions = new Collection<Evolution>(this);

  @Property()
  maxCP: number;

  @Property()
  maxHP: number;

  @ManyToMany({ pivotTable: 'pokemon_attacks' })
  attacks = new Collection<Attack>(this);
}
