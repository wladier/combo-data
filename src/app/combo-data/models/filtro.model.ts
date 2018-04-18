export class Filtro {
  private _filtro: string;
  private _idPadre?: number;

  constructor(filtro: string, idPadre: number) {
    this._filtro = filtro;
    this._idPadre = idPadre;
  }

  get filtro(): string {
    return this._filtro;
  }

  set filtro(value: string) {
    this._filtro = value;
  }

  get idPadre(): number {
    return this._idPadre;
  }

  set idPadre(value: number) {
    this._idPadre = value;
  }
}
