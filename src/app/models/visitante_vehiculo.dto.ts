import { VisitanteDto } from './visitante.dto';
import { VehiculoDto } from './vehiculo.dto';
export class VisitanteVehiculoDto {
    readonly visitanteVehiculoId: number;
    readonly visitante: VisitanteDto;
    readonly vehiculo: VehiculoDto;
}
