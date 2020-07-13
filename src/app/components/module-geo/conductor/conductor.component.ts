import { ConductorDto } from './../../../models/conductor.dto';
import { Component, OnInit } from '@angular/core';
import { ConductorService } from '../../../services/conductor.service';
import { MessageService } from 'primeng-lts/api';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItem, FilterUtils } from 'primeng/api';
import { PersonaService } from '../../../services/persona.service';
import { PersonaDto } from 'src/app/models/persona.dto';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.scss']
})
export class ConductorComponent implements OnInit {
  public personas: PersonaDto[];
  public conductores: ConductorDto[];
  public estadosPersonas: SelectItem[] = [];
  public estadosCategorias: SelectItem[] = [];
  public conductorForm: FormGroup;
  displayDialog = false;
  operacion = true;
  public cols: any[];
  selectedElement = false;
  constructor(
    private conductorService: ConductorService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private personaService: PersonaService) { }

  ngOnInit() {
    this.personasTodos();
    this.conductoresTodos();
    this.conductorForm = this.fb.group({
      cedula: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
    });

    this.estadosCategorias = [
      { label: 'Categoria B', value: 'B' },
      { label: 'Categoria C', value: 'C' },
    ];

    this.cols = [
      { field: 'persona', subfield: 'cedula', header: 'CEDULA' },
      { field: 'categoria', header: 'CATEGORIA' },
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

  addSingle(tipo: string, mensaje: string) {
    this.messageService.add({ severity: tipo, summary: 'Mensaje', detail: mensaje });
  }

  clean() {
    this.conductorForm.reset();
    this.selectedElement = false;
    this.operacion = true;
  }
  validForm() {
    if (this.conductorForm.valid || this.selectedElement) {
      return true;
    } else {
      return false;
    }
  }
  closeDialog() {
    this.displayDialog = false;
  }

  public conductoresTodos() {
    this.conductorService.getConductores().subscribe(
      res => {
        this.conductores = res;
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

  public guardarConductor(conductor: ConductorDto) {
    this.conductorService.guardarConductor(conductor)
      .subscribe(
        result => {
          this.addSingle('success', 'Registro satisfactorio');
          this.clean();
          this.conductoresTodos();
        },
        err => {
          this.addSingle('error', err.error.mensaje);
        });
  }

  onSubmit(value: any) {
    if (this.operacion && this.conductorForm.valid) {
      const conductor = new ConductorDto();
      const persona = new PersonaDto();
      persona.personaId = value.cedula;
      conductor.persona = persona;
      conductor.categoria = value.categoria;
      this.guardarConductor(conductor);
    } else {
      /*if (this.selectedElement) {
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
      }*/
    }
  }

}
