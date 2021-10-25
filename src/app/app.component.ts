/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  iniciarSesion = true;
  alumno: any = {};
  usuarioInvalido: boolean=false;
  constructor(private http: HttpClient) {
    let temporal: string = localStorage.getItem('alumno');
    if(temporal){
      this.iniciarSesion=false;
    }
   }
  ingresar() {
    this.servicioLogin().subscribe(
      (respuesta: any) =>
         this.Login(respuesta)

    );
   }
   Login(res: any){
  if(res.length==0 || res=='error'){
    this.usuarioInvalido=true;
  }else{
    localStorage.setItem('alumno',JSON.stringify(res[0]));
    this.iniciarSesion=false;
  }
   }

  servicioLogin() {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(
        'http://localhost:3030/alumno/login',
        this.alumno,
        httpOptions
      )
      .pipe(catchError((e) => 'error'));
  }
}
