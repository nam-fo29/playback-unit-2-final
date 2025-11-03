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
@RequestMapping("/api/lists")
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

    @GetMapping("/name/{name}")
    public ListModel getListByName(@PathVariable("name") String name) {
        return listRepository.findByName(name).orElse(null);
    }

    @PostMapping
    public ListModel createList(@RequestBody ListModel list) {
        return listRepository.save(list);
    }

    @DeleteMapping("/{name}/remove/{mediaId}")
    public String removeMediaFromList(@PathVariable String name, @PathVariable Long mediaId) {
        ListModel list = listRepository.findByName(name).orElse(null);

        listItemRepository.findAll().stream()
                .filter(i -> i.getList().equals(list) && i.getMedia().getId().equals(mediaId))
                .findFirst()
                .ifPresent(listItemRepository::delete);
        return "Media removed from " + list.getName();
    }
}
