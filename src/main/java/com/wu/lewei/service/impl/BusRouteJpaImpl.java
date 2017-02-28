package com.wu.lewei.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Component;

import com.wu.lewei.dto.BusRouteDTO;
import com.wu.lewei.repo.BusRouteRepository;
import com.wu.lewei.service.BusRouteService;

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
}
