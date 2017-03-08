package com.linde.web.rest.resource;

import org.springframework.hateoas.ResourceSupport;

/**
 * Created by cn40580 at 2016-10-10 10:02 AM.
 */
public class UserResource extends ResourceSupport{
    private String username;
    private Integer age;
    private String preferredLanguage;
    private String currency;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setPreferredLanguage(String preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
