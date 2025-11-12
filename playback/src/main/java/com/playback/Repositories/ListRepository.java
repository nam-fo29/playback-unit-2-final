package com.playback.Repositories;

import com.playback.Models.ListModel;
import com.playback.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ListRepository extends JpaRepository<ListModel, Long> {
    Optional<ListModel> findByName(String name);
    List<ListModel> findByUser(UserModel user);
    Optional<ListModel> findByNameAndUserUsername(@Param("name") String name, @Param("username") String username);
}
