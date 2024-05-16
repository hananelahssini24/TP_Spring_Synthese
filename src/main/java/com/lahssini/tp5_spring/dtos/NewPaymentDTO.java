package com.lahssini.tp5_spring.dtos;

import java.time.LocalDate;

import com.lahssini.tp5_spring.entities.PaymentType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class NewPaymentDTO {
    private double amount;
    private PaymentType type;
    private LocalDate date;
    private String studentCode;

    
}
