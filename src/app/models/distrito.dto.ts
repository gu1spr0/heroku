import { DistritoMacroDto } from './distrito_macro.dto';
export class DistritoDto {
    readonly distritoId: number;
    readonly numero: number;
    readonly descripcion: string;
    readonly valido: string;
    readonly distritoMacros: DistritoMacroDto[];
}
