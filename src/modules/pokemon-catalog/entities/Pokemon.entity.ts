import {
  Entity,
  // ManyToMany,
  PrimaryKey,
  Property,
  Collection,
  OneToMany,
} from '@mikro-orm/core';
// import { Attack } from './Attack.entity';
// import { Evolution } from './Evolution.entity';
import { PokemonTypeAssociationCategory } from '@common/enums/PokemonTypeAssociationCategory';
import { PokemonTypeAssociation } from './PokemonTypeAssociation.entity';

@Entity({ tableName: 'pokemons' })
export class Pokemon {
  @PrimaryKey()
  id!: string;

  @Property()
  name!: string;

  @Property()
  classification!: string;

  @OneToMany(
    () => PokemonTypeAssociation,
    (association) => association.pokemon,
    { where: { category: PokemonTypeAssociationCategory.TYPE } },
  )
  type = new Collection<PokemonTypeAssociation>(this);

  @OneToMany(
    () => PokemonTypeAssociation,
    (association) => association.pokemon,
    { where: { category: PokemonTypeAssociationCategory.RESISTANT } },
  )
  resistant = new Collection<PokemonTypeAssociation>(this);

  @OneToMany(
    () => PokemonTypeAssociation,
    (association) => association.pokemon,
    { where: { category: PokemonTypeAssociationCategory.WEAKNESS } },
  )
  weaknesses = new Collection<PokemonTypeAssociation>(this);

  // TODO: use @Embedded here
  @Property({ type: 'jsonb' })
  weight!: { minimum: string; maximum: string };

  // TODO: use @Embedded here
  @Property({ type: 'jsonb' })
  height!: { minimum: string; maximum: string };

  @Property({ columnType: 'float' })
  fleeRate!: number;

  // @OneToMany(() => Evolution, (evolution) => evolution.pokemon)
  // evolutions = new Collection<Evolution>(this);

  @Property()
  maxCP: number;

  @Property()
  maxHP: number;

  // @ManyToMany({ pivotTable: 'pokemon_attacks' })
  // attacks = new Collection<Attack>(this);
}
