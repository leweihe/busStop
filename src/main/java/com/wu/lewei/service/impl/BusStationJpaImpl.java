package com.wu.lewei.service.impl;

import com.wu.lewei.dto.BusRouteDTO;
import com.wu.lewei.dto.BusStationDTO;
import com.wu.lewei.repo.BusRouteRepository;
import com.wu.lewei.repo.StationRepository;
import com.wu.lewei.service.BusStationService;
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
