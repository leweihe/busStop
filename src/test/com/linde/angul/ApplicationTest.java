package com.linde.angul;

import com.linde.Application;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by cn40580 at 2016-10-10 10:50 AM.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT, classes=Application.class)
public class ApplicationTest {

    @Test
    public void test() {
        
    }
}
