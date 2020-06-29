import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DepartamentoDto } from '../../../../models/departamento.dto';
import { DepartamentoService } from './../../../../services/departamento.service';
@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  departamentos: DepartamentoDto[];
  departamento: DepartamentoDto;
  constructor(private departamentoService: DepartamentoService) { }

  ngOnInit() {
    this.departamentosTodos();
  }

  departamentosTodos() {
    this.departamentoService.getDepartamentoTodos().subscribe(
      res => {
        this.departamentos = res;
      },
      error => {
        const errorMessage = <any>error;
        console.log(<any>error);
      }
    );
  }
}
