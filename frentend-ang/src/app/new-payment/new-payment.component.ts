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
    if(event.taget.files.lenght>0){
      let file=event.taget.files[0];
      this.paymentFormGroup.patchValue({
        fileSource :file,
        fileName:file.name
      });
      this.pdfFileUrl=window.URL.createObjectURL(file);
    }
  }
  savePayment(){
    let formData :FormData =new FormData();
    formData.set('date',this.paymentFormGroup.value.date);
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
