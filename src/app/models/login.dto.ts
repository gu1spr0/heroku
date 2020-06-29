import { UsuarioDto } from './usuario.dto';
export class LoginDto {
    readonly loginId: number;
    readonly fecha: Date;
    readonly hora: Date;
    readonly usuario: UsuarioDto;
}
