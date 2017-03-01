package com.wu.lewei.dto;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

/**
 * Created by cn40580 at 2016-10-10.
 */
public class BusRouteDTO {

    @Id
    private String id;
    private String routeName;

    @OneToMany(mappedBy = "BusStationDTO")
    private List<BusStationDTO> stations;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public List<BusStationDTO> getStations() {
        return stations;
    }

    public void setStations(List<BusStationDTO> stations) {
        this.stations = stations;
    }
}
