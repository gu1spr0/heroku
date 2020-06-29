import { VisitanteVehiculoDto } from './visitante_vehiculo.dto';
export class VisitanteDto {
    readonly visitanteId: number;
    readonly latitud: any;
    readonly longitud: any;
    readonly fecha: Date;
    readonly hora: Date;
    readonly visitantesVehiculos: VisitanteVehiculoDto[];
}
