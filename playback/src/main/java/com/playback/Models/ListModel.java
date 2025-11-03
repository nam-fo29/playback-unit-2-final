package com.playback.Models;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "lists")
public class ListModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy = "lists", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ListItemModel> items;

    public ListModel() {
    }

    public ListModel(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ListItemModel> getItems() {
        return items;
    }

    public void setItems(List<ListItemModel> items) {
        this.items = items;
    }
}
