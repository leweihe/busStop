package com.linde.web.rest.resource;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.hateoas.ResourceSupport;

import java.util.Date;

/**
 * Created by cn40580 at 2016-10-10 10:06 AM.
 */
public class BusStationResource extends ResourceSupport {

    private String stationId;
    private String keyword;
    private String city;
    private String lng;
    private String lat;
    private String description;

    private String busRouteId;

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

    public String getBusRouteId() {
        return busRouteId;
    }

    public void setBusRouteId(String busRouteId) {
        this.busRouteId = busRouteId;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
