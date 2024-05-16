package com.lahssini.tp5_spring.services;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

import com.lahssini.tp5_spring.dtos.NewPaymentDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.lahssini.tp5_spring.entities.Payment;
import com.lahssini.tp5_spring.entities.PaymentStatus;
import com.lahssini.tp5_spring.entities.PaymentType;
import com.lahssini.tp5_spring.entities.Student;
import com.lahssini.tp5_spring.repository.PaymentRepository;
import com.lahssini.tp5_spring.repository.StudentRepository;
import jakarta.transaction.Transactional;
@Service
@Transactional
public class PaymentService {
    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;
    public PaymentService(StudentRepository studentRepository,PaymentRepository paymentRepository){
        this.paymentRepository=paymentRepository;
        this.studentRepository=studentRepository;
    }
    public Payment savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO)
    throws IOException {
        Path folderPath = Paths.get(System.getProperty("user.home"), "enset-data", "payments");
        if (!Files.exists(folderPath)) {
            Files.createDirectories(folderPath);
        }
        String fileName =UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"), "enset-data", "payments",fileName+".pdf");
        Files.copy(file.getInputStream(),filePath);
       Student student=studentRepository.findByCode(newPaymentDTO.getStudentCode());
        Payment payment=Payment.builder()
        .date(newPaymentDTO.getDate())
        .amount(newPaymentDTO.getAmount())
        .type(newPaymentDTO.getType())
        .student(student)
        .file(filePath.toUri().toString())
        .status(PaymentStatus.CREATED)
        .build();
        return paymentRepository.save(payment);
    }

    public Payment updaPaymentStatus( PaymentStatus status, Long id){
        Payment payment=paymentRepository.findById(id).get();
        payment.setStatus(status);
        return paymentRepository.save(payment);
    }
    public byte[] getPaymentFile( Long paymentId)throws IOException{
        Payment payment=paymentRepository.findById(paymentId).get();
        return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }
}
