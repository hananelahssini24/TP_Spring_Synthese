import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  idPaiment! : number;
  pdfFileUrl! : any;

  constructor(private activate : ActivatedRoute,private studentService : StudentsService) {

  }
  ngOnInit() {
    this.idPaiment=this.activate.snapshot.params['id']
    this.studentService.getPaymentsDetails(this.idPaiment).subscribe({
      next : value => {
        let blob =new Blob([value],{type : 'application/pdf'});
        this.pdfFileUrl =window.URL.createObjectURL(blob);

      },
      error : err => {

      }
    })
  }

  afterLoadComplete($event: any) {
    console.log($event);

  }
}
