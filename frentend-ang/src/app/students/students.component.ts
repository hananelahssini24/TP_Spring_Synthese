import {Component, OnInit} from '@angular/core';
import {StudentsService} from "../services/students.service";
import {Student} from "../model/students.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  public students:any;
  public dataSource:any;
  public displayedColumns=['id','firstName','lastName','code','ProgramId'];
  constructor(private studentsService:StudentsService) {
  }
  ngOnInit() {
    this.studentsService.getAllStudents().subscribe({
      next:value => {
        this.students=value;
        this.dataSource=new MatTableDataSource<Student>(this.students);

      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
