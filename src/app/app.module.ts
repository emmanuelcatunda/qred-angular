import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {QredNgModule} from 'projects/qred-ng/src/public_api'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,QredNgModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
