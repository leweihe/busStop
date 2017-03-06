package com.wu.lewei.service.impl;

import com.wu.lewei.dto.BusRouteDTO;
import com.wu.lewei.repo.BusRouteRepository;
import com.wu.lewei.service.BusRouteService;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by cn40580 at 2016-10-12 10:24 AM.
 */
@Component("busRouteService")
public class BusRouteJpaImpl implements BusRouteService {

    @Inject
    private BusRouteRepository busRouteRepo;

    @Override
    public List<BusRouteDTO> findAll() {
        return busRouteRepo.findAll();
    }

    @Override
    public void remove(String routeId) {
        busRouteRepo.delete(routeId);
    }

    @Override
    public BusRouteDTO saveBusRoute(BusRouteDTO dto) {
        return busRouteRepo.save(dto);
    }

    @Override
    public BusRouteDTO findById(String routeId) {
        return busRouteRepo.findOne(routeId);
    }

    @Override
    public BusRouteDTO removeStation(String routeId, String stationId) {
        BusRouteDTO busRoute = busRouteRepo.findOne(routeId);
        busRoute.setStations(busRoute.getStations().stream().filter(n -> !stationId.equals(n.getId())).collect(Collectors.toList()));
        return busRouteRepo.save(busRoute);
    }
}
