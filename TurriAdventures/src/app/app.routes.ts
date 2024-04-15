import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RatesComponent } from './tarifas/rates.component';
import { ReserveComponent } from './reserve/reservaHabitacion/reserve.component';
import { ReservaComponent } from './reserve/reserve/reserva.component';
import { ConfirmarreservaComponent } from './reserve/reserveConfirm/confirmarreserva.component';
import { ContactComponent } from './contact/contact.component';
import { FacilidadesComponent } from './facilidades/facilidades.component';
import { DireccionComponent } from './direccion/direccion.component';
export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'home', component: HomeComponent },
    { path: 'rates', component: RatesComponent },
    { path: 'reserve', component: ReserveComponent },
    { path: 'reserva', component: ReservaComponent },
    { path: 'confirmReserve', component: ConfirmarreservaComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'facilities', component: FacilidadesComponent },
    { path: 'direction', component: DireccionComponent },
    
    { path: '**', component: HomeComponent}

];

