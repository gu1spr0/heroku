import { VehiculoDto } from './vehiculo.dto';
export class DeshechoDto {
    readonly deshechoId: number;
    readonly vehiculo: VehiculoDto;
    readonly descripcion: string;
    readonly cantidad: number;
    readonly fecha: Date;
    readonly hora: Date;
    readonly valido: string;
}
