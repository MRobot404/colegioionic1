/* eslint-disable @typescript-eslint/quotes */
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
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  alumnos: any=[];
  alumno: any={};
  constructor(private http: HttpClient) {
    let temporal: string = localStorage.getItem('alumno');
    if(temporal){
      this.alumno = JSON.parse(temporal);
    }
  }

  logout(){
    localStorage.removeItem("alumno");
    location.reload();
  }

}
