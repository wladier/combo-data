import { Termino } from "./termino.model";

export class Provincia {
  private _id: number;
  private _nombre: string;
  private _codigo: string;
  private _terminos: Termino[];

  constructor(id: number, nombre: string, codigo: string) {
    this._id = id;
    this._nombre = nombre;
    this._codigo = codigo;
    this._terminos = [];
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

  get terminos(): Termino[] {
    return this._terminos;
  }

  set terminos(value: Termino[]) {
    this._terminos = value;
  }

   setTerminos(value: Termino[]) {
    this._terminos = value;
  }
}
