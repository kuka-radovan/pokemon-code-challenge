import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class PokemonMeasurements {
  @Property()
  minimum!: string;

  @Property()
  maximum!: string;
}
