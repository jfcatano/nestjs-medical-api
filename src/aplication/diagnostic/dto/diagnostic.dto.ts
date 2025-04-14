import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDiagnosticDto {
    @ApiProperty({
        example: 'Diagnóstico generado por IA basado en el historial médico del paciente.',
        description: 'Contenido del diagnóstico',
    })
    @IsNotEmpty({ message: 'El content es requerido' })
    content: string;

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID del paciente',
    })
    @IsUUID(4, { message: 'El ID del paciente debe ser un UUID válido' })
    @IsNotEmpty({ message: 'El ID del paciente es requerido' })
    patient_id: string;
}

export class DiagnosticResponseDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID del diagnóstico',
    })
    id: string;

    @ApiProperty({
        example: 'Diagnóstico generado por IA basado en el historial médico del paciente.',
        description: 'Contenido del diagnóstico',
    })
    content: string;

    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID del paciente',
    })
    patient_id: string;

    @ApiProperty({
        example: '2025-04-13T00:00:00.000Z',
        description: 'Fecha de creación del registro',
    })
    createdAt: Date;
}
