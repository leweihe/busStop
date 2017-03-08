package com.linde.web.rest.resource;

import com.linde.constants.RouteStatusEnum;
import com.linde.dto.BusStationDTO;
import org.springframework.hateoas.ResourceSupport;

import java.util.List;

/**
 * Created by cn40580 at 2016-10-10 10:06 AM.
 */
public class BusRouteResource extends ResourceSupport{

    private String routeId;
    private String routeName;
    private List<BusStationDTO> stations;
    private String description;
    private RouteStatusEnum routeStatus;

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

    public String getRouteId() {
        return routeId;
    }

    public void setRouteId(String routeId) {
        this.routeId = routeId;
    }
}
