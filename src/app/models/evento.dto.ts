import { ConductorDto } from './conductor.dto';
export class EventoDto {
    readonly eventoId: number;
    readonly evento: string;
    readonly fecha: Date;
    readonly hora: Date;
    readonly valido: string;
    readonly conductor: ConductorDto;
}
