package com.linde.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.linde.constants.RouteStatusEnum;
import com.linde.constants.TripFlagEnum;
import com.linde.dto.BusRouteDTO;
import com.linde.dto.BusStationDTO;
import com.linde.service.BusRouteService;
import com.linde.service.BusStationService;
import com.linde.web.rest.resource.BusRouteResource;
import com.linde.web.rest.resource.TripFlagResource;
import com.linde.web.rest.resourceassembler.BusRouteResourceAssembler;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Comparator.comparing;

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
    private BusStationService busStationService;

    @Inject
    private BusRouteResourceAssembler busRouteResourceAssembler;

    @RequestMapping(value = "/busroute/all",
            method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_ATOM_XML_VALUE})
    @Timed
    public ResponseEntity<List<BusRouteResource>> getAllBusRoute() {
        List<BusRouteDTO> us = busRouteService.findAll();

        List<BusRouteResource> res = us.stream().map(n -> busRouteResourceAssembler.toResource(n))
                .sorted(comparing(BusRouteResource::getSequence))
                .collect(Collectors.toList());

        for(BusRouteResource br : res) {
            if(br.getOppRouteId() != null) {
                BusRouteDTO oppRouteDTO = busRouteService.findById(br.getRouteId());
                if(oppRouteDTO != null) {
                    br.setOppRoute(busRouteResourceAssembler.toResource(oppRouteDTO));
                }
            }
        }
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping(value = "/busroute/all/{status}",
            method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_ATOM_XML_VALUE})
    @Timed
    public ResponseEntity<List<BusRouteResource>> getAllBusRoute(@PathVariable String status) {
        List<BusRouteDTO> us = busRouteService.findAllByStatus(Enum.valueOf(RouteStatusEnum.class, status));
        List<BusRouteResource> res = us.stream().map(n -> busRouteResourceAssembler.toResource(n))
                .sorted(comparing(BusRouteResource::getSequence))
                .collect(Collectors.toList());
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @RequestMapping(value = "/busroute/one/{routeId}",
            method = RequestMethod.GET,
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_ATOM_XML_VALUE})
    @Timed
    public ResponseEntity<BusRouteResource> findBusRouteById(@PathVariable String routeId) {
        BusRouteDTO us = busRouteService.findById(routeId);
        busRouteResourceAssembler.toResource(us);
        return new ResponseEntity<>(busRouteResourceAssembler.toResource(us), HttpStatus.OK);
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
        List<BusStationDTO> stations = busRouteService.findById(busRouteResource.getRouteId()).getStations();

        busRouteDTO.setStations(stations.stream().map(n -> {
            n.setTripFlag(busRouteDTO.getTripFlag());
            return n;
        }).collect(Collectors.toList()));
        if(!busRouteDTO.getId().equals(busRouteDTO.getOppRouteId())) {
            BusRouteDTO newBusRoute = busRouteService.saveBusRoute(busRouteDTO);
            BusRouteResource newBusRouteRes = busRouteResourceAssembler.toResource(newBusRoute);
            return new ResponseEntity<>(newBusRouteRes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }

    }

    @RequestMapping(value = "/busroute/find/{stationId}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    @Timed
    public ResponseEntity<List<BusRouteResource>> findRoutesByStationIds(@PathVariable String stationId) throws Exception {
        LOG.debug("To Create new Bus Route" + stationId);
        List<BusRouteDTO> allActiveBusRoutes = busRouteService.findAllByStatus(RouteStatusEnum.ACTIVE);
        List<BusRouteResource> result = allActiveBusRoutes.stream().filter(n -> n.getStations().contains(new BusStationDTO(stationId)))
                .map(n -> busRouteResourceAssembler.toResource(n)).collect(Collectors.toList());
        for (int i = 0; i < allActiveBusRoutes.size(); i++) {
            List<BusStationDTO> stations = allActiveBusRoutes.get(i).getStations();
            if (stationId.equals(stations.get(stations.size() - 1).getId())) {
                result.remove(i);
            }
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value = "/tripflag/find", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    @Timed
    public ResponseEntity<List<TripFlagResource>> findTripFlagValues() throws Exception {
        return new ResponseEntity<>(TripFlagEnum.getTripFlagResoures(), HttpStatus.OK);
    }
}
