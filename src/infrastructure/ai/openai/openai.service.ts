import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
    private readonly openai: OpenAI;
    private readonly logger = new Logger(OpenAIService.name);
    private readonly useMock: boolean;

    constructor(
        private configService: ConfigService,
        private prismaService: PrismaService,
    ) {
        const apiKey = this.configService.get<string>('openai.apiKey');
        this.useMock = apiKey === 'fake-key';

        if (!apiKey) {
            throw new Error('API key for OpenAI is not set in the environment variables.');
        }

        this.useMock = apiKey === 'fake-key';

        if (!this.useMock) {
            this.openai = new OpenAI({
                apiKey,
            });
        }
    }

    async generateDiagnostic(patient_id: string, medical_history: string[]): Promise<string> {
        try {
            const historialString = medical_history.join('. ');
            let diagnostic: string;

            if (this.useMock) {
                diagnostic = this.mockDiagnostic(medical_history);
            } else {
                const response = await this.openai.chat.completions.create({
                    model: 'gpt-4o',
                    messages: [
                        {
                            role: 'system',
                            content:
                                'Eres un asistente médico. Basado en el historial médico proporcionado, genera un diagnóstico sugerido. No eres un médico real y tus sugerencias no reemplazan la user_prompt con un profesional de la salud.',
                        },
                        {
                            role: 'user',
                            content: `Historial médico del patient: ${historialString}. Por favor genera un diagnóstico sugerido basado en esta información.`,
                        },
                    ],
                    max_tokens: 500,
                });

                const content = response.choices[0].message.content;
                if (content === null) {
                    throw new Error('La response del modelo fue nula');
                }

                diagnostic = content;
            }

            // Register the user prompt and response in the database
            await this.prismaService.logAI.create({
                data: {
                    patient_id,
                    user_prompt: historialString,
                    response: diagnostic,
                    used_model: this.useMock ? 'MOCK' : 'GPT-3.5-TURBO',
                },
            });

            return diagnostic;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(`Error al generar diagnóstico: ${error.message}`, error.stack);
            } else {
                this.logger.error('Error inesperado al generar diagnóstico', error);
            }
            throw new Error('No se pudo generar el diagnóstico');
        }
    }

    private mockDiagnostic(medical_history: string[]): string {
        const historialString = medical_history.join(' ').toLowerCase();

        if (historialString.includes('dolor') && historialString.includes('cabeza')) {
            return 'Diagnóstico sugerido: Posible migraña o cefalea tensional. Se recomienda evaluación médica para descartar causas secundarias de dolor de cabeza.';
        }

        if (historialString.includes('fiebre') || historialString.includes('tos')) {
            return 'Diagnóstico sugerido: Posible infección respiratoria aguda. Se recomienda reposo, hidratación adecuada y seguimiento médico.';
        }

        if (
            historialString.includes('dolor') &&
            (historialString.includes('estómago') || historialString.includes('abdominal'))
        ) {
            return 'Diagnóstico sugerido: Posible gastroenteritis o síndrome de intestino irritable. Se recomienda evaluación médica para un diagnóstico preciso.';
        }

        if (historialString.includes('presión') || historialString.includes('hipertensión')) {
            return 'Diagnóstico sugerido: Posible hipertensión arterial. Se recomienda monitoreo regular de la presión arterial y evaluación cardiovascular.';
        }

        if (historialString.includes('azúcar') || historialString.includes('diabetes')) {
            return 'Diagnóstico sugerido: Posible diabetes mellitus o prediabetes. Se recomienda evaluación endocrinológica y control de glucemia.';
        }

        return 'Diagnóstico sugerido: No se identifican patrones claros en el historial médico. Se recomienda una evaluación médica completa para un diagnóstico preciso.';
    }
}
