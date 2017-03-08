package com.linde.web.rest.resourceassembler.impl;

import javax.inject.Inject;
import javax.validation.constraints.NotNull;

import com.linde.web.rest.resourceassembler.mapper.BusRouteResourceMapper;
import org.apache.commons.lang.Validate;
import org.springframework.stereotype.Component;

import com.linde.dto.BusRouteDTO;
import com.linde.web.rest.resource.BusRouteResource;
import com.linde.web.rest.resourceassembler.BusRouteResourceAssembler;

/**
 * Created by cn40580 at 2016-10-10 10:00 AM.
 */
@Component
public class BusRouteAssemblerMapperImpl implements BusRouteResourceAssembler {
    @Inject
    private BusRouteResourceMapper busRouteResourceMapper;

    @Override
    public BusRouteResource toResource(@NotNull BusRouteDTO entity) {
        Validate.notNull(entity);
        BusRouteResource res = busRouteResourceMapper.DTOtoResource(entity);

        return res;
    }

    public BusRouteDTO toDto(@NotNull BusRouteResource res) {
        Validate.notNull(res);
        BusRouteDTO entity = busRouteResourceMapper.resourceToDTO(res);

        return entity;
    }
}
