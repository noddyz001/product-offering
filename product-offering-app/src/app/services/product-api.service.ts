import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Product} from './product';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  apiURL = 'http://localhost:8080/SBS/PM';
  constructor(private http: HttpClient) { }
  
   getProducts(category){
    let header = new HttpHeaders();
    header.append("Content-Type", "application/json");
    header.append("Access-Control-Allow-Origin","*");
    return this.http.get(this.apiURL + '/getProducts/'+category, { headers: header });
  }
  
   
   placeOrder(data:any)
   {
    let header = new HttpHeaders();
    header.append("Content-Type", "application/json");
    header.append("Access-Control-Allow-Origin","*");
     return  this.http.post(this.apiURL+"/placeOrder", data, { headers: header });
   
   }
}
