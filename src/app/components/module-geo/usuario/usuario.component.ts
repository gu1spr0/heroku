import { Component, OnInit } from '@angular/core';
import { PersonaDto } from '../../../models/persona.dto';
import { DepartamentoDto } from '../../../models/departamento.dto';
import { FilterUtils } from 'primeng/api';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioDto } from '../../../models/usuario.dto';
import { MessageService } from 'primeng/api';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DepartamentoService } from '../../../services/departamento.service';
import { SelectItem } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { RolDto } from '../../../models/rol.dto';
import { RolService } from '../../../services/rol.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  usuarios: UsuarioDto[];
  departamentos: DepartamentoDto[];
  roles: RolDto[];
  departamento: DepartamentoDto;
  persona: PersonaDto;
  usuario: UsuarioDto;

  // estados: SelectItem[];
  estadosDepartamentos: SelectItem[] = [];
  estaodsRoles: SelectItem[] = [];

  selectedElement = false;
  newUsuario = true;
  submitted: boolean;
  displayDialog = false;

  cols: any[];
  usuarioForm: FormGroup;
  constructor(
    private usuarioService: UsuarioService,
    private departamentoService: DepartamentoService,
    private rolService: RolService,
    private messageService: MessageService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.usuariosTodos();
    this.departamentosTodos();
    this.rolesTodos();
    // this.estados = [
    //   { label: 'ACTIVO', value: 'AC' },
    //   { label: 'ANULADO', value: 'AN' }
    // ];

    this.usuarioForm = this.fb.group({
      cedula: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      paterno: new FormControl('', Validators.required),
      materno: new FormControl(''),
      telefono: new FormControl(''),
      direccion: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      email: new FormControl(''),
      // valido: new FormControl('', Validators.required),
      departamentoId: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      contraseñac: new FormControl('', Validators.required),
      rolId: new FormControl('', Validators.required),
    });

    this.cols = [
      { field: 'nombre', header: 'USUARIO' },
      { field: 'persona', subfield: 'cedula', header: 'CEDULA' },
      { field: 'persona', subfield: 'nombre', header: 'NOMBRE' },
      { field: 'persona', subfield: 'paterno', header: 'CEDULA' },
      { field: 'persona', subfield: 'materno', header: 'NOMBRE' },
      { field: 'rol', subfield: 'nombre', header: 'ROL' },
      { field: 'persona', subfield: 'valido', header: 'VALIDO' },
    ];

    FilterUtils['custom'] = (value, filter): boolean => {
      if (filter === undefined || filter === null || filter.trim() === '') {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return parseInt(filter) > value;
    };
  }
  public usuariosTodos() {
    this.usuarioService.getUsuariosTodos().subscribe(
      res => {
        this.usuarios = res;
      },
      error => {
        const errorMessage = error;
      }
    );
  }
  public departamentosTodos() {
    this.departamentoService.getDepartamentoTodos().subscribe(
      res => {
        this.departamentos = res;
        this.departamentos.forEach((element, index) => {
          this.estadosDepartamentos.push({ label: element.departamento, value: element.departamentoId });
        });
      },
      error => {
        const errorMessage = error;
      }
    );
  }
  public rolesTodos() {
    this.rolService.getRolesTodos().subscribe(
      res => {
        this.roles = res;
        this.roles.forEach((element, index) => {
          this.estaodsRoles.push({ label: element.nombre, value: element.rolId });
        });
      },
      error => {
        const errorMessage = error;
      }
    );
  }
  public guardarUsuario(usuario: UsuarioDto) {
    this.usuarioService.guardarUsuario(usuario)
      .subscribe(
        result => {
          this.submitted = true;
          this.addSingle('success', 'Registro satisfactorio');
          this.clean();
          this.usuariosTodos();
        },
        err => {
          this.addSingle('error', err.error.mensaje);
        });
  }
  public modificarUsuario(usuario: UsuarioDto) {
    this.usuarioService.modificarUsuario(usuario.usuarioId, usuario)
      .subscribe(
        result => {
          this.addSingle('info', 'Modificacion satisfactoria');
          this.clean();
          this.usuariosTodos();
        },
        err => {
          console.log(err);
          this.addSingle('error', err.error.mensaje);
        }
      );
  }
  public eliminarUsuario(usuarioDto: UsuarioDto) {
    this.usuarioService.eliminarUsuario(usuarioDto.usuarioId)
      .subscribe(
        result => {
          this.addSingle('info', 'Eliminacion satisfactoria');
          this.clean();
          this.usuariosTodos();
          this.closeDialog();
        },
        err => {
          console.log(err);
          this.addSingle('error', err.error.mensaje);
        }
      );
  }
  onRowSelect(event) {
    this.newUsuario = false;
    this.selectedElement = true;
    this.usuario = event.data;
    this.usuarioForm.controls.cedula.setValue(this.usuario.persona.cedula);
    this.usuarioForm.controls.nombre.setValue(this.usuario.persona.nombre);
    this.usuarioForm.controls.paterno.setValue(this.usuario.persona.paterno);
    this.usuarioForm.controls.materno.setValue(this.usuario.persona.materno);
    this.usuarioForm.controls.telefono.setValue(this.usuario.persona.telefono);
    this.usuarioForm.controls.direccion.setValue(this.usuario.persona.direccion);
    this.usuarioForm.controls.celular.setValue(this.usuario.persona.celular);
    this.usuarioForm.controls.email.setValue(this.usuario.persona.email);
    this.usuarioForm.controls.departamentoId.setValue(this.usuario.persona.departamento.departamentoId);
    // this.usuarioForm.controls.valido.setValue(this.usuario.persona.valido);
    this.usuarioForm.controls.user.setValue(this.usuario.nombre);
    this.usuarioForm.controls.rolId.setValue(this.usuario.rol.rolId);
  }
  //success, info, warn, error, multiple
  addSingle(tipo: string, mensaje: string) {
    this.messageService.add({ severity: tipo, summary: 'Mensaje', detail: mensaje });
  }
  onSubmit(value: any) {
    if (this.newUsuario && this.usuarioForm.valid) {
      const departamento = new DepartamentoDto();
      const persona = new PersonaDto();
      const usuario = new UsuarioDto();
      const rol = new RolDto();
      departamento.departamentoId = value.departamentoId;
      persona.cedula = value.cedula;
      persona.nombre = value.nombre;
      persona.paterno = value.paterno;
      persona.materno = value.materno;
      persona.telefono = value.telefono;
      persona.celular = value.celular;
      persona.email = value.email;
      persona.valido = 'AC';
      persona.direccion = value.direccion;
      usuario.nombre = value.user;
      usuario.contraseña = value.contraseña;
      usuario.valido = 'AC';
      rol.rolId = value.rolId;
      persona.departamento = departamento;
      usuario.rol = rol;
      usuario.persona = persona;
      this.guardarUsuario(usuario);
    } else {
      if (this.selectedElement) {
        console.log(this.usuario);
        const departamento = new DepartamentoDto();
        const rol = new RolDto();
        departamento.departamentoId = value.departamentoId;
        rol.rolId = value.rolId;
        this.usuario.persona.cedula = value.cedula;
        this.usuario.persona.nombre = value.nombre;
        this.usuario.persona.paterno = value.paterno;
        this.usuario.persona.materno = value.materno;
        this.usuario.persona.telefono = value.telefono;
        this.usuario.persona.celular = value.celular;
        this.usuario.persona.email = value.email;
        this.usuario.persona.direccion = value.direccion;
        this.usuario.nombre = value.user;
        this.usuario.persona.departamento = departamento;
        this.usuario.rol = rol;
        this.modificarUsuario(this.usuario);
        this.usuario = new UsuarioDto();

      }
    }

  }
  clean() {
    this.usuarioForm.reset();
    this.selectedElement = false;
    this.newUsuario = true;
  }
  validForm() {
    if (this.usuarioForm.valid || this.selectedElement) {
      return true;
    } else {
      return false;
    }
  }
  showDialog() {
    if (this.selectedElement) {
      this.displayDialog = true;
    }
  }
  closeDialog() {
    this.displayDialog = false;
  }
}

