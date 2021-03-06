/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import {Observable, ObservedValueOf } from 'rxjs';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  alumno: any={};
  alumnos: any=[];
  crearUsuario: boolean=true;
  constructor(private http: HttpClient) {
    let temporal: string = localStorage.getItem('alumno');
    if(temporal){
      this.alumno = JSON.parse(temporal);
    }
  }

  crear(){
   if(this.alumno.idalumno&&this.alumno.carne&&this.alumno.nombre&&this.alumno.apellido&&this.alumno.contrasena){
    this.servicioGuardar().subscribe(
      (response: any) => this.confirmar(response)
    );
   }else{
     console.log("Error");
   }
   console.log(this.alumno)
  }


  confirmar(res: any){
      alert('Contraseña actualizada exitosamente '+res.idalumno);
      localStorage.setItem('alumno',JSON.stringify(res));
      location.href='/tabs/tab4';
  }

  servicioGuardar() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(
        'http://localhost:3030/alumno/guardar',
        this.alumno,httpOptions
      )
      .pipe(catchError((e) => 'error'));
  }

}
