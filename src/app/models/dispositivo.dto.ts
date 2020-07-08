import { UbicacionDto } from './ubicacion.dto';
export class DispositivoDto {
    dispositivoId: number;
    ubicaciones: UbicacionDto[];
    nombre: string;
    descripcion: string;
    marca: string;
    modelo: string;
    sub: string;
    pub: string;
    ip: string;
    // mac: string;
    valido: string;
}
