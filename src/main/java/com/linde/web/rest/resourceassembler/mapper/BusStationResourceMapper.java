package com.linde.web.rest.resourceassembler.mapper;

import com.linde.dto.BusStationDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.linde.web.rest.resource.BusStationResource;

/**
 * Created by cn40580 at 2016-10-10 10:06 AM.
 */
@Mapper
public interface BusStationResourceMapper {

    @Mappings({
            @Mapping(source = "id", target = "stationId"),
            @Mapping(target = "links", ignore = true),
            @Mapping(target = "busRouteId", ignore = true)
    })
    BusStationResource DTOtoResource(BusStationDTO entity);

    @Mappings({
            @Mapping(source = "stationId", target = "id"),
            @Mapping(target = "busRoute", ignore = true)
    })
    BusStationDTO ResourceToDTO(BusStationResource entity);
}
