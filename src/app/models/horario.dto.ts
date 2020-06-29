import { MicrorutaDto } from './microruta.dto';
export class HorarioDto {
    readonly horarioId: number;
    readonly microruta: MicrorutaDto;
    readonly dia: Date;
    readonly hora: Date;
    readonly valido: string;
}
