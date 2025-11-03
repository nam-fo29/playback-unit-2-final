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
    private ListRepository listRepository;

    @Autowired
    private ListItemRepository listItemRepository;

    @Autowired
    private MediaRepository mediaRepository;

    @GetMapping
    public List<ListModel> getAllLists() {
        return listRepository.findAll();
    }

    @GetMapping("/{name}")
    public ListModel getListByName(String name) {
        return listRepository.findByName(name).orElse(null);
    }

    @PostMapping("/{name}/add/{mediaId}")
    public String addMediaToList(@PathVariable("name") String name, @PathVariable("mediaId") Long mediaId) {
        ListModel list = listRepository.findByName(name).orElse(null);
        MediaModel media = mediaRepository.findById(mediaId).orElse(null);

        ListItemModel item = new ListItemModel(list, media);
        listItemRepository.save(item);

        return media.getTitle() + "added to " + list.getName();
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
