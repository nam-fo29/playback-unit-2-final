/*package com.playback.Controllers;


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
*/
/*



package com.playback.Controllers;

/*import com.playback.Models.ListItemModel;
import com.playback.Models.ListModel;
import com.playback.Models.UserModel;
/*import com.playback.Repositories.ListItemRepository;
import com.playback.Repositories.ListRepository;
import com.playback.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/listitems")
public class ListItemController {

   @Autowired
    private ListItemRepository listItemRepository;

    @Autowired
    private ListRepository listRepository;

    @Autowired
    private UserRepository userRepository;*/
/*
    // ---------------------------------------------------------------
    // GET all items in a specific list
    // ---------------------------------------------------------------
    @GetMapping("/{listName}")
    public ResponseEntity<?> getListItems(@PathVariable("listName") String listName,
                                          Principal principal) {
        // Find the current user
        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        // Find the user's list by name
        Optional<ListModel> listOpt = listRepository.findByNameAndUserUsername(listName, currentUser.getUsername());
        if (listOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("List not found");
        }
        return ResponseEntity.ok(items);

        // Fetch list items
        /*List<ListItemModel> items = listItemRepository.findByListId(listOpt.get().getId());
        return ResponseEntity.ok(items);*/
    /*}

    // ---------------------------------------------------------------
    // POST - Add a media item to a list
    // ----------------------------------------------------------
    /*
    @PostMapping("/{listName}/add")
    public ResponseEntity<String> addMediaToList(@PathVariable("listName") String listName,
                                                 @RequestBody ListItemModel listItem,
                                                 Principal principal) {

        // Step 1: Find current user
        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        // Step 2: Find the user's list
        Optional<ListModel> listOpt = listRepository.findByNameAndUserUsername(listName, currentUser.getUsername());
        if (listOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("List not found");
        }

        ListModel list = listOpt.get();

        // Step 3: Check if this item already exists in the list
        boolean exists = listItemRepository.existsByList_IdAndMedia_Id(list.getId(), listItem.getMediaId());
        if (exists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Media already exists in this list");
        }

        // Step 4: Save the new list item
        listItem.setList(list);
        listItemRepository.save(listItem);

        return ResponseEntity.ok("Media added to " + listName);
    }*/

    // ---------------------------------------------------------------
    // DELETE - Remove a media item from a list
    // ---------------------------------------------------------------
   /* @DeleteMapping("/{listName}/remove/{mediaId}")
    public ResponseEntity<String> removeMediaFromList(@PathVariable("listName") String listName,
                                                      @PathVariable("mediaId") Long mediaId,
                                                      Principal principal) {

        // Step 1: Find current user
        UserModel currentUser = userRepository.findByUsername(principal.getName()).orElse(null);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        // Step 2: Find the user's list (e.g. "Rewind" or "Up Next")
        Optional<ListModel> listOpt = listRepository.findByNameAndUserUsername(listName, currentUser.getUsername());
        if (listOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("List not found");
        }

        ListModel list = listOpt.get();

        // Step 3: Find the specific item in that list
        Optional<ListItemModel> listItemOpt = listItemRepository.findByList_IdAndMedia_Id(list.getId(), mediaId);
        if (listItemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found in this list");
        }

        // Step 4: Delete it
        listItemRepository.delete(listItemOpt.get());
        return ResponseEntity.ok("Media removed from " + listName);
    }
}*/
