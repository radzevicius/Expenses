package com.radsoft.expense.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    private long id;

    private String name;

    private String email;

    @OneToMany
    private Set<Category> category;
}
