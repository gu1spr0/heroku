import { DispositivoDto } from './dispositivo.dto';
export class UbicacionDto {
    readonly ubicacionId: number;
    readonly fecha: Date;
    readonly hora: Date;
    readonly line: any;
    readonly dispositivo: DispositivoDto;
}
