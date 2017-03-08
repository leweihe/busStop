package com.linde.web.rest.resourceassembler.impl;

import javax.inject.Inject;
import javax.validation.constraints.NotNull;

import org.apache.commons.lang.Validate;
import org.springframework.stereotype.Component;

import com.linde.dto.BusStationDTO;
import com.linde.web.rest.resource.BusStationResource;
import com.linde.web.rest.resourceassembler.BusStationResourceAssembler;
import com.linde.web.rest.resourceassembler.mapper.BusStationResourceMapper;

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

    @Override
    public BusStationDTO toDTO(@NotNull BusStationResource res) {
        Validate.notNull(res);
        BusStationDTO dto = busStationResourceMapper.ResourceToDTO(res);

        return dto;
    }
}
