import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  alumno: any={};
  curso: any = {};
  cursos:any=[];
  cargar:boolean=false;
  private urlAPI="http://localhost:3030/curso/buscar";
  public idcurso=this.cursos.idcurso;
  constructor(private http:HttpClient) {
    let temporal: string = localStorage.getItem('alumno');
    if(temporal){
      this.alumno = JSON.parse(temporal);
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
    this.cursos=response;
  }
  buscarProfesoresServicio():Observable<any>{
    return this.http.get<any>(this.urlAPI).pipe(
      catchError(e=>"error")
    )
      }

      asignarse(curso:any):void{
        localStorage.setItem("id",curso.idcurso);
        localStorage.setItem("nombrecurso",curso.nombre);
        location.href="/tabs/tab6";
        
      }
}
