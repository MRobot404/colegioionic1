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
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})
export class Tab6Page {

  nota:any={};
  constructor(private http: HttpClient) {
    let temporal: string = localStorage.getItem('alumno');
    if(temporal){
      this.nota.alumnoIdalumno = JSON.parse(temporal);
      this.nota.alumnoIdalumno = this.nota.alumnoIdalumno.idalumno;
      console.log(this.nota.alumnoIdalumno)
    }
    let id=localStorage.getItem("id");
    this.nota.cursoIdcurso=JSON.parse(id);
    let nombre=localStorage.getItem("nombrecurso");
    this.nota.nombreCurso=nombre;
    console.log(nombre);
  }

  crear(){
      this.servicioGuardar().subscribe(
        (response: any) => this.confirmar(response)
      );
   
   
  }

  confirmar(res: any){
      alert('Asignación creada exitosamente'+res.idnota);
  }

  servicioGuardar() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(
        'http://localhost:3030/nota/guardar',
        this.nota,httpOptions
      )
      .pipe(catchError((e) => 'error'));
  }
}
