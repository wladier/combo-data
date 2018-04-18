import {Localidad} from './localidad.model';

export class Termino {
  private _id: number;
  private _nombre: string;
  private _codigo: string;
  private _idProvincia: number;
  private _nombreProvincia?: string;
  private _localidades: Localidad[];

  constructor(id: number, nombre: string, codigo: string, idProvincia: number, nombreProvincia?: string) {
    this._id = id;
    this._nombre = nombre;
    this._codigo = codigo;
    this._idProvincia = idProvincia;
    this._nombreProvincia = nombreProvincia;
    this._localidades = [];
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    this._nombre = value;
  }

  get codigo(): string {
    return this._codigo;
  }

  set codigo(value: string) {
    this._codigo = value;
  }

  get idProvincia(): number {
    return this._idProvincia;
  }

  set idProvincia(value: number) {
    this._idProvincia = value;
  }

  get nombreProvincia(): string {
    return this._nombreProvincia;
  }

  set nombreProvincia(value: string) {
    this._nombreProvincia = value;
  }

  get localidades(): Localidad[] {
    return this._localidades;
  }

  set localidades(value: Localidad[]) {
    this._localidades = value;
  }

  setLocalidades(value: Localidad[]) {
    this._localidades = value;
  }
}
