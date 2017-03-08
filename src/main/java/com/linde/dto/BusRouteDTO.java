package com.linde.dto;

import com.linde.constants.RouteStatusEnum;

import javax.persistence.*;
import java.util.List;

/**
 * Created by cn40580 at 2016-10-10.
 */
public class BusRouteDTO {

    @Id
    @GeneratedValue
    private String id;

    private String routeName;
    private String description;

    @Enumerated(EnumType.STRING)
    private RouteStatusEnum routeStatus;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public RouteStatusEnum getRouteStatus() {
        return routeStatus;
    }

    public void setRouteStatus(RouteStatusEnum routeStatus) {
        this.routeStatus = routeStatus;
    }
}
