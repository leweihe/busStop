package com.wu.lewei.web.rest.resourceassembler.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.wu.lewei.dto.BusRouteDTO;
import com.wu.lewei.dto.BusStationDTO;
import com.wu.lewei.web.rest.resource.BusRouteResource;
import com.wu.lewei.web.rest.resource.BusStationResource;

/**
 * Created by cn40580 at 2016-10-10 10:06 AM.
 */
@Mapper
public interface BusStationResourceMapper {

    @Mappings({
            @Mapping(source = "id", target = "stationId"),
            @Mapping(target = "links", ignore = true)
    })
    BusStationResource DTOtoResource(BusStationDTO entity);
}
