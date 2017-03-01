package com.wu.lewei.service;

import com.wu.lewei.dto.UserDTO;

import java.util.List;

/**
 * Created by cn40580 at 2016-10-10 10:05 AM.
 */
public interface UserService {

    public UserDTO findUserByUserName(String name);

    public List<UserDTO> findAllUsers();
}
