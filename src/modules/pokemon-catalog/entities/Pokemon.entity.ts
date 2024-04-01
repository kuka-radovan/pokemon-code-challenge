import {
  Entity,
  // ManyToMany,
  PrimaryKey,
  Property,
  Collection,
  OneToMany,
  Embedded,
} from '@mikro-orm/core';
// import { Attack } from './Attack.entity';
// import { Evolution } from './Evolution.entity';
import { PokemonTypeAssociationCategory } from '@common/enums/PokemonTypeAssociationCategory';
import { PokemonTypeAssociation } from './PokemonTypeAssociation.entity';
import { PokemonMeasurements } from './PokemonMeasurements.entity';

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

  @Embedded({ object: true })
  weight!: PokemonMeasurements;

  @Embedded({ object: true })
  height!: PokemonMeasurements;

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
