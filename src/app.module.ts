import { Module } from '@nestjs/common';
import { ConfigModule /*, ConfigService */ } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
// import { PostgreSqlDriver } from '@mikro-orm/postgresql';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import config, { envVariablesValidationSchema } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validationSchema: envVariablesValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
      cache: true,
    }),
    MikroOrmModule.forRoot({}),
    // MikroOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     driver: PostgreSqlDriver,
    //     host: configService.get('database.host'),
    //     port: configService.get('database.port'),
    //     dbName: configService.get('database.dbName'),
    //     user: configService.get('database.user'),
    //     password: configService.get('database.password'),
    //     entities: ['dist/**/*.entity.js'],
    //     entitiesTs: ['src/**/*.entity.ts'],
    //     metadataProvider: TsMorphMetadataProvider,
    //     autoLoadEntities: true,
    //     migrations: {
    //       path: `${__dirname}/../migrations`,
    //       // pattern: /^[\w-]+\d+\.[tj]s$/,
    //     },
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
