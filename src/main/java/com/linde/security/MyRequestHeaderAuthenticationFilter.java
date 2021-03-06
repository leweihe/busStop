package com.linde.security;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter;

public class MyRequestHeaderAuthenticationFilter extends RequestHeaderAuthenticationFilter {

    /**
     * Overriding original method to ensure that the user name is provided in a small letters
     */
    @Override
    protected Object getPreAuthenticatedPrincipal(HttpServletRequest request) {
        String principal = (String) super.getPreAuthenticatedPrincipal(request);
        //TODO now for test set a default value
        return "cn40580";
//        return null == principal ? null : principal.toLowerCase();
    }
}
