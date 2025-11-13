package com.playback.Models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "media")
public class MediaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String type;
    @JsonProperty("list_type")
    private String listType;

    @ManyToOne
    @JoinColumn(name = "username", referencedColumnName = "username", nullable = false)
    private UserModel user;

    public MediaModel() {}

    public MediaModel(String title, String type, UserModel user, String listType) {
        this.title = title;
        this.type = type;
        this.user = user;
        this.listType = listType;
    }


    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public UserModel getUser() { return user; }
    public void setUser(UserModel user) { this.user = user; }
    public String getListType() {return listType;}

    public void setListType(String listType) {
        this.listType = listType;
    }
}
