import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { HttpClientModule } from "@angular/common/http";

import { ComboDataComponent } from './combo-data.component';
import { ComboDataService } from "./combo-data.service";

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    HttpClientModule,
    FormsModule

  ],
  declarations: [ComboDataComponent],
  exports: [ComboDataComponent],
  providers: [ComboDataService]
})
export class ComboDataModule {
}
