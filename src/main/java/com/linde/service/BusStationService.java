package com.linde.service;

import java.util.List;

import com.linde.dto.BusStationDTO;

/**
 * Created by cn40580 at 2016-10-12 10:23 AM.
 */
public interface BusStationService {

    List<BusStationDTO> findAll();

    List<BusStationDTO> findStationsByRouteId(String routeId);

    BusStationDTO saveBusStation(BusStationDTO busStationDTO);

    void remove(String stationId);
}
