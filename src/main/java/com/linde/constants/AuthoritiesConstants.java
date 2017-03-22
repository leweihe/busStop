package com.linde.constants;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Constants to by used in security context all over the tool.
 *
 * @author cn40580
 */
public final class AuthoritiesConstants {

    private static final Logger LOG = LoggerFactory.getLogger(AuthoritiesConstants.class);

    private AuthoritiesConstants() {
    }

    public static final List<String> ALL_PERMISSIONS;

    static {
        ALL_PERMISSIONS = getAllPermissions();
    }

    public static final String LOGIN = "LOGIN";

    public static final String ADMINISTRATE_USERS = "ADMINISTRATE_USERS";
    public static final String ADMINISTRATE_ROLES = "ADMINISTRATE_ROLES";

    /**
     * Gets the all permissions.
     *
     * @return the all permissions
     */
    private static List<String> getAllPermissions() {
        Field[] fields = AuthoritiesConstants.class.getDeclaredFields();
        List<String> permissions = new ArrayList<>(fields.length);

        for (Field f : fields) {
            if (Modifier.isStatic(f.getModifiers()) && f.getType().equals(String.class)) {
                try {
                    permissions.add((String) f.get(null));
                } catch (IllegalArgumentException | IllegalAccessException e) {
                    LOG.error("Error getting all permissions", e);
                }
            }
        }
        return permissions;
    }
}
