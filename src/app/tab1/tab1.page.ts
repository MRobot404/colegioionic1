/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, ObservedValueOf } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  alumno: any = {};
  notas: any = [];
  nota: any = {};
  contador:any=0;
  suma:any=0;
  promtotal:any;
  
  cargar: boolean = false;
  private urlAPI = "http://localhost:3030/nota/buscar/por/";
  constructor(private http: HttpClient) {
    let temporal: string = localStorage.getItem('alumno');
    if (temporal) {
      this.alumno = JSON.parse(temporal);
    }
    this.buscarProfesores();
  }

  buscarProfesores() {
    this.cargar = true;
    this.buscarProfesoresServicio().subscribe(
      (response: any) => this.mostrarProfesores(response)

    )
  }

  mostrarProfesores(response: any) {
    this.cargar = false;
    console.log(response)
    this.notas = response;
   

  }
  buscarProfesoresServicio(): Observable<any> {
    return this.http.get<any>(this.urlAPI + this.alumno.idalumno).pipe(
      catchError(e => "error")
    )
  }

  promediototal(){
    this.promtotal=this.suma/this.contador;
  }

  promedio(prom:any){
    this.contador++;
  console.log(this.contador)
   console.log(prom.nota)
   this.suma=this.suma+prom.nota;
   console.log(this.suma)
  }



}
