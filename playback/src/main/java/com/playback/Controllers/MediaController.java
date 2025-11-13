package com.playback.Controllers;

import com.playback.Models.MediaModel;
import com.playback.Models.UserModel;
import com.playback.Repositories.MediaRepository;
import com.playback.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/media")
@CrossOrigin(origins = "*")
public class MediaController {

    private final MediaRepository mediaRepository;
    private final UserRepository userRepository;

    @Autowired
    public MediaController(MediaRepository mediaRepository, UserRepository userRepository) {
        this.mediaRepository = mediaRepository;
        this.userRepository = userRepository;
    }


    @GetMapping
    public List<MediaModel> getUserMedia(@RequestParam(required = false) String listType, Principal principal) {
        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) return List.of();

        return mediaRepository.findByUserUsername(currentUser.getUsername());
    }

    @GetMapping("/list/{listType}")
    public List<MediaModel> getMediaByListType(@PathVariable String listType, Principal principal) {
        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) return List.of();

        return mediaRepository.findByUserUsernameAndListType(currentUser.getUsername(), listType);
    }

    @GetMapping("/{id}")
    public MediaModel getMediaById(@PathVariable Long id, Principal principal) {
        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) return null;

        return mediaRepository.findByIdAndUser(id, currentUser).orElse(null);
    }

    @PostMapping
    public MediaModel createMedia(@RequestBody MediaModel media, Principal principal) {
        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) return null;

        media.setUser(currentUser);

        if (media.getListType() == null ||
                (!media.getListType().equals("rewind") && !media.getListType().equals("upNext"))) {
            media.setListType("rewind");
        }
        return mediaRepository.save(media);
    }

    @PutMapping("/{id}")
    public MediaModel updateMedia(@PathVariable Long id, @RequestBody MediaModel mediaDetails, Principal principal) {
        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) return null;

        return mediaRepository.findByIdAndUser(id, currentUser)
                .map(media -> {
                    media.setListType(mediaDetails.getListType());
                    return mediaRepository.save(media);
                })
                .orElse(null);
    }

    @DeleteMapping("/{id}")
    public String deleteMedia(@PathVariable Long id, Principal principal) {
        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) return "User not found";

        return mediaRepository.findByIdAndUser(id, currentUser)
                .map(media -> {
                    mediaRepository.delete(media);
                    return "Media with id " + id + " has been deleted.";
                })
                .orElse("Media not found or not authorized");
    }
}
