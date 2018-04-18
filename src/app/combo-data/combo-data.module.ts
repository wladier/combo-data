import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboDataComponent } from './combo-data.component';
import { ComboDataService } from "./combo-data.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComboDataComponent],
  exports: [ComboDataComponent],
  providers: [ComboDataService]
})
export class ComboDataModule {
}
