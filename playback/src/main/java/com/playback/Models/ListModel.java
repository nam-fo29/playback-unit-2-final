package com.playback.Models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "lists")
public class ListModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

   /* @OneToMany(mappedBy = "list", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ListItemModel> items;*/

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

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

    /*public List<ListItemModel> getItems() {
        return items;
    }

    public void setItems(List<ListItemModel> items) {
        this.items = items;
    }*/

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
