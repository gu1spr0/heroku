import { MacrorutaDto } from './macroruta.dto';
import { HorarioDto } from './horario.dto';
export class MicrorutaDto {
    readonly microrutaId: number;
    readonly macroruta: MacrorutaDto;
    readonly codigo: string;
    readonly ruta: any;
    readonly area: any;
    readonly manzana: number;
    readonly descripcion: string;
    readonly valido: string;
    readonly horario: HorarioDto;
}
