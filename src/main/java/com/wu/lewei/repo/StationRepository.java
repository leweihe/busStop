package com.wu.lewei.repo;

import com.wu.lewei.dto.BusStationDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by cn40580 at 2016-10-09.
 */
public interface StationRepository extends MongoRepository<BusStationDTO, String> {

}
