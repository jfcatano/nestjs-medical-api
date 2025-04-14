import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IDiagnosticRepository, DIAGNOSTIC_REPOSITORY } from 'src/domain/diagnostic/repositories/diagnostic.repository';
import { OpenAIService } from '../../infrastructure/ai/openai/openai.service';
import { PATIENT_REPOSITORY, IPatientRepository } from 'src/domain/patient/repositories/patient.repository.interface';
import { DiagnosticEntity } from 'src/domain/diagnostic/entities/diagnostic.entity';

@Injectable()
export class DiagnosticService {
    constructor(
        @Inject(DIAGNOSTIC_REPOSITORY)
        private diagnosticRepository: IDiagnosticRepository,
        @Inject(PATIENT_REPOSITORY)
        private patientRepository: IPatientRepository,
        private openaiService: OpenAIService,
    ) {}

    async findByPatientId(patient_id: string): Promise<DiagnosticEntity[]> {
        const patient = await this.patientRepository.findById(patient_id);

        if (!patient) {
            throw new NotFoundException(`Paciente con ID ${patient_id} no encontrado`);
        }

        return this.diagnosticRepository.findByPatientId(patient_id);
    }

    async generateDiagnostic(patient_id: string): Promise<DiagnosticEntity> {
        const patient = await this.patientRepository.findById(patient_id);

        if (!patient) {
            throw new NotFoundException(`Paciente con ID ${patient_id} no encontrado`);
        }

        if (!patient.medical_history || patient.medical_history.length === 0) {
            throw new NotFoundException(`El paciente con ID ${patient_id} no tiene historial médico`);
        }

        const content = await this.openaiService.generateDiagnostic(patient_id, patient.medical_history);

        return this.diagnosticRepository.create({
            content,
            patient_id,
        });
    }
}
