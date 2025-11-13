package com.playback.Repositories;

import com.playback.Models.MediaModel;
import com.playback.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MediaRepository extends JpaRepository<MediaModel, Long> {

    Optional<MediaModel> findByIdAndUser(Long id, UserModel user);

    List<MediaModel> findByUser(UserModel user);

    List<MediaModel> findByUserUsername(String username);

    List<MediaModel> findByUserUsernameAndListType(String username, String listType);

}
