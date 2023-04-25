import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup
  apiURL = "http://localhost:3000/users"

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: Router) {

  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      mobile: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  signUp() {
    this.http.post(this.apiURL, this.signUpForm.value).subscribe((response) => {
      console.log(response)
      this.signUpForm.reset()
      this.route.navigate(["employee"])
    })
  }
}
