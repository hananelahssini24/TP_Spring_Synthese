import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { PaymentType } from '../model/students.model';
import { StudentsService } from '../services/students.service';

@Component({
  selector: 'app-new-payment',
  templateUrl: './new-payment.component.html',
  styleUrl: './new-payment.component.css'
})
export class NewPaymentComponent implements OnInit{
  paymentFormGroup!:FormGroup;
  studentCode!:string;
  paymentTypes:string[]=[];
  pdfFileUrl!:string;
  constructor(private  fb:FormBuilder,private activatedRoute:ActivatedRoute,private studentsService:StudentsService) {
  }
  ngOnInit() {
    for(let elt in PaymentType){
      let value:string=PaymentType[elt];
      if(typeof(value)==='string')
      this.paymentTypes.push(value);
    }
    this.studentCode=this.activatedRoute.snapshot.params['studentCode'];
    this.paymentFormGroup=this.fb.group({
      date:this.fb.control(''),
      amount:this.fb.control(''),
      type:this.fb.control(''),
      studentCode:this.fb.control(this.studentCode),
      fileSource:this.fb.control(''),
      fileName:this.fb.control(''),


    });
  }

  selectFile(event:any){
    if(event.target.files.length>0){
      let file=event.target.files[0];
      this.paymentFormGroup.patchValue({
        fileSource :file,
        fileName:file.name
      });
      this.pdfFileUrl=window.URL.createObjectURL(file);


    }
  }
  savePayment(){
    let date :Date=new Date(this.paymentFormGroup.value.date);
    let formattedDate:string=date.getDate()+"/"+(date.getMonth()+1)+'/'+date.getFullYear();
    let formData :FormData =new FormData();
    formData.set('date',formattedDate);
    formData.set('amount',this.paymentFormGroup.value.amount);
    formData.set('type',this.paymentFormGroup.value.type);
    formData.set('studentCode',this.paymentFormGroup.value.studentCode);
    formData.set('file',this.paymentFormGroup.value.fileSource);
    this.studentsService.savePayment(formData).subscribe({
      next:vaue=>{
        alert('Payment Saved successfuly!');
      },
      error:err=>{
        console.log(err);
      }
    })
  }
}
