import { Migration } from '@mikro-orm/migrations';

export class Migration20240411165320_create_pokemon_evolutions_table extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "evolutions" ("id" uuid not null default gen_random_uuid(), "pokemon_id" varchar(255) not null, "previous_evolution_id" uuid null, "next_evolution_id" uuid null, "evolution_requirements" jsonb null, constraint "evolutions_pkey" primary key ("id"));');
    this.addSql('alter table "evolutions" add constraint "evolutions_pokemon_id_unique" unique ("pokemon_id");');

    this.addSql('alter table "evolutions" add constraint "evolutions_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemons" ("id") on update cascade;');
    this.addSql('alter table "evolutions" add constraint "evolutions_previous_evolution_id_foreign" foreign key ("previous_evolution_id") references "evolutions" ("id") on update cascade on delete set null;');
    this.addSql('alter table "evolutions" add constraint "evolutions_next_evolution_id_foreign" foreign key ("next_evolution_id") references "evolutions" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "evolutions" drop constraint "evolutions_previous_evolution_id_foreign";');

    this.addSql('alter table "evolutions" drop constraint "evolutions_next_evolution_id_foreign";');

    this.addSql('drop table if exists "evolutions" cascade;');
  }

}
