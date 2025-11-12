/*package com.playback.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.playback.Models.MediaModel;

@Repository
public interface MediaRepository extends JpaRepository<MediaModel, Long> {
}
*/

package com.playback.Repositories;

import com.playback.Models.MediaModel;
import com.playback.Models.ListModel;
import com.playback.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MediaRepository extends JpaRepository<MediaModel, Long> {
    /*List<MediaModel> findByUserAndList(UserModel user, ListModel list);*/
    Optional<MediaModel> findByIdAndUser(Long id, UserModel user);

    List<MediaModel> findByUser(UserModel user);

    List<MediaModel> findByUserUsername(String username);

    List<MediaModel> findByUserUsernameAndListType(String username, String listType);

}
