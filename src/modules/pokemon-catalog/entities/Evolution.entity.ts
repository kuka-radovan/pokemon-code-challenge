import {
  Embedded,
  Entity,
  ManyToOne,
  PrimaryKey,
  OneToOne,
} from '@mikro-orm/core';
import { Pokemon } from './Pokemon.entity';
import { EvolutionRequirements } from './EvolutionRequirements.entity';

@Entity({ tableName: 'evolutions' })
export class Evolution {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string;

  @OneToOne(() => Pokemon)
  pokemon: Pokemon;

  @ManyToOne({ nullable: true })
  previousEvolution?: Evolution;

  @ManyToOne({ nullable: true })
  nextEvolution?: Evolution;

  @Embedded({ object: true })
  evolutionRequirements?: EvolutionRequirements;
}
