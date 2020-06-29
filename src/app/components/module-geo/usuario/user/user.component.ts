import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../../../models/usuario.dto';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario.service';
import { MessageService, SelectItem, FilterUtils } from 'primeng/api';
import { RolService } from '../../../../services/rol.service';
import { RolDto } from '../../../../models/rol.dto';
import { PersonaDto } from '../../../../models/persona.dto';
import { PersonaService } from '../../../../services/persona.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  usuario: UsuarioDto;
  usuarios: UsuarioDto[];
  roles: RolDto[];
  personas: PersonaDto[];
  estadosRoles: SelectItem[] = [];
  estadosPersonas: SelectItem[] = [];
  selectedElement = false;
  displayDialog = false;
  operacion = true;
  cols: any[];
  usuarioForm: FormGroup;
  constructor(
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private messageService: MessageService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.usuariosTodos();
    this.personasTodos();
    this.rolesTodos();
    this.usuarioForm = this.fb.group({
      cedula: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
      contraseñac: new FormControl('', Validators.required),
      rol: new FormControl('', Validators.required)
    });
    this.cols = [
      { field: 'usuarioId', header: 'ID' },
      { field: 'nombre', header: 'USUARIO' },
      { field: 'rol', subfield: 'nombre', header: 'ROL' },
      { field: 'valido', header: 'VALIDO' },
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
  public rolesTodos() {
    this.rolService.getRolesTodos().subscribe(
      res => {
        this.roles = res;
        this.roles.forEach((element, index) => {
          this.estadosRoles.push({ label: element.nombre, value: element.rolId });
        });
      },
      error => {
        const errorMessage = error;
      }
    );
  }
  public personasTodos() {
    this.personaService.getPersonasTodos().subscribe(
      res => {
        this.personas = res;
        this.personas.forEach((element, index) => {
          this.estadosPersonas.push({ label: element.cedula, value: element.personaId });
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
          this.addSingle('success', 'Registro satisfactorio');
          this.clean();
          this.usuariosTodos();
        },
        err => {
          this.addSingle('error', err.error.mensaje);
        });
  }
  onRowSelect(event) {
    this.operacion = false;
    this.selectedElement = true;
    this.usuario = event.data;
    this.usuarioForm.controls.user.setValue(this.usuario.nombre);
    this.usuarioForm.controls.rol.setValue(this.usuario.rol.rolId);
  }

  onSubmit(value: any) {
    if (this.operacion && this.usuarioForm.valid) {
      const usuario = new UsuarioDto();
      const rol = new RolDto();
      usuario.nombre = value.user;
      usuario.contraseña = value.contraseña;
      usuario.valido = 'AC';
      rol.rolId = value.rol;
      usuario.rol = rol;
      this.guardarUsuario(usuario);
    } else {
      if (this.selectedElement) {
        const rol = new RolDto();
        rol.rolId = value.rol;
        this.usuario.nombre = value.user;
        this.usuario.rol = rol;
        //this.modificarUsuario(this.usuario);
        this.usuario = new UsuarioDto();

      }
    }

  }
  addSingle(tipo: string, mensaje: string) {
    this.messageService.add({ severity: tipo, summary: 'Mensaje', detail: mensaje });
  }
  clean() {
    this.usuarioForm.reset();
    this.selectedElement = false;
    this.operacion = true;
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
