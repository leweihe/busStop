package com.wu.lewei.web.rest.resourceassembler;

import com.wu.lewei.dto.UserDTO;
import com.wu.lewei.web.rest.resource.UserResource;
import org.springframework.hateoas.ResourceAssembler;

/**
 * Created by cn40580 at 2016-10-10 10:02 AM.
 */
public interface UserResourceAssembler extends ResourceAssembler<UserDTO, UserResource> {

}
