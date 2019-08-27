import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../../shared/shared.module';
import { RegistrationComponent } from './registration/registration.component';



@NgModule({
  declarations: [AuthComponent, SignInComponent, RegistrationComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AuthModule { }
