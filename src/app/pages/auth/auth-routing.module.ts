import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './sign-in/sign-in.component';
import {RegistrationComponent} from './registration/registration.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {path: 'sign-in', component: SignInComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: '', redirectTo: 'sign-in', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {
}
