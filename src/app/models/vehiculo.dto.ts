import { DispositivoDto } from './dispositivo.dto';
import { MacrorutaDto } from './macroruta.dto';
import { ConductorDto } from './conductor.dto';
import { AyudanteDto } from './ayudante.dto';
import { VisitanteVehiculoDto } from './visitante_vehiculo.dto';
import { DeshechoDto } from './deshecho.dto';
export class VehiculoDto {
    readonly vehiculoId: number;
    readonly dispositivo: DispositivoDto;
    readonly macroruta: MacrorutaDto;
    readonly conductor: ConductorDto;
    readonly ayudantes: AyudanteDto;
    readonly placa: string;
    readonly capacidad: number;
    readonly unidad: string;
    readonly marca: string;
    readonly modelo: string;
    readonly valido: string;
    readonly visitantesVehiculos: VisitanteVehiculoDto[];
    readonly deshechos: DeshechoDto[];
}
