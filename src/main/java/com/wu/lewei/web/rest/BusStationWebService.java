package com.wu.lewei.web.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;
import com.wu.lewei.dto.BusStationDTO;
import com.wu.lewei.service.BusStationService;
import com.wu.lewei.web.rest.resource.BusStationResource;
import com.wu.lewei.web.rest.resourceassembler.BusStationResourceAssembler;

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

    @RequestMapping(value = "/busstation/:routeId",
            method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_ATOM_XML_VALUE})
    @Timed
    public ResponseEntity<List<BusStationResource>> getAllBusStationsByRouteId(@PathVariable String routeId) {
        List<BusStationDTO> us = busStationService.findStationsByRouteId(routeId);
        List<BusStationResource> res = us.stream().map(n -> busStationResourceAssembler.toResource(n)).collect(Collectors.toList());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
