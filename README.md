# A Bus Management System

This project is an application skeleton for a typical [AngularJS](http://angularjs.org/) web app.
You can use it to quickly bootstrap your angular webapp projects and dev environment for these
projects.

The seed contains a sample AngularJS application and is preconfigured to install the Angular
framework and a bunch of development and testing tools for instant web development gratification.

The seed app doesn't do much, just shows how to wire two controllers and views together.


## Getting Started

To get you started you can simply clone the angular-seed repository and install the dependencies:

### Clone resources

Clone the angular-seed repository using [git]:

```
git clone https://github.com/angular/angular-seed.git
cd angular-seed
```
### To config in your eclipse/ idea

nodejs's dependence

```bash
bower build
```
java's dependence
```bash
mvn compile
mvn eclipse:clean eclipse:eclipse
mvn idea:clean idea:idea
```

### To run as a packaged file
```bash
mvn install
```
and copy your jar file and run as java jar
```bash
java -jar lewei-bus-0.0.1-SNAPSHOT.jar --spring.profiles.active=[your profile] 
```
your profile is configured in **lewei-bus\src\main\resources\config**

### import data

```bash
mongoimport -d test -c busStationDTO busStationDTO.json
mongoimport -d test -c busRouteDTO busRouteDTO.json
```

### API links
use current position
```angular2html
http://localhost/lewei-bus/#!/home?useCurrent=true
```
use given point to search
```angular2html
http://localhost/lewei-bus/#!/home?lng=118.082809&lat=24.466511
```

:)