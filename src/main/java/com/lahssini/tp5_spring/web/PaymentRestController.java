package com.lahssini.tp5_spring.web;

import com.lahssini.tp5_spring.entities.Payment;
import com.lahssini.tp5_spring.entities.PaymentStatus;
import com.lahssini.tp5_spring.entities.PaymentType;
import com.lahssini.tp5_spring.entities.Student;
import com.lahssini.tp5_spring.repository.PaymentRepository;
import com.lahssini.tp5_spring.repository.StudentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PaymentRestController {
    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;
    public PaymentRestController(PaymentRepository paymentRepository,StudentRepository studentRepository){
        this.paymentRepository=paymentRepository;
        this.studentRepository=studentRepository;
    }
    @GetMapping("/payments")
    public List<Payment> allPayments(){
        return paymentRepository.findAll();
    }
    @GetMapping("/students/{code}/payments")
    public List<Payment>paymentsByStudent(@PathVariable String code){
        return paymentRepository.findByStudentCode(code);
    }

    @GetMapping("payments/byStatus")
    public List<Payment>paymentsByStatus(@RequestParam PaymentStatus status){
        return paymentRepository.findByStatus(status);
    }
    @GetMapping("payments/byType")
    public List<Payment>paymentsByType(@RequestParam PaymentType type){
        return paymentRepository.findByType(type);
    }
    @GetMapping("/payments/{id}")
    public Payment getPaymentById(@PathVariable Long id){
        return paymentRepository.findById(id).get();
    }
    @GetMapping("/students")
    public List<Student> allStudents(){
        return studentRepository.findAll();
    }
    @GetMapping("/students/{code}")
    public Student getStudentByCode(@PathVariable String code){
        return studentRepository.findByCode(code);
    }
   // @GetMapping("/studentsByprogramId")
   //public List<Student> getStudentByProgramId(@RequestParam String programId){
     //   return studentRepository.findByProgramId(programId);
    //}
}
