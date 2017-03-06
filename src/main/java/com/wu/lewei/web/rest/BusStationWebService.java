package com.wu.lewei.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.wu.lewei.dto.BusRouteDTO;
import com.wu.lewei.dto.BusStationDTO;
import com.wu.lewei.service.BusRouteService;
import com.wu.lewei.service.BusStationService;
import com.wu.lewei.web.rest.resource.BusStationResource;
import com.wu.lewei.web.rest.resourceassembler.BusStationResourceAssembler;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by cn40580 at 2016-10-12 10:21 AM.
 */
@RestController
@RequestMapping("/app/rest")
public class BusStationWebService {

    private static final Log LOG = LogFactory.getLog(BusStationWebService.class);

    @Inject
    private BusStationService busStationService;

    @Inject
    private BusRouteService busRouteService;

    @Inject
    private BusStationResourceAssembler busStationResourceAssembler;

    @RequestMapping(value = "/busstation/all",
            method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_ATOM_XML_VALUE})
    @Timed
    public ResponseEntity<List<BusStationResource>> getAllBusStations() {
        List<BusStationDTO> us = busStationService.findAll();
        List<BusStationResource> res = us.stream().map(n -> busStationResourceAssembler.toResource(n)).collect(Collectors.toList());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping(value = "/busstation/{routeId}",
            method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_ATOM_XML_VALUE})
    @Timed
    public ResponseEntity<List<BusStationResource>> getAllBusStationsByRouteId(@PathVariable String routeId) {
        List<BusStationDTO> us = busStationService.findStationsByRouteId(routeId);
        List<BusStationResource> res = us.stream().map(n -> busStationResourceAssembler.toResource(n)).collect(Collectors.toList());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping(value = "/busstation/remove/{routeId}/{stationId}",
            method = RequestMethod.DELETE, produces = {MediaType.APPLICATION_JSON_VALUE})
    @Timed
    public ResponseEntity<List<BusStationResource>> removeBusStation(@PathVariable String routeId, @PathVariable String stationId) {
        busStationService.remove(stationId);
        busRouteService.removeStation(routeId, stationId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/busstation/save", method = RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @Timed
    public ResponseEntity<BusStationResource> saveBusStation(@RequestBody BusStationResource busStationResource) throws Exception {
        LOG.debug("To Create new Bus Station" + busStationResource);
        BusStationDTO busStationDTO = busStationResourceAssembler.toDTO(busStationResource);
        BusRouteDTO busRouteDTO = busRouteService.findById(busStationResource.getBusRouteId());

        BusStationDTO newBusStation = busStationService.saveBusStation(busStationDTO);
        busRouteDTO.getStations().add(newBusStation);
        busRouteService.saveBusRoute(busRouteDTO);
        BusStationResource newBusStationRes = busStationResourceAssembler.toResource(newBusStation);
        return new ResponseEntity<>(newBusStationRes, HttpStatus.OK);
    }
}
