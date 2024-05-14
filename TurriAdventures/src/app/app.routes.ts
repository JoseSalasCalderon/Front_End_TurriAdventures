import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RatesComponent } from './tarifas/rates.component';
import { ReservaComponent } from './reserve/reserve/reserva.component';
import { ConfirmarreservaComponent } from './reserve/reserveConfirm/confirmarreserva.component';
import { ReservanodisponibleComponent } from './reserve/reservenodisponible/reservanodisponible.component';
import { ContactComponent } from './contact/contact.component';
import { FacilidadesComponent } from './facilidades/facilidades.component';
import { DireccionComponent } from './direccion/direccion.component';
import { VistaHabitacionesComponent } from './vista-habitaciones/vista-habitaciones.component';
import { VerEstadoHotelComponent } from './ver-estado-hotel/ver-estado-hotel.component';
import { LoginComponent } from './login/login.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AuthGuard } from './auth.guard';
import { ReserveComponent } from './reserve/reservaHabitacion/reserve.component';
import { HomeAdministradorComponent } from './home-administrador/home-administrador.component';
import { ListadoReservacionesComponent } from './listado-reservaciones/listado-reservaciones.component';
import { AdministrarHabitacionesComponent } from './administrar-habitaciones/administrar-habitaciones.component';
import { VerTipoHabitacionComponent } from './ver-tipo-habitacion/ver-tipo-habitacion.component';
import { ListarTemporadasComponent } from './listar-temporadas/listar-temporadas.component';
import { CrearTemporadasComponent } from './crear-temporadas/crear-temporadas.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'rates', component: RatesComponent },
    { path: 'reserve', component: ReserveComponent },
    { path: 'reserva', component: ReservaComponent },
    { path: 'about', component: AboutComponent},
    { path: 'confirmReserve', component: ConfirmarreservaComponent},
    { path: 'reservanodisponible', component: ReservanodisponibleComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'facilities', component: FacilidadesComponent },
    { path: 'direction', component: DireccionComponent },
    { path: 'vista/:id', component:VistaHabitacionesComponent},
    { path: 'administrador', component: AdministradorComponent,  },
    { path: 'verEstadoHotel', component:VerEstadoHotelComponent},
    { path: 'listadoReservaciones', component:ListadoReservacionesComponent},
    { path: 'administrarHabitaciones', component:AdministrarHabitacionesComponent},
    { path: 'verTipoHabitacion', component:VerTipoHabitacionComponent},
    { path: 'login', component: LoginComponent},
    { path: 'administrador', component: AdministradorComponent, canActivate:[AuthGuard] },
    {path:'listar-temporadas', component: ListarTemporadasComponent},
    {path:'crear-temporadas', component: CrearTemporadasComponent},
    { path: '**', component: HomeAdministradorComponent,canActivate:[AuthGuard]},
    { path: 'homeAdmin', component: HomeAdministradorComponent, canActivate:[AuthGuard]},





];

