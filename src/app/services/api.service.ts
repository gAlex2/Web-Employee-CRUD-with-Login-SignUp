import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL = "http://localhost:3000/employees"

  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post(this.apiURL, data)
    .pipe(map((res) => {
      return res
    }))
  }

  getEmployee() {
    return this.http.get(this.apiURL)
    .pipe(map((res) => {
      return res
    }))
  }

  updateEmployee(data: any, id: number) {
    return this.http.put(`${this.apiURL}/${id}`, data)
    .pipe(map((res) => {
      return res
    }))
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`)
    .pipe(map((res) => {
      return res
    }))
  }
}
