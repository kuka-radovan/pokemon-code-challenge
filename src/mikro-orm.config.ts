import 'dotenv/config';
import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  driver: PostgreSqlDriver,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, SeedManager],
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: `${__dirname}/../migrations`,
  },
  seeder: {
    path: `${__dirname}/../seeds`,
    defaultSeeder: 'PokemonSeeder',
  },
});
