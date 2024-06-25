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
import { DisponibilidadHabitacionesComponent } from './disponibilidad-habitaciones/disponibilidad-habitaciones.component';
import { ListadoReservacionesComponent } from './listado-reservaciones/listado-reservaciones.component';
import { AdministrarHabitacionesComponent } from './administrar-habitaciones/administrar-habitaciones.component';
import { VerTipoHabitacionComponent } from './ver-tipo-habitacion/ver-tipo-habitacion.component';
import { PublicidadCRUDComponent } from './publicidad-crud/publicidad-crud.component';
import { ListarTemporadasComponent } from './listar-temporadas/listar-temporadas.component';
import { CrearTemporadasComponent } from './crear-temporadas/crear-temporadas.component';
import { ModificarTemporadasComponent } from './modificar-temporadas/modificar-temporadas.component';
import { ModificarpaginasComponent } from './modificarpaginas/modificarpaginas.component'
import { ListarOfertasComponent } from './listar-ofertas/listar-ofertas.component';
import { CrearOfertasComponent } from './crear-ofertas/crear-ofertas.component';
import { ModificarOfertasComponent } from './modificar-ofertas/modificar-ofertas.component';
import { AboutCrudComponent } from './about-crud/about-crud.component';
import { ModificarComoLlegarComponent } from './modificar-como-llegar/modificar-como-llegar.component';
import { VerReservaComponent } from './ver-reserva/ver-reserva.component';

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
    { path: 'verEstadoHotel', component:VerEstadoHotelComponent, canActivate:[AuthGuard]},
   { path: 'vista/:id', component:VistaHabitacionesComponent},
    { path: 'listadoReservaciones', component:ListadoReservacionesComponent, canActivate:[AuthGuard]},
    { path: 'administrarHabitaciones', component:AdministrarHabitacionesComponent, canActivate:[AuthGuard]},
    { path: 'verTipoHabitacion', component:VerTipoHabitacionComponent, canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'homeAdmin', component: HomeAdministradorComponent,canActivate:[AuthGuard]},
   { path: 'administrador', component: AdministradorComponent, canActivate:[AuthGuard] },
    {path: 'dispohabitaciones', component: DisponibilidadHabitacionesComponent, canActivate:[AuthGuard]},
    {path: 'crudPulicidad', component: PublicidadCRUDComponent, canActivate:[AuthGuard]},
    {path:'listar-temporadas', component: ListarTemporadasComponent},
    {path:'crear-temporadas', component: CrearTemporadasComponent},
    {path:'editar-temporadas/:id', component: ModificarTemporadasComponent},
    {path: 'modificarpaginas', component: ModificarpaginasComponent, canActivate:[AuthGuard]},
    {path:'listar-ofertas', component: ListarOfertasComponent},
    {path:'crear-ofertas', component: CrearOfertasComponent},
    {path:'editar-ofertas/:id', component: ModificarOfertasComponent},
    {path: 'about-crud', component: AboutCrudComponent},
    {path:'modificarComoLlegar', component: ModificarComoLlegarComponent},
    {path:'ver-reserva/:id', component: VerReservaComponent},
    { path: '**', component: HomeComponent},
    { path: '**', component: HomeAdministradorComponent,canActivate:[AuthGuard]},





];

