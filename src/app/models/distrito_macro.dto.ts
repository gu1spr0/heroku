import { DistritoDto } from './distrito.dto';
import { MacrorutaDto } from './macroruta.dto';
export class DistritoMacroDto {
    readonly distritoMacroId: number;
    readonly distrito: DistritoDto;
    readonly macroruta: MacrorutaDto;
}
