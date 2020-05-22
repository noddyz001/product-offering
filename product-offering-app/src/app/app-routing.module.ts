import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrderPageComponent } from './order-page/order-page.component';


const routes: Routes = [

   { path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'orderPage', component: OrderPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
