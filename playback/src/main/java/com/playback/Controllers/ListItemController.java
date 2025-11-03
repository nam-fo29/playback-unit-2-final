package com.playback.Controllers;


import com.playback.Models.ListItemModel;
import com.playback.Repositories.ListItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class ListItemController {

    @Autowired
    private final ListItemRepository listItemRepository;

    public ListItemController(ListItemRepository listItemRepository) {
        this.listItemRepository = listItemRepository;
    }

    @GetMapping
    public List<ListItemModel> getAllListItems() {
        return listItemRepository.findAll();
    }
}
