import { PersonaDto } from './persona.dto';
import { EventoDto } from './evento.dto';
export class ConductorDto {
    conductorId: number;
    persona: PersonaDto;
    categoria: string;
    eventos: EventoDto[];
}
