import {MatDialog} from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '../app/services/employee.service';
import { OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns : string[] = ["id","firstName","lastName","email","dob","education","company","salary","experience","action"];
  dataSource! :MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog,private empService: EmployeeService) {

   }
    ngOnInit(): void {
      this.getEmployee();
    }
   
   openFormDialog() {
    this.dialog.open(EmpAddEditComponent);
  }
  getEmployee(){
    this.empService.showEmployee().subscribe({
      next: data => {
        // console.log(data);
        this.dataSource = new MatTableDataSource(data);
        console.log(this.dataSource);

        this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
deleteEmployee(id:any){
  this.empService.deleteEmployee(id).subscribe({
    next: data => {
      console.log(data);
      this.getEmployee();
    },
    error: error => {
      console.error('There was an error!', error);
    }
  })
}
editEmployee(id:any){
  this.dialog.open(EmpAddEditComponent, {
    data: {id: id}
  });
}
}
