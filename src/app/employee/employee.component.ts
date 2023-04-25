import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  formValue!: FormGroup
  employeeModelObj: EmployeeModel = new EmployeeModel()
  employee: any
  showAdd!: boolean
  showEdit!: boolean

  constructor(private formBuilder: FormBuilder, private api: ApiService) {

  }

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      mobile: [""],
      salary: [""]
    })

    this.getEmployees()
  }

  getEmployees() {
    this.api.getEmployee().subscribe((response) => {
      this.employee = response
    })
  }

  clickAddBtn() {
    this.formValue.reset()
    this.showAdd = true
    this.showEdit = false
  }

  clickEditBtn(employee: any) {
    this.showAdd = false
    this.showEdit = true

    this.employeeModelObj.id = employee.id
    this.formValue.controls["firstName"].setValue(employee.firstName)
    this.formValue.controls["lastName"].setValue(employee.lastName)
    this.formValue.controls["email"].setValue(employee.email)
    this.formValue.controls["mobile"].setValue(employee.mobile)
    this.formValue.controls["salary"].setValue(employee.salary)
  }

  clickDeletelBtn(id: number) {
    this.api.deleteEmployee(id).subscribe((response) => {
      this.getEmployees()
    })
  }

  addEmployee() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe((response) => {
      console.log(response)
      let closeBtn = document.getElementById("close")
      closeBtn!.click()
      this.formValue.reset()
      this.getEmployees()
    },
    (err) => {
      console.log("Error")
    })
  }

  editEmployee() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe((response) => {
      let closeBtn = document.getElementById("close")
      closeBtn!.click()
      this.formValue.reset()
      this.getEmployees()
    })
  }
}
