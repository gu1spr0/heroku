import { MicrorutaDto } from './microruta.dto';
import { DistritoMacroDto } from './distrito_macro.dto';
export class MacrorutaDto {
    readonly macrorutaId: number;
    readonly codigo: string;
    readonly ruta: any;
    readonly area: any;
    readonly descripcion: string;
    readonly valido: string;
    readonly microrutas: MicrorutaDto[];
    readonly distritoMacros: DistritoMacroDto[];
}
