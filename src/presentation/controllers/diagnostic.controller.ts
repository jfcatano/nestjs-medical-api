import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { DiagnosticService } from 'src/aplication/diagnostic/dianostic.service';
import { DiagnosticResponseDto } from 'src/aplication/diagnostic/dto/diagnostic.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/auth/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@ApiTags('Diagnósticos')
@Controller('patients/:patient_id/diagnostics')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DiagnosticController {
    constructor(private readonly diagnosticService: DiagnosticService) {}

    @Get()
    @Roles('DOCTOR', 'ADMIN', 'PATIENT')
    @ApiOperation({ summary: 'Obtener todos los diagnósticos de un paciente' })
    @ApiResponse({ status: 200, description: 'Lista de diagnósticos', type: [DiagnosticResponseDto] })
    @ApiResponse({ status: 404, description: 'Paciente no encontrado' })
    async findByPatientId(@Param('patient_id') patient_id: string) {
        return this.diagnosticService.findByPatientId(patient_id);
    }

    @Post('diagnostico-ai')
    @Roles('DOCTOR', 'ADMIN')
    @ApiOperation({ summary: 'Generar diagnóstico AI para un paciente' })
    @ApiResponse({ status: 201, description: 'Diagnóstico generado exitosamente', type: DiagnosticResponseDto })
    @ApiResponse({ status: 404, description: 'Paciente no encontrado o sin historial médico' })
    async generateDiagnostic(@Param('patient_id') patient_id: string) {
        return this.diagnosticService.generateDiagnostic(patient_id);
    }
}
