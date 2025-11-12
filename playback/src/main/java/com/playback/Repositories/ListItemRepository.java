/*package com.playback.Repositories;

import com.playback.Models.ListItemModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ListItemRepository extends JpaRepository<ListItemModel, Long> {

    Optional<ListItemModel> findByList_IdAndMedia_Id(Long listId, Long mediaId);

    boolean existsByList_IdAndMedia_Id(Long listId, Long mediaId);

    List<ListItemModel> findByListId(Long id);
}*/

