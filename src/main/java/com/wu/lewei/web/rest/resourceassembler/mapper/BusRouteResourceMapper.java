package com.wu.lewei.web.rest.resourceassembler.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.wu.lewei.dto.BusRouteDTO;
import com.wu.lewei.web.rest.resource.BusRouteResource;

/**
 * Created by cn40580 on 2016-10-10.
 */
@Mapper
public interface BusRouteResourceMapper {

    @Mappings({
            @Mapping(target = "links", ignore = true)
    })
    BusRouteResource DTOtoResource(BusRouteDTO entity);
}
