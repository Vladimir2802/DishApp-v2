import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServicesModule} from './services/services.module';
import {MaterialModule} from './modules/material.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ServicesModule,
    CommonModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    ServicesModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
