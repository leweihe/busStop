package com.wu.lewei.web.rest.resourceassembler.impl;

import javax.inject.Inject;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang.Validate;
import org.springframework.stereotype.Component;

import com.wu.lewei.dto.BusRouteDTO;
import com.wu.lewei.dto.BusStationDTO;
import com.wu.lewei.web.rest.resource.BusRouteResource;
import com.wu.lewei.web.rest.resource.BusStationResource;
import com.wu.lewei.web.rest.resourceassembler.BusRouteResourceAssembler;
import com.wu.lewei.web.rest.resourceassembler.BusStationResourceAssembler;
import com.wu.lewei.web.rest.resourceassembler.mapper.BusRouteResourceMapper;
import com.wu.lewei.web.rest.resourceassembler.mapper.BusStationResourceMapper;

/**
 * Created by cn40580 at 2016-10-10 3:06 PM.
 */
@Component
public class BusStationAssemblerMapperImpl implements BusStationResourceAssembler {
    @Inject
    private BusStationResourceMapper busStationResourceMapper;

    @Override
    public BusStationResource toResource(@NotNull BusStationDTO entity) {
        Validate.notNull(entity);
        BusStationResource res = busStationResourceMapper.DTOtoResource(entity);

        return res;
    }
}
