package com.linde.dto;

import com.linde.constants.TripFlagEnum;

import javax.persistence.*;

/**
 * Created by cn40580 at 2016-10-10 10:04 AM.
 */
public class BusStationDTO {

    @Id
    @GeneratedValue
    private String id;
    private String keyword;
    private String city;
    private String lng;
    private String lat;
    private String description;

    private Integer sequence;

    @Enumerated(EnumType.STRING)
    private TripFlagEnum tripFlag;

    @ManyToOne
    private BusRouteDTO busRoute;

    public BusStationDTO() {

    }

    public BusStationDTO(String id) {
        this.id = id;
    }

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public TripFlagEnum getTripFlag() {
        return tripFlag;
    }

    public void setTripFlag(TripFlagEnum tripFlag) {
        this.tripFlag = tripFlag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BusStationDTO that = (BusStationDTO) o;

        return id != null ? id.equals(that.id) : that.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}