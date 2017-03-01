package com.wu.lewei.repo;

import com.wu.lewei.dto.UserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by cn40580 at 2016-10-09 10:05 AM.
 */
public interface UserRepository extends MongoRepository<UserDTO, String> {

    UserDTO findByUsername(String username);
}
