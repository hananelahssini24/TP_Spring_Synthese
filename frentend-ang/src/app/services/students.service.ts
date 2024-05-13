import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor( private  http:HttpClient) { }
  public getAllPayments(){
    return this.http.get(environment.backendHost+"/payments");
  }
}
