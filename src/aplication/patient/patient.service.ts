import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IPatientRepository, PATIENT_REPOSITORY } from 'src/domain/patient/repositories/patient.repository.interface';
import { CreatePatientDto, UpdatePatientDto } from './dto/patient.dto';
import { PatientEntity } from 'src/domain/patient/entities/patient.entity';

@Injectable()
export class PatientService {
    constructor(
        @Inject(PATIENT_REPOSITORY)
        private patientRepository: IPatientRepository,
    ) {}

    async findAll(): Promise<PatientEntity[]> {
        return this.patientRepository.findAll();
    }

    async findById(id: string): Promise<PatientEntity> {
        const patient = await this.patientRepository.findById(id);

        if (!patient) {
            throw new NotFoundException(`Paciente con ID ${id} no encontrado`);
        }

        return patient;
    }

    async create(createPatientDto: CreatePatientDto): Promise<PatientEntity> {
        return this.patientRepository.create(createPatientDto);
    }

    async update(id: string, updatePatientDto: UpdatePatientDto): Promise<PatientEntity> {
        await this.findById(id);
        return this.patientRepository.update(id, updatePatientDto);
    }

    async delete(id: string): Promise<void> {
        await this.findById(id);
        await this.patientRepository.delete(id);
    }
}
