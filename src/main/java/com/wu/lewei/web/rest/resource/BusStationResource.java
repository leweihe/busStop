package com.wu.lewei.web.rest.resource;

import org.springframework.hateoas.ResourceSupport;

/**
 * Created by cn40580 at 2016-10-10 10:06 AM.
 */
public class BusStationResource extends ResourceSupport {

    private String stationId;
    private String keyword;
    private String city;

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

    public String getStationId() {
        return stationId;
    }

    public void setStationId(String stationId) {
        this.stationId = stationId;
    }
}
