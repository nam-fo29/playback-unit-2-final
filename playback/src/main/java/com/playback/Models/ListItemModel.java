package com.playback.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name= "list_items")
public class ListItemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "list_id", nullable = false)
    @JsonBackReference
    private ListModel list;

    @ManyToOne
    @JoinColumn(name = "media_id", nullable = false)
    private MediaModel media;

    public ListItemModel() {
    }

    public ListItemModel(ListModel list, MediaModel media) {
        this.list = list;
        this.media = media;
    }

    public Long getId() {
        return id;
    }

    public ListModel getList() {
        return list;
    }

    public void setList(ListModel list) {
        this.list = list;
    }

    public MediaModel getMedia() {
        return media;
    }

    public void setMedia(MediaModel media) {
        this.media = media;
    }
}
