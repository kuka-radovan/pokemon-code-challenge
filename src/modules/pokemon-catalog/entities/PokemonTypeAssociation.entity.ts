import { Entity, Enum, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { PokemonTypeAssociationCategory } from '@common/enums/PokemonTypeAssociationCategory';
import { PokemonType } from './PokemonType.entity';
import { Pokemon } from './Pokemon.entity';

// TODO: use Polymorphic embeddables
@Entity({ tableName: 'pokemon_type_associations' })
export class PokemonTypeAssociation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @ManyToOne()
  pokemon!: Pokemon;

  @ManyToOne()
  type!: PokemonType;

  @Enum(() => PokemonTypeAssociationCategory)
  category!: PokemonTypeAssociationCategory;
}
