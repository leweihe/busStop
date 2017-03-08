package com.linde.dto;

import com.linde.repo.StationRepository;

import javax.inject.Inject;

/**
 * Created by cn40580 at 2016-10-12.
 */
public class StationDTOTest {

    @Inject
    StationRepository stationRepo;

    public void test() {
        BusStationDTO station = new BusStationDTO();


    }
}