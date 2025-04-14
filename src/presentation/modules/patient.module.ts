import { Module } from '@nestjs/common';
import { PatientController } from '../controllers/patient.controller';
import { PatientService } from 'src/aplication/patient/patient.service';
import { PATIENT_REPOSITORY } from 'src/domain/patient/repositories/patient.repository.interface';
import { PrismaPatientRepository } from 'src/infrastructure/database/prisma/repositories/patient.repository';

@Module({
    controllers: [PatientController],
    providers: [
        PatientService,
        {
            provide: PATIENT_REPOSITORY,
            useClass: PrismaPatientRepository,
        },
    ],
    exports: [PatientService, PATIENT_REPOSITORY],
})
export class PatientModule {}
