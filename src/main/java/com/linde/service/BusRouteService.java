package com.linde.service;

import java.util.List;

import com.linde.dto.BusRouteDTO;

/**
 * Created by cn40580 at 2016-10-12 10:23 AM.
 */
public interface BusRouteService {

    List<BusRouteDTO> findAll();

    void remove(String routeId);

    BusRouteDTO saveBusRoute(BusRouteDTO busRouteDTO);

    BusRouteDTO findById(String routeId);

    BusRouteDTO removeStation(String routeId, String stationId);
}