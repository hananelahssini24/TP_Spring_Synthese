import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {Student} from "../model/students.model";
import {MatTableDataSource} from "@angular/material/table";
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  public students:any;
  public dataSource:any;
  public displayedColumns=['id','firstName','lastName','code','programId','payments'];
  constructor(private studentsService:StudentsService,private router:Router) {
  }
  ngOnInit(): void {
    this.studentsService.getAllStudents()
    .subscribe({
      next:data=>{
        this.students=data;
        this.dataSource=new MatTableDataSource(this.students);
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  studentPayments(student:Student){
    this.router.navigateByUrl(`/admin/student-details/${student.code}`);
  }




  
}
