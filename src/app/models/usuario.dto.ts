import { PersonaDto } from './persona.dto';
import { RolDto } from './rol.dto';
import { LoginDto } from './login.dto';
export class UsuarioDto {
    usuarioId: number;
    persona: PersonaDto;
    nombre: string;
    contraseña: string;
    valido: string;
    rol: RolDto;
    logins: LoginDto[];
}
