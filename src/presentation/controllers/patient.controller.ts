import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { PatientService } from 'src/aplication/patient/patient.service';
import { CreatePatientDto, UpdatePatientDto, PatientResponseDto } from 'src/aplication/patient/dto/patient.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('Pacientes')
@Controller('patients')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Post()
    @Roles('DOCTOR', 'ADMIN')
    @ApiOperation({ summary: 'Crear un nuevo paciente' })
    @ApiResponse({ status: 201, description: 'Paciente creado exitosamente', type: PatientResponseDto })
    async create(@Body() createPatientDto: CreatePatientDto) {
        return this.patientService.create(createPatientDto);
    }

    @Get()
    @Roles('DOCTOR', 'ADMIN', 'PATIENT')
    @ApiOperation({ summary: 'Obtener todos los pacientes' })
    @ApiResponse({ status: 200, description: 'Lista de pacientes', type: [PatientResponseDto] })
    async findAll() {
        return this.patientService.findAll();
    }

    @Get(':id')
    @Roles('DOCTOR', 'ADMIN', 'PATIENT')
    @ApiOperation({ summary: 'Obtener un paciente por ID' })
    @ApiResponse({ status: 200, description: 'Paciente encontrado', type: PatientResponseDto })
    @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
    async findOne(@Param('id') id: string) {
        return this.patientService.findById(id);
    }

    @Put(':id')
    @Roles('DOCTOR', 'ADMIN')
    @ApiOperation({ summary: 'Actualizar un paciente' })
    @ApiResponse({ status: 200, description: 'Paciente actualizado exitosamente', type: PatientResponseDto })
    @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
    async update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
        return this.patientService.update(id, updatePatientDto);
    }

    @Delete(':id')
    @Roles('ADMIN')
    @ApiOperation({ summary: 'Eliminar un paciente' })
    @ApiResponse({ status: 200, description: 'Paciente eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
    async remove(@Param('id') id: string) {
        await this.patientService.delete(id);
        return { message: 'Paciente eliminado correctamente' };
    }
}
