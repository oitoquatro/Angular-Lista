import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../assets/enviroments/enviroment'


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }
  getUsers(quantityUsers : string): Observable<any>{
    return this.http.get(`${enviroment.userApiUrl}?results=${quantityUsers}`)
  }
}
