package com.linde.web.rest.resourceassembler.impl;

import com.linde.web.rest.resourceassembler.UserResourceAssembler;
import com.linde.web.rest.resourceassembler.mapper.UserResourceMapper;
import com.linde.dto.UserDTO;
import com.linde.web.rest.resource.UserResource;
import org.apache.commons.lang.Validate;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.validation.constraints.NotNull;

/**
 * Created by cn40580 at 2016-10-10 10:06 AM.
 */
@Component
public class UserResourceAssemblerMapperImpl implements UserResourceAssembler {
    @Inject
    private UserResourceMapper userResourceMapper;

    @Override
    public UserResource toResource(@NotNull UserDTO entity) {
        Validate.notNull(entity);
        UserResource res = userResourceMapper.DTOtoResource(entity);

        return res;
    }
}
