import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../auth.component.scss']
})
export class SignInComponent implements OnInit {
  entityForm: FormGroup;
  constructor(public fb: FormBuilder,
              public router: Router,
              public service: AuthService) { }

  ngOnInit() {
    this.entityForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signIn() {
    this.service.signIn(this.entityForm.value)
      .subscribe(res => {
        if(res['success']){
          localStorage.setItem('token',res['data']['token']);
          this.router.navigate(['main']);
        }
      });
  }



}
