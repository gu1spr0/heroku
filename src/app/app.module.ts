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
import { ButtonModule } from 'primeng-lts/button';
import { MenubarModule } from 'primeng-lts/menubar';
import { SidebarModule } from 'primeng-lts/sidebar';
import { PanelMenuModule } from 'primeng-lts/panelmenu';
import { TabViewModule } from 'primeng-lts/tabview';
import { CodeHighlighterModule } from 'primeng-lts/codehighlighter';
import { CardModule } from 'primeng-lts/card';
import { TableModule } from 'primeng-lts/table';
import { DialogModule } from 'primeng-lts/dialog';
import { InputTextModule } from 'primeng-lts/inputtext';
import { DropdownModule } from 'primeng-lts/dropdown';
import { PanelModule } from 'primeng-lts/panel';
import { ToastModule } from 'primeng-lts/toast';
import { MessagesModule } from 'primeng-lts/messages';
import { MessageModule } from 'primeng-lts/message';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { PasswordModule } from 'primeng-lts/password';
import { UsuarioService } from './services/usuario.service';
import { MessageService } from 'primeng-lts/api';
import { DepartamentoService } from './services/departamento.service';
import { RolService } from './services/rol.service';
import { AuthService } from './services/auth.service';
import { HelperService } from './services/helper.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
//MQTT Service
import { MqttModule, IMqttServiceOptions } from 'ngx-mqtt';
import { DispositivoService } from './services/dispositivo.service';
import { BrokerService } from './services/broker.service';
import { AcopioComponent } from './components/module-geo/acopio/acopio.component';
import { ReportesComponent } from './components/module-geo/reportes/reportes.component';
import { MapaService } from './services/mapa.service';
import { PuntosService } from './services/puntos.service';
import { ConductorComponent } from './components/module-geo/conductor/conductor.component';
import { ConductorService } from './services/conductor.service';
import { VehiculoService } from './services/vehiculo.service';
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
    RolesComponent,
    AcopioComponent,
    ReportesComponent,
    ConductorComponent,
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
    PasswordModule
  ],
  // tslint:disable-next-line: max-line-length
  providers: [appRouteingProvider, VehiculoService, ConductorService, PuntosService, BrokerService, DispositivoService, PersonaService, UsuarioService, DepartamentoService, RolService, MessageService, AuthService, HelperService, MapaService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
