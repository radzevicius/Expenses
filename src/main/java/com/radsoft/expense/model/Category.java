package com.radsoft.expense.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
@Table(name = "categories")
public class Category {

    @Id
    private Long id;

    @NonNull
    private String name;

}
