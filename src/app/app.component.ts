import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}

  /**
   * Add() recebe dois parametros a e b e retorna a soma
   * @param  a parametro numerico
   * @param  b parametro numerico
   * @returns resultado da soma de a  + b
   */

  add(a: number, b: number) {
    return a + b;
  }
}
