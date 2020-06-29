import { SelectItem, MessageService, FilterUtils } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { PersonaDto } from '../../../../models/persona.dto';
import { DepartamentoDto } from '../../../../models/departamento.dto';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PersonaService } from '../../../../services/persona.service';
import { DepartamentoService } from '../../../../services/departamento.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {

  persona: PersonaDto;
  departamento: DepartamentoDto;

  personas: PersonaDto[];
  departamentos: DepartamentoDto[];

  estadosDepartamentos: SelectItem[] = [];

  operacion = true;
  selectedElement = false;
  displayDialog = false;

  cols: any[];
  personaForm: FormGroup;
  constructor(
    private personaService: PersonaService,
    private departamentoService: DepartamentoService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.personasTodos();
    this.departamentosTodos();

    this.personaForm = this.fb.group({
      cedula: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      paterno: new FormControl('', Validators.required),
      materno: new FormControl(''),
      telefono: new FormControl(''),
      direccion: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      email: new FormControl(''),
      dep: new FormControl('', Validators.required),
    });

    this.cols = [
      { field: 'cedula', header: 'CEDULA' },
      { field: 'nombre', header: 'NOMBRE' },
      { field: 'paterno', header: 'PATERNO' },
      { field: 'materno', header: 'MATERNO' },
      { field: 'celular', header: 'CELULAR' },
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

  public personasTodos() {
    this.personaService.getPersonasTodos().subscribe(
      res => {
        this.personas = res;
        console.log(this.personas);
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

  public eliminarPersona() {
    this.personaService.eliminarPersona(this.persona.personaId)
      .subscribe(
        result => {
          this.addSingle('info', 'Eliminacion satisfactoria');
          this.clean();
          this.personasTodos();
          this.closeDialog();
        },
        err => {
          console.log(err);
          this.addSingle('error', err.error.mensaje);
        }
      );
  }
  onRowSelect(event) {
    this.operacion = false;
    this.selectedElement = true;
    this.persona = event.data;
    this.personaForm.controls.cedula.setValue(this.persona.cedula);
    this.personaForm.controls.nombre.setValue(this.persona.nombre);
    this.personaForm.controls.paterno.setValue(this.persona.paterno);
    this.personaForm.controls.materno.setValue(this.persona.materno);
    this.personaForm.controls.telefono.setValue(this.persona.telefono);
    this.personaForm.controls.direccion.setValue(this.persona.direccion);
    this.personaForm.controls.celular.setValue(this.persona.celular);
    this.personaForm.controls.email.setValue(this.persona.email);
    this.personaForm.controls.dep.setValue(this.persona.departamento.departamentoId);
  }
  public guardarPersona(persona: PersonaDto) {
    this.personaService.guardarPersona(persona)
      .subscribe(
        result => {
          this.addSingle('success', 'Registro satisfactorio');
          this.clean();
          this.personasTodos();
        },
        err => {
          this.addSingle('error', err.error.mensaje);
        });
  }
  public modificarPersona(persona: PersonaDto) {
    this.personaService.modificarPersona(persona.personaId, persona)
      .subscribe(
        result => {
          this.addSingle('info', 'Modificacion satisfactoria');
          this.clean();
          this.personasTodos();
        },
        err => {
          console.log(err);
          this.addSingle('error', err.error.mensaje);
        }
      );
  }

  onSubmit(value: any) {
    if (this.operacion && this.personaForm.valid) {
      const departamento = new DepartamentoDto();
      const persona = new PersonaDto();
      departamento.departamentoId = value.dep;
      persona.cedula = value.cedula;
      persona.nombre = value.nombre;
      persona.paterno = value.paterno;
      persona.materno = value.materno;
      persona.telefono = value.telefono;
      persona.celular = value.celular;
      persona.email = value.email;
      persona.valido = 'AC';
      persona.direccion = value.direccion;
      persona.departamento = departamento;
      this.guardarPersona(persona);
    } else {
      if (this.selectedElement) {
        const departamento = new DepartamentoDto();
        departamento.departamentoId = value.dep;
        this.persona.cedula = value.cedula;
        this.persona.nombre = value.nombre;
        this.persona.paterno = value.paterno;
        this.persona.materno = value.materno;
        this.persona.telefono = value.telefono;
        this.persona.celular = value.celular;
        this.persona.email = value.email;
        this.persona.direccion = value.direccion;
        this.persona.departamento = departamento;
        this.modificarPersona(this.persona);
        this.persona = new PersonaDto();
      }
    }
  }
  addSingle(tipo: string, mensaje: string) {
    this.messageService.add({ severity: tipo, summary: 'Mensaje', detail: mensaje });
  }

  clean() {
    this.personaForm.reset();
    this.selectedElement = false;
    this.operacion = true;
  }
  validForm() {
    if (this.personaForm.valid || this.selectedElement) {
      return true;
    } else {
      return false;
    }
  }
  showDialog(persona: PersonaDto) {
    this.selectedElement = true;
    this.persona = persona;
    this.displayDialog = true;
  }
  closeDialog() {
    this.displayDialog = false;
  }

}
