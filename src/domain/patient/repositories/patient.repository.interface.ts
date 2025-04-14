import { PatientEntity } from '../entities/patient.entity';

export interface IPatientRepository {
    findAll(): Promise<PatientEntity[]>;
    findById(id: string): Promise<PatientEntity | null>;
    create(patient: Partial<PatientEntity>): Promise<PatientEntity>;
    update(id: string, patient: Partial<PatientEntity>): Promise<PatientEntity>;
    delete(id: string): Promise<void>;
}

export const PATIENT_REPOSITORY = 'PatientRepository';
