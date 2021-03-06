package com.linde.web.rest;

import com.fasterxml.jackson.annotation.JsonCreator;

import ch.qos.logback.classic.Logger;

public class LoggerResource {

    private String name;

    private String level;

    public LoggerResource(Logger logger) {
        this.name = logger.getName();
        this.level = logger.getEffectiveLevel().toString();
    }

    @JsonCreator
    public LoggerResource() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    @Override
    public String toString() {
        return "LoggerResource{" +
                "name='" + name + '\'' +
                ", level='" + level + '\'' +
                '}';
    }
}
