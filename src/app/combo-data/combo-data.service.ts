import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";
import { isNullOrUndefined } from "util";

import { Provincia } from "./models/provincia.model";
import { Termino } from "./models/termino.model";
import { Localidad } from "./models/localidad.model";
import { Filtro } from "./models/filtro.model";

@Injectable()
export class ComboDataService {

  private urlProvincias: string = 'http://localhost:3000/provincias';
  private urlTerminos: string = 'http://localhost:3000/terminos';
  private urlLocalidades: string = 'http://localhost:3000/localidades';

  provincias: Provincia[] = [];
  terminos: Termino[] = [];
  localidades: Localidad[] = [];

  provincia: Provincia;

  provinciasFiltradas: Provincia[] = [];

  terminosSolicitados: Map<string, Termino[]> = new Map<string, Termino[]>();
  localidadesSolicitadas: Map<string, Localidad[]> = new Map<string, Localidad[]>();

  constructor(private http: HttpClient) {
  }

  getListado(tipoListado: number): Observable<any> {

    switch (tipoListado) {

      case 1: {
        this.provincias = [];

        return this.http.get(this.urlProvincias).pipe(
          map(dbProvincias => {
            for (let i in dbProvincias) {
              let provincia: Provincia = new Provincia(dbProvincias[i].id, dbProvincias[i].nombre, dbProvincias[i].codigo);
              this.provincias.push(provincia);
            }
            return this.provincias;
          }),
          catchError(ComboDataService.handleError)
        );
      }

      case 2: {
        this.terminos = [];

        return this.http.get(this.urlTerminos).pipe(
          map(dbTerminos => {
            for (let i in dbTerminos) {
              let termino: Termino = new Termino(dbTerminos[i].id, dbTerminos[i].nombre, dbTerminos[i].codigo, dbTerminos[i].idProvincia, !isNullOrUndefined(dbTerminos[i].nombreProvincia)?'/'+dbTerminos[i].nombreProvincia:'');
              this.terminos.push(termino);
            }
            return this.terminos;
          }),
          catchError(ComboDataService.handleError)
        );
      }

      case 3: {
        this.localidades = [];

        return this.http.get(this.urlLocalidades).pipe(
          map(dbLocalidades => {
            for (let i in dbLocalidades) {
              let localidad: Localidad = new Localidad(dbLocalidades[i].id, dbLocalidades[i].nombre, dbLocalidades[i].idTermino, dbLocalidades[i].idProvincia);
              this.localidades.push(localidad);
            }
            return this.localidades;
          }),
          catchError(ComboDataService.handleError)
        );
      }
    }
  }

  getListadoByPadre(tipoListado: number, idPadre: number): Observable<any> {

    switch (tipoListado) {

      case 1: {
        return this.http.get(this.urlProvincias).pipe(
          map(dbProvincias => {
            for (let i in dbProvincias) {
              let provincia: Provincia = new Provincia(dbProvincias[i].id, dbProvincias[i].nombre, dbProvincias[i].codigo);
              this.provincias.push(provincia);
            }
            return this.provincias;
          }),
          catchError(ComboDataService.handleError)
        );
      }

      case 2: {
        this.terminos = [];

        for (let i in this.provincias) {
          if (this.provincias[i].id == idPadre) {
            if (this.provincias[i].terminos.length > 0) {
              return Observable.create(obj => {
                obj.next(this.provincias[i].terminos);
                obj.complete();
              });
            } else {
              return this.http.get(this.urlTerminos + '?idProvincia=' + idPadre).pipe(
                map(dbTerminos => {
                  for (let i in dbTerminos) {
                    let termino: Termino = new Termino(dbTerminos[i].id, dbTerminos[i].nombre, dbTerminos[i].codigo, dbTerminos[i].idProvincia, !isNullOrUndefined(dbTerminos[i].nombreProvincia)?'/'+dbTerminos[i].nombreProvincia:'');
                    this.terminos.push(termino);
                  }
                  this.provincias[i].setTerminos(this.terminos);
                  return this.terminos;
                }),
                catchError(ComboDataService.handleError)
              );
            }
          }
        }
      }

      case 3: {
        this.localidades = [];

        for (let i in this.terminos) {
          if (this.terminos[i].id == idPadre) {
            if (this.terminos[i].localidades.length > 0) {
              return Observable.create(obj => {
                obj.next(this.terminos[i].localidades);
                obj.complete();
              });
            } else {
              return this.http.get(this.urlLocalidades + '?idTermino=' + idPadre).pipe(
                map(dbLocalidades => {
                  for (let i in dbLocalidades) {
                    let localidad: Localidad = new Localidad(dbLocalidades[i].id, dbLocalidades[i].nombre, dbLocalidades[i].idTermino, dbLocalidades[i].idProvincia);
                    this.localidades.push(localidad);
                  }
                  this.terminos[i].setLocalidades(this.localidades);
                  return this.localidades;
                }),
                catchError(ComboDataService.handleError)
              );
            }
          }
        }
      }
    }
  }

