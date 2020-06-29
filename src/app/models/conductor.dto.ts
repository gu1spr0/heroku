import { PersonaDto } from './persona.dto';
import { EventoDto } from './evento.dto';
export class ConductorDto {
    readonly conductorId: number;
    readonly persona: PersonaDto;
    readonly categoria: string;
    readonly eventos: EventoDto[];
}
