package com.playback.Controllers;


import com.playback.Models.MediaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.playback.Repositories.MediaRepository;

import java.util.List;

@RestController
@RequestMapping("/media")
@CrossOrigin(origins = "*")
public class MediaController {

    @Autowired
    private final MediaRepository mediaRepository;


    public MediaController(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    @GetMapping
    public List<MediaModel> getAllMedia() {
        return mediaRepository.findAll();
    }

    @GetMapping("/{id}")
    public MediaModel getMediaById(@PathVariable("id") Long id) {
        return mediaRepository.findById(id).orElse(null);
    }

    @PostMapping
    public MediaModel createMedia(@RequestBody MediaModel media) {
        return mediaRepository.save(media);
    }

    @PutMapping("/{id}")
    public MediaModel updateMedia(@PathVariable("id") Long id, @RequestBody MediaModel mediaDetails) {
        MediaModel media = mediaRepository.findById(id).orElse(null);
        if (media != null) {
            media.setTitle(mediaDetails.getTitle());
            media.setType(mediaDetails.getType());
            media.setListType(mediaDetails.getListType());
            return mediaRepository.save(media);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteMedia(@PathVariable("id") Long id) {
        mediaRepository.deleteById(id);
        return "Media with id " + id + " has been deleted.";
    }
}
