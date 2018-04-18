import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { switchMap, debounceTime } from "rxjs/operators";
import { isNullOrUndefined } from "util";

import { ComboDataService } from "./combo-data.service";
import { Filtro } from "./models/filtro.model";

@Component({
  selector: 'itg-combo-data',
  templateUrl: './combo-data.component.html',
  styleUrls: ['./combo-data.component.css']
})
export class ComboDataComponent implements OnInit {

  @Input() public tipoLista: number;
  @Input() public esFiltrable: boolean = true;
  @Input() public mostrarInfo: boolean = false;
  @Input() public itemSelected: any;

  @Output() public setHijo = new EventEmitter<any>();
  @Output() public setPadre = new EventEmitter<any>();

  typeahead = new EventEmitter<string>();

  idPadre: number;
  listado: Array<any> = [];

  constructor(private comboDataService: ComboDataService) {

    this.typeahead.pipe(
      debounceTime(500),
      switchMap(charFilter => this.filtrar(charFilter))).subscribe(response => {
    });
  }

  ngOnInit() {
    if (!this.esFiltrable) {
      this.comboDataService.getListado(this.tipoLista).subscribe(response => {
        this.listado = response;
      });
    }
  }

  onSelection(item: any) {
    if (isNullOrUndefined(this.idPadre) && !isNullOrUndefined(item)) {
      this.setPadre.emit(item);
      this.setHijo.emit(item);
    } else {
      this.setHijo.emit(item);
    }
  }

  filtrar(charFilter: string) {
    if (charFilter.length > 2) {
      let filtro: Filtro = new Filtro(charFilter, this.idPadre);
      this.comboDataService.filtrarListado(this.tipoLista, filtro).subscribe(response => {
        console.log(response);
        this.listado = response;
      });
    }
    return Observable.create(obj => {
      obj.next(charFilter);
      obj.complete();
    });
  }

  setComboByPadre(item: any) {
    this.listado = [];
    this.itemSelected = null;

    if (item != null) {
      if (item.id != null) {
        this.idPadre = item.id;
        this.comboDataService.getListadoByPadre(this.tipoLista, item.id).subscribe(response => {
          this.listado = response;
        });
      }
    } else {
      this.idPadre = null;
      this.setHijo.emit(this.itemSelected);
    }
  }

  setComboByHijo(item: any) {
    this.comboDataService.getItemByHijo(this.tipoLista, item).subscribe(response => {

      if (!isNullOrUndefined(response[0])) {
        this.itemSelected = response[0];
      } else {
        this.itemSelected = response;
      }
      console.log(this.itemSelected);
      this.setPadre.emit(this.itemSelected);
    });
  }

  public writeValue(val: any) {
    this.itemSelected = val;
  }

  public registerOnChange(fn: (_: any) => void): void {
  }

  public registerOnTouched(fn: () => void): void {
  }
}
