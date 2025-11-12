package com.playback.Controllers;

/*import com.playback.Models.ListItemModel;*/
import com.playback.Models.ListModel;
import com.playback.Models.MediaModel;
import com.playback.Models.UserModel;
/*import com.playback.Repositories.ListItemRepository;*/
import com.playback.Repositories.ListRepository;
import com.playback.Repositories.MediaRepository;
import com.playback.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/lists")
@CrossOrigin(origins = "*")
public class ListController {

    @Autowired
    private final ListRepository listRepository;

    /*@Autowired
    private final ListItemRepository listItemRepository;*/

    @Autowired
    private final MediaRepository mediaRepository;

    @Autowired
    private final UserRepository userRepository;

    public ListController(ListRepository listRepository,
                         /* ListItemRepository listItemRepository,*/
                          MediaRepository mediaRepository,
                          UserRepository userRepository) {
        this.listRepository = listRepository;
        /*this.listItemRepository = listItemRepository;*/
        this.mediaRepository = mediaRepository;
        this.userRepository = userRepository;
    }


    @GetMapping
    public List<ListModel> getAllLists(@AuthenticationPrincipal UserModel currentUser) {
        return listRepository.findByUser(currentUser);
    }


    @GetMapping("/{name}")
    public ListModel getListByName(@PathVariable("name") String name,
                                   @AuthenticationPrincipal UserModel currentUser) {
        return listRepository.findByName(currentUser.getUsername()).orElse(null);
    }


    @PostMapping
    public ListModel createList(@RequestBody ListModel list,
                                @AuthenticationPrincipal UserModel currentUser) {
        list.setUser(currentUser);
        return listRepository.save(list);
    }

    /*
    @PutMapping("/{id}")
    public ListModel updateList(@PathVariable("id") Long id,
                                @RequestBody ListModel updatedList,
                                @AuthenticationPrincipal UserModel currentUser) {
        return listRepository.findById(id)
                .filter(list -> list.getUser().getId().equals(currentUser.getId()))
                .map(list -> {
                    list.setName(updatedList.getName());
                    return listRepository.save(list);
                })
                .orElse(null);
    }*/


    @DeleteMapping("/{id}")
    public String deleteList(@PathVariable("id") Long id,
                             @AuthenticationPrincipal UserModel currentUser) {
        return listRepository.findById(id)
                .filter(list -> list.getUser().getUsername().equals(currentUser.getUsername()))
                .map(list -> {
                    listRepository.delete(list);
                    return "List with id " + id + " has been deleted.";
                })
                .orElse("List not found");
    }

    /*
    @PostMapping("/{name}/items/{mediaId}")
    public String addMediaToList(@PathVariable("name") String name,
                                 @PathVariable("mediaId") Long mediaId,
                                 @AuthenticationPrincipal UserModel currentUser) {

        ListModel list = listRepository.findByNameAndUserId(name, currentUser.getId()).orElse(null);
        if (list == null) return "List not found";

        MediaModel media = mediaRepository.findById(mediaId).orElse(null);
        if (media == null) return "Media not found";

        listItemRepository.save(new ListItemModel(list, media));
        return "Media added to list";
    }


    @DeleteMapping("/{name}/remove/{mediaId}")
    public String removeMediaFromList(@PathVariable("name") String name,
                                      @PathVariable("mediaId") Long mediaId,
                                      @AuthenticationPrincipal UserModel currentUser) {

        ListModel list = listRepository.findByNameAndUserId(name, currentUser.getId()).orElse(null);
        if (list == null) return "List not found";

        listItemRepository.findAll().stream()
                .filter(item -> item.getList().getId().equals(list.getId()) &&
                        item.getMedia().getId().equals(mediaId))
                .findFirst()
                .ifPresent(listItemRepository::delete);

        return "Media removed from list";
    }
}*/

    @PutMapping("/{id}")
    public ListModel updateList(@PathVariable("id") Long id,
                                @RequestBody ListModel updatedList,
                                Principal principal) {

        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) return null;

        return listRepository.findById(id)
                .filter(list -> list.getUser().getUsername().equals(currentUser.getUsername()))
                .map(list -> {
                    list.setName(updatedList.getName());
                    return listRepository.save(list);
                })
                .orElse(null);
    }

    @PostMapping("/{name}/items/{mediaId}")
    public MediaModel addMediaToList(@PathVariable("name") String name,
                                 @PathVariable("mediaId") Long mediaId,
                                 Principal principal) {

        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) return null;

        ListModel list = listRepository.findByName(currentUser.getUsername()).orElse(null);
        if (list == null) return null;

        MediaModel media = mediaRepository.findById(mediaId).orElse(null);
        if (media == null) return null;

        media.setListType(name);
        media.setUser(currentUser);

        return mediaRepository.save(media);


       /* boolean alreadyExists = listItemRepository.existsByList_IdAndMedia_Id(list.getId(), mediaId);
        if (alreadyExists) return "Media already in list";

        listItemRepository.save(new ListItemModel(list, media));
        return "Media added to list";*/
    }

    @DeleteMapping("/{name}/remove/{mediaId}")
    public String removeMediaFromList(@PathVariable("name") String name,
                                      @PathVariable("mediaId") Long mediaId,
                                      Principal principal) {

        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) return "User not found";

        ListModel list = listRepository.findByName(currentUser.getUsername()).orElse(null);
        if (list == null) return "List not found";

        /*listItemRepository.findByList_IdAndMedia_Id(list.getId(), mediaId)
                .ifPresent(listItemRepository::delete);*/

        return "Media removed from list";
    }
}

