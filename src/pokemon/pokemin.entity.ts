import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Pokemon {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  classification!: string;

  @Property({ columnType: 'float' })
  fleeRate!: number;
}
