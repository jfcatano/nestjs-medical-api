import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePatientDto {
    @ApiProperty({
        example: 'Juan',
        description: 'Nombre del paciente',
    })
    @IsNotEmpty({ message: 'El name es requerido' })
    @IsString({ message: 'El name debe ser una cadena de texto' })
    name: string;

    @ApiProperty({
        example: 'Cataño',
        description: 'Apellido del paciente',
    })
    @IsNotEmpty({ message: 'El last_name es requerido' })
    @IsString({ message: 'El last_name debe ser una cadena de texto' })
    last_name: string;

    @ApiProperty({
        example: '2004-01-01',
        description: 'Fecha de nacimiento del paciente',
    })
    @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
    @Type(() => Date)
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    birthdate: Date;

    @ApiProperty({
        example: ['Alergia a penicilina', 'Hipertensión'],
        description: 'Historial médico del paciente',
        isArray: true,
    })
    @IsOptional()
    @IsArray({ message: 'El historial médico debe ser un array' })
    @IsString({ each: true, message: 'Cada elemento del historial debe ser una cadena de texto' })
    medical_history: string[];
}

export class UpdatePatientDto {
    @ApiProperty({
        example: 'Juan',
        description: 'Nombre del paciente',
    })
    @IsOptional()
    @IsString({ message: 'El name debe ser una cadena de texto' })
    name?: string;

    @ApiProperty({
        example: 'Pérez',
        description: 'Apellido del paciente',
    })
    @IsOptional()
    @IsString({ message: 'El last_name debe ser una cadena de texto' })
    last_name?: string;

    @ApiProperty({
        example: '2004-01-01',
        description: 'Fecha de nacimiento del paciente',
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida' })
    birthdate?: Date;

    @ApiProperty({
        example: ['Alergia a penicilina', 'Hipertensión'],
        description: 'Historial médico del paciente',
        isArray: true,
    })
    @IsOptional()
    @IsArray({ message: 'El historial médico debe ser un array' })
    @IsString({ each: true, message: 'Cada elemento del historial debe ser una cadena de texto' })
    medical_history?: string[];
}

export class PatientResponseDto {
    @ApiProperty({
        example: '123e4567-e89b-12d3-a456-426614174000',
        description: 'ID del paciente',
    })
    @IsUUID()
    id: string;

    @ApiProperty({
        example: 'Juan',
        description: 'Nombre del paciente',
    })
    name: string;

    @ApiProperty({
        example: 'Cataño',
        description: 'Apellido del paciente',
    })
    last_name: string;

    @ApiProperty({
        example: '2004-01-01T00:00:00.000Z',
        description: 'Fecha de nacimiento del paciente',
    })
    birthdate: Date;

    @ApiProperty({
        example: ['Alergia a penicilina', 'Hipertensión'],
        description: 'Historial médico del paciente',
        isArray: true,
    })
    medical_history: string[];

    @ApiProperty({
        example: '2025-04-13T00:00:00.000Z',
        description: 'Fecha de creación del registro',
    })
    createdAt: Date;

    @ApiProperty({
        example: '2025-04-13T00:00:00.000Z',
        description: 'Fecha de última actualización del registro',
    })
    updatedAt: Date;
}
