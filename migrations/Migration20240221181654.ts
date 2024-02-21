import { Migration } from '@mikro-orm/migrations';

export class Migration20240221181654 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "pokemons" ("id" varchar(255) not null, "name" varchar(255) not null, "classification" varchar(255) not null, "weight" jsonb not null, "height" jsonb not null, "flee_rate" float not null, "max_cp" int not null, "max_hp" int not null, constraint "pokemons_pkey" primary key ("id"));');

    this.addSql('create table "evolutions" ("id" uuid not null default gen_random_uuid(), "pokemon_id" varchar(255) not null, "previous_evolution_id" uuid null, "next_evolution_id" uuid null, "requirement" varchar(255) not null, "amount" int not null, constraint "evolutions_pkey" primary key ("id"));');

    this.addSql('create table "pokemon_types" ("id" uuid not null default gen_random_uuid(), "name" varchar(255) not null, constraint "pokemon_types_pkey" primary key ("id"));');

    this.addSql('create table "attacks" ("id" uuid not null default gen_random_uuid(), "category" text check ("category" in (\'FAST\', \'SPECIAL\')) not null, "type_id" uuid not null, "name" varchar(255) not null, "damage" int not null, constraint "attacks_pkey" primary key ("id"));');

    this.addSql('create table "pokemon_attacks" ("pokemon_id" varchar(255) not null, "attack_id" uuid not null, constraint "pokemon_attacks_pkey" primary key ("pokemon_id", "attack_id"));');

    this.addSql('create table "pokemon_type_associations" ("id" uuid not null default gen_random_uuid(), "pokemon_id" varchar(255) not null, "type_id" uuid not null, "category" text check ("category" in (\'TYPE\', \'WEAKNESS\', \'RESISTANT\')) not null, constraint "pokemon_type_associations_pkey" primary key ("id"));');

    this.addSql('alter table "evolutions" add constraint "evolutions_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemons" ("id") on update cascade;');
    this.addSql('alter table "evolutions" add constraint "evolutions_previous_evolution_id_foreign" foreign key ("previous_evolution_id") references "evolutions" ("id") on update cascade on delete set null;');
    this.addSql('alter table "evolutions" add constraint "evolutions_next_evolution_id_foreign" foreign key ("next_evolution_id") references "evolutions" ("id") on update cascade on delete set null;');

    this.addSql('alter table "attacks" add constraint "attacks_type_id_foreign" foreign key ("type_id") references "pokemon_types" ("id") on update cascade;');

    this.addSql('alter table "pokemon_attacks" add constraint "pokemon_attacks_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemons" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "pokemon_attacks" add constraint "pokemon_attacks_attack_id_foreign" foreign key ("attack_id") references "attacks" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "pokemon_type_associations" add constraint "pokemon_type_associations_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemons" ("id") on update cascade;');
    this.addSql('alter table "pokemon_type_associations" add constraint "pokemon_type_associations_type_id_foreign" foreign key ("type_id") references "pokemon_types" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "evolutions" drop constraint "evolutions_pokemon_id_foreign";');

    this.addSql('alter table "pokemon_attacks" drop constraint "pokemon_attacks_pokemon_id_foreign";');

    this.addSql('alter table "pokemon_type_associations" drop constraint "pokemon_type_associations_pokemon_id_foreign";');

    this.addSql('alter table "evolutions" drop constraint "evolutions_previous_evolution_id_foreign";');

    this.addSql('alter table "evolutions" drop constraint "evolutions_next_evolution_id_foreign";');

    this.addSql('alter table "attacks" drop constraint "attacks_type_id_foreign";');

    this.addSql('alter table "pokemon_type_associations" drop constraint "pokemon_type_associations_type_id_foreign";');

    this.addSql('alter table "pokemon_attacks" drop constraint "pokemon_attacks_attack_id_foreign";');

    this.addSql('drop table if exists "pokemons" cascade;');

    this.addSql('drop table if exists "evolutions" cascade;');

    this.addSql('drop table if exists "pokemon_types" cascade;');

    this.addSql('drop table if exists "attacks" cascade;');

    this.addSql('drop table if exists "pokemon_attacks" cascade;');

    this.addSql('drop table if exists "pokemon_type_associations" cascade;');
  }

}
