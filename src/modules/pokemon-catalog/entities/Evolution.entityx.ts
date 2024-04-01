// import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
// import { Pokemon } from './Pokemon.entity';
//
// @Entity({ tableName: 'evolutions' })
// export class Evolution {
//   @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
//   id: string;
//
//   @ManyToOne()
//   pokemon: Pokemon;
//
//   @ManyToOne({ nullable: true })
//   previousEvolution?: Evolution;
//
//   @ManyToOne({ nullable: true })
//   nextEvolution?: Evolution;
//
//   @Property()
//   requirement!: string;
//
//   @Property()
//   amount!: number;
// }
