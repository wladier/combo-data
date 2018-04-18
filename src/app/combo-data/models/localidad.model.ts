export class Localidad {
  private _id: number;
  private _nombre: string;
  private _idTermino: number;
  private _idProvincia: number;

  constructor(id: number, nombre: string, idTermino: number, idProvincia: number) {
    this._id = id;
    this._nombre = nombre;
    this._idTermino = idTermino;
    this._idProvincia = idProvincia;
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

  get idTermino(): number {
    return this._idTermino;
  }

  set idTermino(value: number) {
    this._idTermino = value;
  }

  get idProvincia(): number {
    return this._idProvincia;
  }

  set idProvincia(value: number) {
    this._idProvincia = value;
  }
}
