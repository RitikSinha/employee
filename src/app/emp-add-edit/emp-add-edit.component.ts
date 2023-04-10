import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  constructor(private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    ) { 
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
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  education = [
    "High School",
    "College",
    "Graduate",
    "Post Graduate"
  ];
  onFormSubmit(){
    if(this.data){
      this.empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
        next: data => {
          console.log(data);
          this.coreService.openSnackBar("Employee Updated Successfully","ok");
          this.dialogRef.close(true);
        },
        error: error => {
          console.error('There was an error!', error);
        }
        
      });
      return;
    }else{
      this.empService.addEmployee(this.empForm.value).subscribe({
        next: data => {
          console.log(data);
          this.coreService.openSnackBar("Employee Added Successfully","ok");
          this.dialogRef.close(true);
        },
        error: error => {
          console.error('There was an error!', error);
        }
        
      });
    }
    
  }
}
