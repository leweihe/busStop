package com.linde.service;

import java.util.List;

import com.linde.constants.TripFlagEnum;
import com.linde.dto.BusStationDTO;

/**
 * Created by cn40580 at 2016-10-12 10:23 AM.
 */
public interface BusStationService {

    List<BusStationDTO> findAll();

    List<BusStationDTO> findAllByTripFlag(TripFlagEnum tripFlag);

    List<BusStationDTO> findStationsByRouteId(String routeId);

    List<BusStationDTO> findStationsByRouteIdAndTripFlag(String routeId, TripFlagEnum tripFlag);

    BusStationDTO saveBusStation(BusStationDTO busStationDTO);

    void remove(String stationId);
}
