import { UbicacionDto } from './ubicacion.dto';
export class DispositivoDto {
    readonly dispositivoId: number;
    readonly ubicaciones: UbicacionDto[];
    readonly nombre: string;
    readonly descripcion: string;
    readonly marca: string;
    readonly modelo: string;
    readonly sub: string;
    readonly pub: string;
    readonly ip: string;
    readonly mac: string;
    readonly valido: string;
}
