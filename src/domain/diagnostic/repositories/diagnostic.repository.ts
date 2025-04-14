import { DiagnosticEntity } from '../entities/diagnostic.entity';

export interface IDiagnosticRepository {
    findByPatientId(patient_id: string): Promise<DiagnosticEntity[]>;
    create(diagnostico: Partial<DiagnosticEntity>): Promise<DiagnosticEntity>;
}

export const DIAGNOSTIC_REPOSITORY = 'DiagnosticRepository';
