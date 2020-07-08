import { Component, OnInit } from '@angular/core';
import { SelectItem, MessageService, FilterUtils } from 'primeng-lts/api';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DispositivoDto } from './../../../models/dispositivo.dto';
import { DispositivoService } from '../../../services/dispositivo.service';
@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.component.html',
  styleUrls: ['./dispositivo.component.scss']
})
export class DispositivoComponent implements OnInit {
  dispositivo: DispositivoDto;
  dispositivos: DispositivoDto[];
  operacion = true;
  selectedElement = false;
  displayDialog = false;
  cols: any[];
  dispositivoForm: FormGroup;
  constructor(
    private dispositivoService: DispositivoService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.dispositivosTodos();

    this.dispositivoForm = this.fb.group({
      nombreDisp: new FormControl({ value: '', disabled: true }, Validators.required),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
      subscriber: new FormControl({ value: '', disabled: true }, Validators.required),
      publisher: new FormControl({ value: '', disabled: true }, Validators.required),
      ip: new FormControl({ value: '', disabled: true }, Validators.required),
    });

    this.cols = [
      { field: 'nombre', header: 'IDEN' },
      { field: 'ip', header: 'IP' },
      { field: 'pub', header: 'PUB' },
      { field: 'sub', header: 'SUB' },
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

  public dispositivosTodos() {
    this.dispositivoService.getDispositivosTodos().subscribe(
      res => {
        this.dispositivos = res;
        console.log(this.dispositivos);
      },
      error => {
        const errorMessage = error;
      }
    );
  }
  public eliminarDispositivo() {
    this.dispositivoService.eliminarDispositivo(this.dispositivo.dispositivoId)
      .subscribe(
        result => {
          this.addSingle('info', 'Eliminacion satisfactoria');
          this.clean();
          this.dispositivosTodos();
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
    this.dispositivo = event.data;
    this.dispositivoForm.controls.nombreDisp.setValue(this.dispositivo.nombre);
    this.dispositivoForm.controls.marca.setValue(this.dispositivo.marca);
    this.dispositivoForm.controls.modelo.setValue(this.dispositivo.modelo);
    this.dispositivoForm.controls.descripcion.setValue(this.dispositivo.descripcion);
    this.dispositivoForm.controls.subscriber.setValue(this.dispositivo.sub);
    this.dispositivoForm.controls.publisher.setValue(this.dispositivo.pub);
    this.dispositivoForm.controls.ip.setValue(this.dispositivo.ip);
  }

  generar(value: any) {
    let ip = '';
    let nombre = '';
    let sub = '';
    let pub = '';
    this.dispositivo = new DispositivoDto();
    this.dispositivo.marca = value.marca;
    this.dispositivo.modelo = value.modelo;
    this.dispositivo.descripcion = value.descripcion;
    nombre = this.dispositivo.marca.substr(0, 3);
    nombre += '-';
    nombre += Math.floor(Math.random() * (99 - 10)) + 10;
    this.dispositivo.nombre = nombre;
    sub += 'LatLon/' + nombre;
    pub += 'Evento/' + nombre;
    this.dispositivo.sub = sub;
    this.dispositivo.pub = pub;
    ip = '192.168.0.' + Math.floor(Math.random() * 20) + 1;
    this.dispositivo.ip = ip;
    this.dispositivoForm.controls.nombreDisp.setValue(this.dispositivo.nombre);
    this.dispositivoForm.controls.subscriber.setValue(this.dispositivo.sub);
    this.dispositivoForm.controls.publisher.setValue(this.dispositivo.pub);
    this.dispositivoForm.controls.ip.setValue(this.dispositivo.ip);
    console.log(this.dispositivo);
  }

  public guardarDispositivo(dispositivo: DispositivoDto) {
    this.dispositivoService.guardarDispositivo(dispositivo)
      .subscribe(
        result => {
          this.addSingle('success', 'Registro satisfactorio');
          this.clean();
          this.dispositivosTodos();
        },
        err => {
          this.addSingle('error', err.error.mensaje);
        });
  }

  onSubmit(value: any) {
    if (this.operacion && this.dispositivoForm.valid) {
      const dispositivo = new DispositivoDto();
      dispositivo.nombre = this.dispositivo.nombre;
      dispositivo.marca = value.marca;
      dispositivo.modelo = value.modelo;
      dispositivo.descripcion = value.descripcion;
      dispositivo.sub = this.dispositivo.sub;
      dispositivo.pub = this.dispositivo.pub;
      dispositivo.ip = this.dispositivo.ip;
      dispositivo.valido = 'AC';
      // console.log(dispositivo);
      this.guardarDispositivo(dispositivo);
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

  addSingle(tipo: string, mensaje: string) {
    this.messageService.add({ severity: tipo, summary: 'Mensaje', detail: mensaje });
  }

  clean() {
    this.dispositivoForm.reset();
    this.selectedElement = false;
    this.operacion = true;
  }
  validForm() {
    if (this.dispositivoForm.valid || this.selectedElement) {
      return true;
    } else {
      return false;
    }
  }
  showDialog(dispositivo: DispositivoDto) {
    this.selectedElement = true;
    this.dispositivo = dispositivo;
    this.displayDialog = true;
  }
  closeDialog() {
    this.displayDialog = false;
  }

}
