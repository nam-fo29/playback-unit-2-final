package com.playback.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.playback.Models.MediaModel;

@Repository
public interface MediaRepository extends JpaRepository<MediaModel, Long> {
}
