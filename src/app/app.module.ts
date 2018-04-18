import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ComboDataModule } from "./combo-data/combo-data.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComboDataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
