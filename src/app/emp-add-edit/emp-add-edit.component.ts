import { Component } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {
  empForm: FormGroup;
  constructor(private fb: FormBuilder,private empService: EmployeeService,private dialogRef: MatDialogRef<EmpAddEditComponent>) { 
    this.empForm = this.fb.group({
      firstName:"",
      lastName:"",
      email:"",
      dob:"",
      gender:"",
      education:"",
      company:"",
      salary:"",
      experience:"",
    });
  }
  education = [
    "High School",
    "College",
    "Graduate",
    "Post Graduate"
  ];
  onFormSubmit(){
    console.log(this.empForm.value);
    this.empService.addEmployee(this.empForm.value).subscribe({
      next: data => {
        console.log(data);
        this.dialogRef.close();
      },
      error: error => {
        console.error('There was an error!', error);
      }
      
    });
  }
}
