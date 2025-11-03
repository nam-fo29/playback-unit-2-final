package com.playback.Controllers;


import com.playback.Models.ListItemModel;
import com.playback.Repositories.ListItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ListItemModel createListItem(@RequestBody ListItemModel item) {
        return listItemRepository.save(item);
    }

    @PutMapping("/{id}")
    public ListItemModel updateListItem(@PathVariable("id") Long id, @RequestBody ListItemModel itemDetails) {
        ListItemModel listItem = listItemRepository.findById(id).orElse(null);
        if (listItem != null) {
            listItem.setList(itemDetails.getList());
            listItem.setMedia(itemDetails.getMedia());
            return listItemRepository.save(listItem);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteListItem(@PathVariable("id") Long id) {
        listItemRepository.deleteById(id);
        return "ListItem with id " + id + " has been deleted.";
    }

}
