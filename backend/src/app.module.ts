import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { ProjectItemsModule } from './project_items/project_items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        // Gunakan DATABASE_URL jika ada (untuk Railway)
        const databaseUrl = config.get<string>('DATABASE_URL');
        
        if (databaseUrl) {
          // Konfigurasi untuk Railway
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: true, // false di production
            ssl: {
              rejectUnauthorized: false // Diperlukan untuk Railway
            },
            extra: {
              ssl: {
                rejectUnauthorized: false
              }
            }
          };
        }

        // Konfigurasi untuk development lokal
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT', '5432')),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASS'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: config.get<string>('NODE_ENV') !== 'production',
        };
      },
      inject: [ConfigService],
    }),

    ProjectsModule,
    ProjectItemsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}