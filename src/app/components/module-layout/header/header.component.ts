import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/components/common/api';
import { UsuarioDto } from '../../../models/usuario.dto';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  display = false;
  isLoged = false;
  usuario: UsuarioDto;
  public actual;
  displayDialog = false;
  public nombre = 'INVITADO';
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    public authService: AuthService,
    private router: Router,
    private helper: HelperService) {
    /*if (this.authService.isLoggedIn()) {
      this.nombre = this.authService.getCurrentUser().usuario;
      this.helper.setRol(this.authService.getCurrentUser().rol);
    }*/
  }
  msgs: Message[] = [];
  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: new FormControl('', Validators.required),
      contraseña: new FormControl('', Validators.required),
    });
    this.actual = this.authService.getCurrentUser();
    if (this.actual) {
      this.nombre = this.actual.usuario;
    }

  }
  ingresarLogin(usuario: UsuarioDto) {
    this.authService.login(usuario).subscribe(
      result => {
        console.log(result);
        if (result) {
          this.clean();
          this.displayDialog = false;
          this.isLoged = true;
          this.actual = this.authService.getCurrentUser();
          if (this.actual) {
            this.nombre = this.actual.usuario;
            this.helper.setRol(this.actual.rol);
          }
        } else {
          this.addSingle('info', 'Usuario no encontrado');
        }
      },
      error => {
        const errorMensaje = error;
      }
    );
  }
  salirLogin() {
    this.authService.logout();
    this.helper.setRol('OTHER');
    this.nombre = 'INVITADO';
    this.isLoged = false;
  }

  onSubmit(value: any) {
    if (this.loginForm.valid) {
      this.usuario = new UsuarioDto();
      this.usuario.nombre = value.usuario;
      this.usuario.contraseña = value.contraseña;
      this.ingresarLogin(this.usuario);
    } else {
      this.addSingle('error', 'Verifique usuario y contraseña');
    }

  }
  addSingle(tipo: string, mensaje: string) {
    this.msgs = [];
    this.msgs.push({ severity: tipo, summary: 'Mensaje', detail: mensaje });
  }
  clean() {
    this.loginForm.reset();
    this.msgs = [];
  }
}
