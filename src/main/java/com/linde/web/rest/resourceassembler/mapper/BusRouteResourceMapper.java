package com.linde.web.rest.resourceassembler.mapper;

import com.linde.dto.BusRouteDTO;
import com.linde.web.rest.resource.BusRouteResource;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

/**
 * Created by cn40580 at 2016-10-10 10:06 AM.
 */
@Mapper
public interface BusRouteResourceMapper {

    @Mappings({
            @Mapping(target = "links", ignore = true),
            @Mapping(source = "id", target = "routeId")
    })
    BusRouteResource DTOtoResource(BusRouteDTO entity);

    @Mappings({
            @Mapping(target = "id", ignore = true)
    })
    BusRouteDTO resourceToDTO(BusRouteResource entity);
}
