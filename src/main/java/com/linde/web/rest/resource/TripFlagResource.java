package com.linde.web.rest.resource;

import org.springframework.hateoas.ResourceSupport;

/**
 * Created by cn40580 at 2016-10-10 10:06 AM.
 */
public class TripFlagResource extends ResourceSupport {

    private String name;
    private String value;

    public TripFlagResource(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
