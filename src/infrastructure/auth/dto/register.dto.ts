import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        example: 'user@ejemplo.com',
        description: 'Email del user',
    })
    @IsEmail({}, { message: 'Email inválido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    email: string;

    @ApiProperty({
        example: 'password123',
        description: 'Contraseña del usuario',
    })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @ApiProperty({
        example: 'PATIENT',
        description: 'Rol del usuario',
        enum: ['PATIENT', 'DOCTOR', 'ADMIN'],
        default: 'PATIENT',
    })
    @IsEnum(['PATIENT', 'DOCTOR', 'ADMIN'], {
        message: 'El role debe ser PATIENT, DOCTOR o ADMIN',
    })
    role: string;
}
