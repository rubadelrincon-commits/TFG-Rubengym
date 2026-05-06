import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { PricesComponent } from './components/prices/prices.component';
import { HomeforUserComponent } from './components/homefor-user/homefor-user.component';
import { NutricionComponent } from './components/nutricion/nutricion.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { VivoComponent } from './components/vivo/vivo.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PlanespersonalizadosComponent } from './components/planespersonalizados/planespersonalizados.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'homefor-user', component: HomeforUserComponent },
  { path: 'nutricion', component: NutricionComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'vivo', component: VivoComponent },
  { path: 'planespersonalizados', component: PlanespersonalizadosComponent },
  {path: 'profile', component: ProfileComponent}, // Ruta para el perfil de usuario
];
