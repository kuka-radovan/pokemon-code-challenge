import { Entity, Enum, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { PokemonTypeCategory } from '@common/enums/PokemonTypeCategory';
import { Type } from './Type.entity';
import { Pokemon } from './Pokemon.entity';

@Entity({ tableName: 'pokemon_types' })
export class PokemonType {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @ManyToOne()
  pokemon!: Pokemon;

  @ManyToOne()
  type!: Type;

  @Enum(() => PokemonTypeCategory)
  category!: PokemonTypeCategory;
}
