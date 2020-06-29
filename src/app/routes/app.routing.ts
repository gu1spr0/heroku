import { Role } from './../helpers/rol';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from '../components/module-geo/login/login.component';
import { UsuarioComponent } from '../components/module-geo/usuario/usuario.component';
import { HomeComponent } from '../components/module-geo/home/home.component';
import { ConfiguracionComponent } from '../components/module-geo/configuracion/configuracion.component';
import { RutaComponent } from '../components/module-geo/ruta/ruta.component';
import { AuthGuard } from '../helpers/auth.guard';
const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard], data: { roles: [Role.ADMIN] } },
    { path: 'home', component: HomeComponent },
    { path: 'configuracion', component: ConfiguracionComponent },
    { path: 'ruta', component: RutaComponent },
    { path: '***', component: HomeComponent }
];

export const appRouteingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
