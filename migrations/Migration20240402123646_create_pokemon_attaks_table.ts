import { Migration } from '@mikro-orm/migrations';

export class Migration20240402123646_create_pokemon_attaks_table extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "attacks" ("id" uuid not null default gen_random_uuid(), "category" text check ("category" in (\'FAST\', \'SPECIAL\')) not null, "type_id" uuid not null, "name" varchar(255) not null, "damage" int not null, constraint "attacks_pkey" primary key ("id"));');

    this.addSql('create table "pokemon_attacks" ("pokemon_id" varchar(255) not null, "attack_id" uuid not null, constraint "pokemon_attacks_pkey" primary key ("pokemon_id", "attack_id"));');

    this.addSql('alter table "attacks" add constraint "attacks_type_id_foreign" foreign key ("type_id") references "types" ("id") on update cascade;');

    this.addSql('alter table "pokemon_attacks" add constraint "pokemon_attacks_pokemon_id_foreign" foreign key ("pokemon_id") references "pokemons" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "pokemon_attacks" add constraint "pokemon_attacks_attack_id_foreign" foreign key ("attack_id") references "attacks" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "pokemon_attacks" drop constraint "pokemon_attacks_attack_id_foreign";');

    this.addSql('drop table if exists "attacks" cascade;');

    this.addSql('drop table if exists "pokemon_attacks" cascade;');
  }

}
