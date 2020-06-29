import { PersonaDto } from './persona.dto';
import { VehiculoDto } from './vehiculo.dto';
export class AyudanteDto {
    readonly ayudanteId: number;
    readonly descripcion: string;
    readonly valido: string;
    readonly persona: PersonaDto;
    readonly vehiculo: VehiculoDto;
}
