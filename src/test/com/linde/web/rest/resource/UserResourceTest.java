package com.linde.web.rest.resource;

import com.linde.Application;
import com.linde.dto.UserDTO;
import com.linde.web.rest.resourceassembler.UserResourceAssembler;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by cn40580 on 2016-10-10.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)
public class UserResourceTest {

    @Autowired
    private UserResourceAssembler userResourceAssembler;

    @Test
    public void test() {
        UserDTO u = new UserDTO();
        u.setAge(18);
        u.setPreferredLanguage("EN");
        u.setUsername("Leweihe");
        UserResource r = userResourceAssembler.toResource(u);
        Assert.assertEquals(r.getAge(), u.getAge());
        Assert.assertEquals(r.getPreferredLanguage(), u.getPreferredLanguage());
        Assert.assertEquals(r.getUsername(), u.getUsername());

    }
}