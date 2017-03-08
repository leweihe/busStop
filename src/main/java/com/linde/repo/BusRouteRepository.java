package com.linde.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.linde.dto.BusRouteDTO;

/**
 * Created by cn40580 at 2016-10-09 10:04 AM.
 */
public interface BusRouteRepository extends MongoRepository<BusRouteDTO, String> {

}
