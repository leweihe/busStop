package com.wu.lewei.dto;

import com.wu.lewei.Application;
import com.wu.lewei.repo.BusRouteRepository;
import com.wu.lewei.repo.StationRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;
import java.util.Arrays;

/**
 * Created by cn40580 at 2016-10-12 10:50 AM.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class)
public class BusStationDTOTest {

    @Inject
    BusRouteRepository busRouteRepo;

    @Inject
    StationRepository stationRepo;

    @Test
    public void cleardata() {
        busRouteRepo.deleteAll();
        stationRepo.deleteAll();
    }

    @Test
    public void initNo1() {
        BusRouteDTO busRoute = new BusRouteDTO();
        busRoute.setRouteName("No.1");
        busRoute.setDescription("思北");

        BusStationDTO s1 = new BusStationDTO();
        s1.setKeyword("故宫路");
        s1.setCity("厦门");

        BusStationDTO s2 = new BusStationDTO();
        s2.setCity("厦门");
        s2.setKeyword("思北路口");

        BusStationDTO s3 = new BusStationDTO();
        s3.setCity("厦门");
        s3.setKeyword("滨北中行");

        BusStationDTO s4 = new BusStationDTO();
        s4.setCity("厦门");
        s4.setKeyword("特贸");

        BusStationDTO s5 = new BusStationDTO();
        s5.setCity("厦门");
        s5.setKeyword("体育东村");

        BusStationDTO s6 = new BusStationDTO();
        s6.setCity("厦门");
        s6.setKeyword("宏业大厦");

        BusStationDTO s7 = new BusStationDTO();
        s7.setCity("厦门");
        s7.setKeyword("林德");

        stationRepo.save(Arrays.asList(s1, s2, s3, s4, s5, s6, s7));

        busRoute.setStations(Arrays.asList(s1, s2, s3, s4, s5, s6, s7));

        busRouteRepo.save(busRoute);
    }

    @Test
    public void initNo2() {
        BusRouteDTO busRoute = new BusRouteDTO();
        busRoute.setRouteName("No.2");
        busRoute.setDescription("轮渡");

        BusStationDTO s1 = new BusStationDTO();
        s1.setKeyword("角滨路口");
        s1.setCity("厦门");

        BusStationDTO s2 = new BusStationDTO();
        s2.setCity("厦门");
        s2.setKeyword("中山医院");

        BusStationDTO s3 = new BusStationDTO();
        s3.setCity("厦门");
        s3.setKeyword("湖滨南 新村");

        BusStationDTO s4 = new BusStationDTO();
        s4.setCity("厦门");
        s4.setKeyword("自行车厂");

        BusStationDTO s5 = new BusStationDTO();
        s5.setCity("厦门");
        s5.setKeyword("槟榔西里");

        BusStationDTO s6 = new BusStationDTO();
        s6.setCity("厦门");
        s6.setKeyword("槟榔东");

        BusStationDTO s7 = new BusStationDTO();
        s7.setCity("厦门");
        s7.setKeyword("常明路口");

        BusStationDTO s8 = new BusStationDTO();
        s8.setCity("厦门");
        s8.setKeyword("常明路口");

        BusStationDTO s9 = new BusStationDTO();
        s9.setCity("厦门");
        s9.setKeyword("莲花三村");

        stationRepo.save(Arrays.asList(s1, s2, s3, s4, s5, s6, s7, s8, s9));

        busRoute.setStations(Arrays.asList(s1, s2, s3, s4, s5, s6, s7, s8, s9));

        busRouteRepo.save(busRoute);
    }
}