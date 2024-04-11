import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class EvolutionRequirements {
  @Property()
  amount!: number;

  @Property()
  name!: string;
}
