package com.linde.web.rest.resourceassembler;

import javax.validation.constraints.NotNull;

import com.linde.dto.BusStationDTO;
import com.linde.web.rest.resource.BusStationResource;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.hateoas.ResourceAssembler;

/**
 * Created by cn40580 at 2016-10-10 10:02 AM.
 */
public interface BusStationResourceAssembler extends ResourceAssembler<BusStationDTO, BusStationResource> {

    @Mappings({
            @Mapping(target = "busRouteId", source = "id"),
    })
    public BusStationResource toResource(@NotNull BusStationDTO entity);

    @Mappings({
            @Mapping(target = "id", source = "busRouteId"),
    })
    public BusStationDTO toDTO(@NotNull BusStationResource res);
}
