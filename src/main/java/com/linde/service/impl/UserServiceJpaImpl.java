package com.linde.service.impl;

import com.linde.repo.UserRepository;
import com.linde.dto.UserDTO;
import com.linde.service.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by cn40580 at 2016-10-10 10:05 AM.
 */
@Component("userService")
public class UserServiceJpaImpl implements UserService {

    private static final Log LOG = LogFactory.getLog(UserServiceJpaImpl.class);

    @Inject
    private UserRepository userRepository;

    public UserDTO findUserByUserName(String name) {
        return userRepository.findByUsername(name);
    }

    @Override
    public List<UserDTO> findAllUsers() {
        return userRepository.findAll();
    }

}
