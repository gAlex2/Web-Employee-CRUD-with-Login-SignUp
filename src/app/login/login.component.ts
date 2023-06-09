import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup
  apiURL = "http://localhost:3000/users"

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: Router) {

  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  login() {
    this.http.get<any>(this.apiURL).subscribe((response) => {
      const user = response.find((a: any) => {
        return a.email === this.formLogin.value.email && a.password === this.formLogin.value.password
      });

      if(user) {
        this.formLogin.reset()
        this.route.navigate(["employee"])
      } else {
        alert("Error")
      }
    })
  }
}
