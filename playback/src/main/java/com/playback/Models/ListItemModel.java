package com.playback.Models;

import jakarta.persistence.*;

@Entity
@Table(name= "list_items")
public class ListItemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "list_id", nullable = false)
    private ListModel lists;

    @ManyToOne
    @JoinColumn(name = "media_id", nullable = false)
    private MediaModel media;

    public ListItemModel() {
    }

    public ListItemModel(ListModel list, MediaModel media) {
        this.lists = list;
        this.media = media;
    }

    public Long getId() {
        return id;
    }

    public ListModel getList() {
        return lists;
    }

    public void setList(ListModel list) {
        this.lists = list;
    }

    public MediaModel getMedia() {
        return media;
    }

    public void setMedia(MediaModel media) {
        this.media = media;
    }
}
