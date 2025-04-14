export class DiagnosticEntity {
    id: string;
    content: string;
    createdAt: Date;
    patient_id: string;

    constructor(partial: Partial<DiagnosticEntity>) {
        Object.assign(this, partial);
    }
}
