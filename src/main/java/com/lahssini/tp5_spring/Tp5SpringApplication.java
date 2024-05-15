package com.lahssini.tp5_spring;

import com.lahssini.tp5_spring.entities.Payment;
import com.lahssini.tp5_spring.entities.PaymentStatus;
import com.lahssini.tp5_spring.entities.PaymentType;
import com.lahssini.tp5_spring.entities.Student;
import com.lahssini.tp5_spring.repository.PaymentRepository;
import com.lahssini.tp5_spring.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class Tp5SpringApplication {
    public static void main(String[] args) {
        SpringApplication.run(Tp5SpringApplication.class, args);
    }
    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository
            , PaymentRepository paymentRepository){
        return args->{
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("Mohamed").code("1234").lastName("Alaoui")
                    .programId("SDIA")
                    .build());
            //2eme
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("Hanane").code("1245").lastName("Lahssini")
                    .programId("BDCC")
                    .build());
            //3eme
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("Jad").code("566").lastName("Safiri")
                    .programId("SDIA")
                    .build());
            //4eme
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("Janat").code("9637").lastName("Lahssini")
                    .programId("SDIA")
                    .build());
            PaymentType[] paymentTypes=PaymentType.values();
            Random random=new Random();
            studentRepository.findAll().forEach(st->{
                for(int i=0;i<10;i++){
                    int index =random.nextInt(paymentTypes.length);
                    Payment payment=Payment.builder()
                            .amount(1000+(int)(Math.random()*20000))
                            .type(paymentTypes[index])
                            .status(PaymentStatus.CREATED)
                            .date(LocalDate.now())
                            .student(st)
                            .build();
                    paymentRepository.save(payment);
                }
            });
        };

    }

}