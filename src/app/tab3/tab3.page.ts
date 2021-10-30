/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable, ObservedValueOf } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  alumno: any={};
  nota:any = {};
  notas:any=[];
  cargar:boolean=false;
  private urlAPI="http://localhost:3030/nota/buscar/por/";
  constructor(private http: HttpClient) {
    let temporal: string = localStorage.getItem('alumno');
    if(temporal){
      this.alumno = JSON.parse(temporal);
    }
    let temporal2:string = localStorage.getItem('nota');
    if(temporal2){
      this.nota = JSON.parse(temporal2);
    }
    this.buscarProfesores();
  }

  buscarProfesores(){
    this.cargar=true; 
    this.buscarProfesoresServicio().subscribe(
      (response:any) => this.mostrarProfesores(response)
     
    )
   }

   mostrarProfesores(response:any){
    this.cargar=false;
    console.log(response)
    this.notas=response;
  }
  buscarProfesoresServicio():Observable<any>{
    return this.http.get<any>(this.urlAPI+this.alumno.idalumno).pipe(
      catchError(e=>"error")
    )
      }

      Desasignarse(nota:any):void{
        this.eliminarProfesoresServicio(nota.idnota).subscribe(
          (response:any) => this.buscarProfesores()
        )
      }
      eliminarProfesoresServicio(id:any):Observable<any>{
        return this.http.delete<any>("http://localhost:3030/nota/eliminar/"+id).pipe(
          catchError(e=>"error")
        )
      }
}