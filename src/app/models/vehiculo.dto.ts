import { DispositivoDto } from './dispositivo.dto';
import { MacrorutaDto } from './macroruta.dto';
import { ConductorDto } from './conductor.dto';
import { AyudanteDto } from './ayudante.dto';
import { VisitanteVehiculoDto } from './visitante_vehiculo.dto';
import { DeshechoDto } from './deshecho.dto';
export class VehiculoDto {
    vehiculoId: number;
    dispositivo: DispositivoDto;
    macroruta: MacrorutaDto;
    conductor: ConductorDto;
    ayudantes: AyudanteDto;
    placa: string;
    capacidad: number;
    unidad: string;
    marca: string;
    modelo: string;
    valido: string;
    visitantesVehiculos: VisitanteVehiculoDto[];
    deshechos: DeshechoDto[];
}
