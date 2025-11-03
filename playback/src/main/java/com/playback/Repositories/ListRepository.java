package com.playback.Repositories;

import com.playback.Models.ListModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ListRepository extends JpaRepository<ListModel, Long> {
    Optional<ListModel> findByName(String name);
}
