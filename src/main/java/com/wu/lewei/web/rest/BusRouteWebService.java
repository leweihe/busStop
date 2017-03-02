package com.wu.lewei.web.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.codahale.metrics.annotation.Timed;
import com.wu.lewei.dto.BusRouteDTO;
import com.wu.lewei.service.BusRouteService;
import com.wu.lewei.web.rest.resource.BusRouteResource;
import com.wu.lewei.web.rest.resourceassembler.BusRouteResourceAssembler;

/**
 * Created by cn40580 at 2016-10-12 10:21 AM.
 */
@RestController
@RequestMapping("/app/rest")
public class BusRouteWebService {

    private static final Log LOG = LogFactory.getLog(BusRouteWebService.class);

    @Inject
    private BusRouteService busRouteService;

    @Inject
    private BusRouteResourceAssembler busRouteResourceAssembler;

    @RequestMapping(value = "/busroute/all",
            method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_ATOM_XML_VALUE})
    @Timed
    public ResponseEntity<List<BusRouteResource>> getAllBusRoute() {
        List<BusRouteDTO> us = busRouteService.findAll();
        List<BusRouteResource> res = us.stream().map(n -> busRouteResourceAssembler.toResource(n)).collect(Collectors.toList());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping(value = "/busroute/remove/{routeId}",
            method = RequestMethod.DELETE)
    @Timed
    public ResponseEntity<List<BusRouteResource>> removeBusRoute(@PathVariable String routeId) {
        busRouteService.remove(routeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/busroute/save", method = RequestMethod.POST,
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @Timed
    public ResponseEntity<BusRouteResource> saveBusRoute(@RequestBody BusRouteResource busRouteResource) throws Exception {
        LOG.debug("To Create new Bus Route" + busRouteResource);
        BusRouteDTO busRouteDTO = busRouteResourceAssembler.toDto(busRouteResource);

        BusRouteDTO newBusRoute = busRouteService.saveBusRoute(busRouteDTO);
        BusRouteResource newBusRouteRes = busRouteResourceAssembler.toResource(newBusRoute);
        return new ResponseEntity<>(newBusRouteRes, HttpStatus.OK);
    }
}