  getItemByHijo(tipoListado: number, objHijo: any): Observable<any> {

    switch (tipoListado) {
      case 1: {
        if (this.provincias.length > 0) {
          return Observable.create(obj => {
            obj.next(this.provincias.find(x => x.id == objHijo.idProvincia));
            obj.complete();
          });
        } else {
          return this.http.get(this.urlProvincias + '/' + objHijo.idProvincia).pipe(
            map(dbProvincia => {
              return dbProvincia;
            }),
            catchError(ComboDataService.handleError)
          );
        }
      }
      case 2: {
        if (this.provincias.find(x => x.id == objHijo.idProvincia).terminos.length > 0) {
          return Observable.create(obj => {
            obj.next(this.provincias.find(x => x.id == objHijo.idProvincia).terminos.find(x => x.id == objHijo.idTermino));
            obj.complete();
          });
        } else {
          return this.http.get(this.urlTerminos + '?id=' + objHijo.idTermino + '&idProvincia=' + objHijo.idProvincia).pipe(
            map(dbTermino => {
              return dbTermino;
            }),
            catchError(ComboDataService.handleError)
          );
        }
      }
      case 3: {
      }
    }
  }


  filtrarListado(tipoListado: number, filtro: Filtro): Observable<any> {

    switch (tipoListado) {

      case 1: {
        this.provinciasFiltradas = [];
        if (this.provincias.length > 0) {
          for (let i in this.provincias) {
            if (this.provincias[i].nombre.toUpperCase().indexOf(filtro.filtro.toUpperCase()) != -1) {
              this.provinciasFiltradas.push(this.provincias[i]);
            }
          }
        }
        return Observable.create(obj => {
          obj.next(this.provinciasFiltradas);
          obj.complete();
        });
      }

      case 2: {
        this.terminos = [];
        if (filtro.idPadre != null) {
          for (let i in this.provincias) {
            if (this.provincias[i].id == filtro.idPadre) {
              for (let j in this.provincias[i].terminos) {
                if (this.provincias[i].terminos[j].nombre.toUpperCase().indexOf(filtro.filtro.toUpperCase()) != -1) {
                  this.terminos.push(this.provincias[i].terminos[j]);
                }
              }
            }
            return Observable.create(obj => {
              obj.next(this.terminos);
              obj.complete();
            });
          }
        } else {
          if (isNullOrUndefined(this.terminosSolicitados.get(filtro.filtro))) {
            return this.http.get(this.urlTerminos + '?nombre_like=' + filtro.filtro).pipe(
              map(dbTerminos => {
                for (let i in dbTerminos) {
                  let termino: Termino = new Termino(dbTerminos[i].id, dbTerminos[i].nombre, dbTerminos[i].codigo, dbTerminos[i].idProvincia, !isNullOrUndefined(dbTerminos[i].nombreProvincia)?'/'+dbTerminos[i].nombreProvincia:'');
                  this.terminos.push(termino);
                }
                this.terminosSolicitados.set(filtro.filtro, this.terminos);
                return this.terminos;
              }),
              catchError(ComboDataService.handleError)
            );
          } else {
            this.terminos = this.terminosSolicitados.get(filtro.filtro);
            return Observable.create(obj => {
              obj.next(this.terminos);
              obj.complete();
            });
          }
        }
      }

      case 3: {
        this.localidades = [];
        if (filtro.idPadre != null) {
          for (let i in this.terminos) {
            if (this.terminos[i].id == filtro.idPadre) {
              for (let j in this.terminos[i].localidades) {
                if (this.terminos[i].localidades[j].nombre.toUpperCase().indexOf(filtro.filtro.toUpperCase()) != -1) {
                  this.localidades.push(this.terminos[i].localidades[j]);
                }
              }
            }
          }
          return Observable.create(obj => {
            obj.next(this.localidades);
            obj.complete();
          });
        } else {
          if (isNullOrUndefined(this.localidadesSolicitadas.get(filtro.filtro))) {
            return this.http.get(this.urlLocalidades + '?nombre_like=' + filtro.filtro).pipe(
              map(dbLocalidades => {
                for (let i in dbLocalidades) {
                  let localidad: Localidad = new Localidad(dbLocalidades[i].id, dbLocalidades[i].nombre, dbLocalidades[i].idTermino, dbLocalidades[i].idProvincia);
                  this.localidades.push(localidad);
                }
                this.localidadesSolicitadas.set(filtro.filtro, this.localidades);
                return this.localidades;
              }),
              catchError(ComboDataService.handleError)
            );
          } else {
            this.localidades = this.localidadesSolicitadas.get(filtro.filtro);
            return Observable.create(obj => {
              obj.next(this.localidades);
              obj.complete();
            });
          }
        }
      }
    }
  }

  private static handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
