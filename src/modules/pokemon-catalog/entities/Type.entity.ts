import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'types' })
export class Type {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @Property()
  name!: string;
}
