import { VehiculoDto } from './../../../models/vehiculo.dto';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng-lts/api';
import { VehiculoService } from '../../../services/vehiculo.service';
import { DispositivoDto } from 'src/app/models/dispositivo.dto';
import { ConductorDto } from '../../../models/conductor.dto';
import { SelectItem, FilterUtils } from 'primeng/api';
import { ConductorService } from '../../../services/conductor.service';
import { DispositivoService } from '../../../services/dispositivo.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {


  dispositivo: DispositivoDto;
  dispositivos: DispositivoDto[];

  conductor: ConductorDto;
  conductores: ConductorDto[];

  vehiculo: VehiculoDto;
  vehiculos: VehiculoDto[];

  estadosDispositivos: SelectItem[] = [];
  estadosConductores: SelectItem[] = [];

  operacion = true;
  selectedElement = false;
  displayDialog = false;

  cols: any[];
  vehiculoForm: FormGroup;
  constructor(
    private conductorService: ConductorService,
    private dispositivoService: DispositivoService,
    private vehiculoService: VehiculoService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.conductoresTodos();
    this.dispositivoTodos();
    this.vehiculosTodos();

    this.vehiculoForm = this.fb.group({
    });

    this.cols = [
      { field: 'dispositivo', subfield: 'nombre', header: 'DISPOSITIVO' },
      { field: 'placa', header: 'PLACA' },
      { field: 'marca', header: 'MARCA' },
      { field: 'modelo', header: 'MODELO' },
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

  public conductoresTodos() {
    this.conductorService.getConductores().subscribe(
      res => {
        this.conductores = res;
        this.conductores.forEach((element, index) => {
          this.estadosConductores.push({ label: element.persona.cedula, value: element.conductorId });
        });
      },
      error => {
        const errorMessage = error;
      }
    );
  }
  public dispositivoTodos() {
    this.dispositivoService.getDispositivosTodos().subscribe(
      res => {
        this.dispositivos = res;
        this.dispositivos.forEach((element, index) => {
          this.estadosDispositivos.push({ label: element.nombre, value: element.dispositivoId });
        });
      },
      error => {
        const errorMessage = error;
      }
    );
  }
  public vehiculosTodos() {
    this.vehiculoService.getVehiculos().subscribe(
      res => {
        this.vehiculos = res;
      },
      error => {
        const errorMessage = error;
      }
    );
  }

  // public guardarVehiculo(vehiculo: VehiculoDto) {
  //   this.vehiculoService.guardarVehiculos(vehiculo)
  //     .subscribe(
  //       result => {
  //         this.addSingle('success', 'Registro satisfactorio');
  //         this.clean();
  //         this.personasTodos();
  //       },
  //       err => {
  //         this.addSingle('error', err.error.mensaje);
  //       });
  // }

  onSubmit(value: any) {
    if (this.operacion && this.vehiculoForm.valid) {
      // const departamento = new DepartamentoDto();
      // const persona = new PersonaDto();
      // departamento.departamentoId = value.dep;
      // persona.cedula = value.cedula;
      // persona.nombre = value.nombre;
      // persona.paterno = value.paterno;
      // persona.materno = value.materno;
      // persona.telefono = value.telefono;
      // persona.celular = value.celular;
      // persona.email = value.email;
      // persona.valido = 'AC';
      // persona.direccion = value.direccion;
      // persona.departamento = departamento;
      // this.guardarPersona(persona);
    }
  }
  addSingle(tipo: string, mensaje: string) {
    this.messageService.add({ severity: tipo, summary: 'Mensaje', detail: mensaje });
  }

  clean() {
    this.vehiculoForm.reset();
    this.selectedElement = false;
    this.operacion = true;
  }
  validForm() {
    if (this.vehiculoForm.valid || this.selectedElement) {
      return true;
    } else {
      return false;
    }
  }

  closeDialog() {
    this.displayDialog = false;
  }


}
