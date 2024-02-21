import {
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
  Collection,
} from '@mikro-orm/core';
import { PokemonTypeAssociation } from './PokemonTypeAssociation.entity';

@Entity({ tableName: 'pokemon_types' })
export class PokemonType {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  name!: string;

  @OneToMany(() => PokemonTypeAssociation, (association) => association.type)
  pokemons = new Collection<PokemonTypeAssociation>(this);
}
