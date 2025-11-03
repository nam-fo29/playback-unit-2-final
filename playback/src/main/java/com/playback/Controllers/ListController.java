package com.playback.Controllers;


import com.playback.Models.ListItemModel;
import com.playback.Models.ListModel;
import com.playback.Models.MediaModel;
import com.playback.Repositories.ListItemRepository;
import com.playback.Repositories.ListRepository;
import com.playback.Repositories.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lists")
@CrossOrigin(origins = "*")
public class ListController {

    @Autowired
    private final ListRepository listRepository;

    @Autowired
    private final ListItemRepository listItemRepository;

    @Autowired
    private final MediaRepository mediaRepository;

    public ListController(ListRepository listRepository, ListItemRepository listItemRepository, MediaRepository mediaRepository) {
        this.listRepository = listRepository;
        this.listItemRepository = listItemRepository;
        this.mediaRepository = mediaRepository;
    }

    @GetMapping
    public List<ListModel> getAllLists() {
        return listRepository.findAll();
    }

    @GetMapping("/{name}")
    public ListModel getListByName(@PathVariable("name") String name) {
        return listRepository.findByName(name).orElse(null);
    }

    @PostMapping
    public ListModel createList(@RequestBody ListModel list) {
        return listRepository.save(list);
    }

    @PutMapping("/{id}")
    public ListModel updateList(@PathVariable("id") Long id, @RequestBody ListModel updatedList) {
        ListModel list = listRepository.findById(id).orElse(null);
        if (list != null) {
            list.setName(updatedList.getName());
            return listRepository.save(list);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteList(@PathVariable("id") Long id) {
        listRepository.deleteById(id);
        return "List with id " + id + " has been deleted.";
    }

    @PostMapping("/{name}/items/{mediaId}")
    public String addMediaToList(@PathVariable("name") String name, @PathVariable("mediaId") Long mediaId) {
        ListModel list = listRepository.findByName(name).orElse(null);
        MediaModel media = mediaRepository.findById(mediaId).orElse(null);
        if (list != null && media != null) {
            ListItemModel listItem = new ListItemModel(list, media);
            listItemRepository.save(listItem);
            return "Media added to list successfully.";
        }
        return "List or Media not found.";
    }

    @DeleteMapping("/{name}/remove/{mediaId}")
    public String removeMediaFromList(@PathVariable("name") String name, @PathVariable("mediaId") Long mediaId) {
        ListModel list = listRepository.findByName(name).orElse(null);
        if (list != null) {
            listItemRepository.findAll().stream()
                    .filter(i -> i.getList().getId().equals(list.getId()) && i.getMedia().getId().equals(mediaId))
                    .findFirst()
                    .ifPresent(listItemRepository::delete);
            return "Media removed from list successfully.";
        }
        return "List not found.";
    }
}
