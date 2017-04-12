package com.linde.constants;

import com.linde.web.rest.resource.TripFlagResource;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by cn40580 at 2017-03-02 9:46 AM.
 */
public enum TripFlagEnum {
    GO("GO"), RETURN("RETURN");

    private String value;

    private TripFlagEnum(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static List<TripFlagResource> getTripFlagResoures() {
        return Stream.of(TripFlagEnum.values()).map(n -> new TripFlagResource(n.name(), n.getValue())).collect(Collectors.toList());
    }
}
