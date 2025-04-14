export class PatientEntity {
    id: string;
    name: string;
    last_name: string;
    birthdate: Date;
    medical_history: string[];
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<PatientEntity>) {
        Object.assign(this, partial);
    }
}
