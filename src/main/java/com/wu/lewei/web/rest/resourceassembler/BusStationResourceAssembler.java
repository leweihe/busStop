package com.wu.lewei.web.rest.resourceassembler;

import javax.validation.constraints.NotNull;

import org.springframework.hateoas.ResourceAssembler;

import com.wu.lewei.dto.BusStationDTO;
import com.wu.lewei.web.rest.resource.BusStationResource;

/**
 * Created by cn40580 at 2016-10-10.
 */
public interface BusStationResourceAssembler extends ResourceAssembler<BusStationDTO, BusStationResource> {

    public BusStationResource toResource(@NotNull BusStationDTO entity);
}
