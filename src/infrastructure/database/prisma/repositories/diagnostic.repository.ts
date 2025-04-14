import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IDiagnosticRepository } from 'src/domain/diagnostic/repositories/diagnostic.repository';
import { DiagnosticEntity } from 'src/domain/diagnostic/entities/diagnostic.entity';

@Injectable()
export class PrismaDiagnosticRepository implements IDiagnosticRepository {
    constructor(private prisma: PrismaService) {}

    async findByPatientId(patient_id: string): Promise<DiagnosticEntity[]> {
        const diagnostics = await this.prisma.diagnostic.findMany({
            where: { patient_id },
            orderBy: { createdAt: 'desc' },
        });

        return diagnostics.map((diagnostic) => new DiagnosticEntity(diagnostic));
    }

    async create(data: Partial<DiagnosticEntity>): Promise<DiagnosticEntity> {
        if (!data.patient_id) {
            throw new Error('El patient_id es obligatorio');
        }

        if (!data.content) {
            throw new Error('El content es obligatorio');
        }

        const diagnostic = await this.prisma.diagnostic.create({
            data: {
                content: data.content,
                patient_id: data.patient_id,
            },
        });

        return new DiagnosticEntity(diagnostic);
    }
}
