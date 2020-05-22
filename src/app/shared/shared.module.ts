import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [SpinnerComponent, ControlMessagesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MaterialModule,
  ], exports: [
    SpinnerComponent,
    ControlMessagesComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule { }
