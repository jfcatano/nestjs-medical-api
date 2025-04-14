import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { PatientModule } from './presentation/modules/patient.module';
import { DiagnosticModule } from './presentation/modules/diagnostic.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { OpenAIModule } from './infrastructure/ai/openai/openai.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        PrismaModule,
        PatientModule,
        DiagnosticModule,
        AuthModule,
        OpenAIModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
