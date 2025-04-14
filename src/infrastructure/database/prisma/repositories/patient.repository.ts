import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IPatientRepository } from 'src/domain/patient/repositories/patient.repository.interface';
import { PatientEntity } from 'src/domain/patient/entities/patient.entity';

@Injectable()
export class PrismaPatientRepository implements IPatientRepository {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<PatientEntity[]> {
        const patients = await this.prisma.patient.findMany();
        return patients.map((patient) => new PatientEntity(patient));
    }

    async findById(id: string): Promise<PatientEntity | null> {
        const patient = await this.prisma.patient.findUnique({
            where: { id },
        });

        if (!patient) {
            return null;
        }

        return new PatientEntity(patient);
    }

    async create(data: Partial<PatientEntity>): Promise<PatientEntity> {
        if (!data) {
            throw new Error('Los datos del patient son obligatorios');
        }

        const patient = await this.prisma.patient.create({
            data: {
                name: data.name || '',
                last_name: data.last_name || '',
                birthdate: data.birthdate || new Date(),
                medical_history: data.medical_history || [],
            },
        });

        return new PatientEntity(patient);
    }

    async update(id: string, data: Partial<PatientEntity>): Promise<PatientEntity> {
        const patient = await this.prisma.patient.update({
            where: { id },
            data,
        });

        return new PatientEntity(patient);
    }

    async delete(id: string): Promise<void> {
        await this.prisma.patient.delete({
            where: { id },
        });
    }
}
