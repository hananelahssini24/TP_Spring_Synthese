import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import { Payment } from '../model/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit{
  studentCode!:string;
  studentPayments!:Array<Payment>;
  paymentsDataSource!:MatTableDataSource<Payment>
  public displayedColumns=['id','date','amount','type','status','firstName'];
  constructor(private activatedRoute:ActivatedRoute,private studentsService:StudentsService,private router:Router){}
  ngOnInit(): void {
      this.studentCode=this.activatedRoute.snapshot.params['code'];
      this.studentsService.getAllStudentPayments(this.studentCode).subscribe({
        next:value =>{
          this.studentPayments=value;
          this.paymentsDataSource=new MatTableDataSource<Payment>(this.studentPayments);
        },
        error:err=>{
          console.log(err);
        }

      })
  }

  newPayment() {
    this.router.navigateByUrl(`/admin/new-payment/${this.studentCode}`);

  }
}
