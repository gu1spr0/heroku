import { DepartamentoDto } from './departamento.dto';
export class PersonaDto {
    personaId: number;
    cedula: string;
    departamento: DepartamentoDto;
    nombre: string;
    paterno: string;
    materno: string;
    telefono: string;
    celular: string;
    direccion: string;
    email: string;
    valido: string;
}
