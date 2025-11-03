package com.playback.Repositories;

import com.playback.Models.ListItemModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ListItemRepository extends JpaRepository<ListItemModel, Long> {
}
