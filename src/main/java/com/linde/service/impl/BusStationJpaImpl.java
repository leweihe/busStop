package com.linde.service.impl;

import com.linde.repo.BusRouteRepository;
import com.linde.service.BusStationService;
import com.linde.dto.BusRouteDTO;
import com.linde.dto.BusStationDTO;
import com.linde.repo.StationRepository;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by cn40580 at 2016-10-12 10:24 AM.
 */
@Component("busStationService")
public class BusStationJpaImpl implements BusStationService {

    @Inject
    private StationRepository stationRepo;

    @Inject
    private BusRouteRepository routeRepo;

    @Override
    public List<BusStationDTO> findAll() {
        return stationRepo.findAll();
    }

    @Override
    public List<BusStationDTO> findStationsByRouteId(String routeId) {
        BusRouteDTO route = routeRepo.findOne(routeId);
        return route.getStations();
    }

    @Override
    public void remove(String stationId){
        stationRepo.delete(stationId);
    }

    @Override
    public BusStationDTO saveBusStation(BusStationDTO dto) {
        return stationRepo.save(dto);
    }
}
