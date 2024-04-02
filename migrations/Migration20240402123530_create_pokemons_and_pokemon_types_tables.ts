import { Migration } from '@mikro-orm/migrations';

export class Migration20240402123530_create_pokemons_and_pokemon_types_tables extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "pokemons" ("id" varchar(255) not null, "name" varchar(255) not null, "classification" varchar(255) not null, "weight" jsonb not null, "height" jsonb not null, "flee_rate" float not null, "max_cp" int not null, "max_hp" int not null, constraint "pokemons_pkey" primary key ("id"));');

    this.addSql('create table "types" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, constraint "types_pkey" primary key ("id"));');

    this.addSql('create table "pokemon_types" ("id" uuid not null default gen_random_uuid(), "pokemon_id" varchar(255) not null, "type_id" uuid not null, "category" text check ("category" in (\'TYPE\', \'WEAKNESS\', \'RESISTANT\')) not null, constraint "pokemon_types_pkey" primary key ("id"));');

    this.addSql('alter table "pokemon_types" add constraint "pokemon_types_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemons" ("id") on update cascade;');
    this.addSql('alter table "pokemon_types" add constraint "pokemon_types_type_id_foreign" foreign key ("type_id") references "types" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "pokemon_types" drop constraint "pokemon_types_pokemon_id_foreign";');

    this.addSql('alter table "pokemon_types" drop constraint "pokemon_types_type_id_foreign";');

    this.addSql('drop table if exists "pokemons" cascade;');

    this.addSql('drop table if exists "types" cascade;');

    this.addSql('drop table if exists "pokemon_types" cascade;');
  }

}