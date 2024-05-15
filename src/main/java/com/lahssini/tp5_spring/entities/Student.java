package com.lahssini.tp5_spring.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@AllArgsConstructor @NoArgsConstructor @Getter @Setter @ToString @Builder
public class Student {
    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    @Column(unique = true)
    private String code;
    private String programId;
    private String photo;

}
