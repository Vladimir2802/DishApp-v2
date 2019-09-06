import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../auth.component.scss']
})
export class RegistrationComponent implements OnInit {
  entityForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private service: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.entityForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_repeat: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp() {
    const signUpData = new FormData();
    signUpData.append('email', this.entityForm.controls.email.value);
    signUpData.append('password', this.entityForm.controls.password.value);
    // signUpData.append('role_id', '2'); Maybe will be involved in future

    this.service.signUp(signUpData)
      .subscribe(data => {
        localStorage.setItem('token', data.data.token);
        this.router.navigate(['main']);
      }, error => {
        this.toastr.error('', error.error.message, {
          positionClass: 'toast-bottom-center',
        });
      });
  }

}
