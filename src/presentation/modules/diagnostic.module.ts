import { Module } from '@nestjs/common';
import { DiagnosticController } from '../controllers/diagnostic.controller';
import { DiagnosticService } from 'src/aplication/diagnostic/dianostic.service';
import { DIAGNOSTIC_REPOSITORY } from 'src/domain/diagnostic/repositories/diagnostic.repository';
import { PrismaDiagnosticRepository } from 'src/infrastructure/database/prisma/repositories/diagnostic.repository';
import { PatientModule } from './patient.module';
import { OpenAIModule } from '../../infrastructure/ai/openai/openai.module';

@Module({
    imports: [PatientModule, OpenAIModule],
    controllers: [DiagnosticController],
    providers: [
        DiagnosticService,
        {
            provide: DIAGNOSTIC_REPOSITORY,
            useClass: PrismaDiagnosticRepository,
        },
    ],
    exports: [DiagnosticService],
})
export class DiagnosticModule {}
