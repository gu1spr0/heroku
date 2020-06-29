import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FooterComponent } from './components/module-layout/footer/footer.component';
import { HeaderComponent } from './components/module-layout/header/header.component';
import { MenuComponent } from './components/module-layout/menu/menu.component';
import { VehiculoComponent } from './components/module-geo/vehiculo/vehiculo.component';
import { UsuarioComponent } from './components/module-geo/usuario/usuario.component';
import { PersonaComponent } from './components/module-geo/usuario/persona/persona.component';
import { UserComponent } from './components/module-geo/usuario/user/user.component';
import { RutaComponent } from './components/module-geo/ruta/ruta.component';
import { LoginComponent } from './components/module-geo/login/login.component';
import { HomeComponent } from './components/module-geo/home/home.component';
import { DispositivoComponent } from './components/module-geo/dispositivo/dispositivo.component';
import { ConfiguracionComponent } from './components/module-geo/configuracion/configuracion.component';
import { DepartamentoComponent } from './components/module-geo/configuracion/departamento/departamento.component';
import { RolesComponent } from './components/module-geo/configuracion/roles/roles.component';
import { routing, appRouteingProvider } from './routes/app.routing';
import { PersonaService } from './services/persona.service';
import { environment } from '../environments/environment';
//Formularios primeng
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TabViewModule } from 'primeng/tabview';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { UsuarioService } from './services/usuario.service';
import { MessageService } from 'primeng/api';
import { DepartamentoService } from './services/departamento.service';
import { RolService } from './services/rol.service';
import { AuthService } from './services/auth.service';
import { HelperService } from './services/helper.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
//MQTT Service
import { IMqttMessage, MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '68.183.101.117',
  connectOnCreate: true,
  port: 8083,
  path: '/mqtt',
  username: 'guillermo',
  password: 'Kuillerlearsi10+',
  protocol: 'ws'
};
const config: SocketIoConfig = {
  url: environment.apiUrl, options: {}
};
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    VehiculoComponent,
    UsuarioComponent,
    PersonaComponent,
    UserComponent,
    RutaComponent,
    LoginComponent,
    HomeComponent,
    DispositivoComponent,
    ConfiguracionComponent,
    DepartamentoComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    ButtonModule,
    MenubarModule,
    SidebarModule,
    PanelMenuModule,
    TabViewModule,
    CodeHighlighterModule,
    CardModule,
    TableModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    PanelModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    InputTextareaModule,
    PasswordModule,
  ],
  // tslint:disable-next-line: max-line-length
  providers: [appRouteingProvider, PersonaService, UsuarioService, DepartamentoService, RolService, MessageService, AuthService, HelperService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
