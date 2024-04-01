// import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
// import { AttackCategory } from '@common/enums/AttackCategory';
// import { PokemonType } from './PokemonType.entity';
//
// @Entity({ tableName: 'attacks' })
// export class Attack {
//   @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
//   id: string;
//
//   @Enum(() => AttackCategory)
//   category!: string;
//
//   @ManyToOne()
//   type!: PokemonType;
//
//   @Property()
//   name!: string;
//
//   @Property()
//   damage!: number;
// }
