package com.wu.lewei.dto;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

/**
 * Created by cn40580 at 2016-10-10.
 */
public class BusStationDTO {

    @Id
    @GeneratedValue
    private String id;
    private String keyword;
    private String city;

    @ManyToOne
    private BusRouteDTO busRoute;

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public BusRouteDTO getBusRoute() {
        return busRoute;
    }

    public void setBusRoute(BusRouteDTO busRoute) {
        this.busRoute = busRoute;
    }
}