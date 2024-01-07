const express = require('express');
var Themeparks = require('themeparks');

const app = express();
const port = 3000;

var api = new Themeparks.DestinationsApi();
var entitiesApi = new Themeparks.EntitiesApi();

var mkEntityID = "";
var epEntityID = "";
var hsEntityID = "";
var akEntityID = "";

// Startup grab entity ids for all parks in WDW
api.getDestinations().then(function(data) {
    // Get Walt Disney World
    const disneyworld = data.destinations.find(park => park.slug === "waltdisneyworldresort");

    // Get EntityIDs for WDW parks
    mkEntityID = disneyworld.parks.find(park => park.name === "Magic Kingdom Park").id;
    epEntityID = disneyworld.parks.find(park => park.name === "EPCOT").id;
    hsEntityID = disneyworld.parks.find(park => park.name === "Disney's Hollywood Studios").id;
    akEntityID = disneyworld.parks.find(park => park.name === "Disney's Animal Kingdom Theme Park").id;
});

// Grab operating hours:
// [park]
// [type]
app.get('/operatinghours', (req, res) => {
    const url = require('url');
    const queryObject = url.parse(req.url, true).query;
    var parkRequested = mkEntityID;
    var parkHourType = "all";

    // If park is requested
    if (!(queryObject["park"] === undefined)) {
        switch(queryObject["park"]) {
            case "epcot":
                parkRequested = epEntityID;
                break;
            case "hollywoodstudios":
                parkRequested = hsEntityID;
                break;
            case "animalkingdom":
                parkRequested = akEntityID;
                break;
        }
    }

    // If type is requested
    if (!(queryObject["type"] === undefined)) {
        switch(queryObject["type"]) {
            case "ticketed-event":
                parkHourType = "TICKETED_EVENT";
                break;
            case "info":
                parkHourType = "INFO";
                break;
            case "operating":
                parkHourType = "OPERATING";
                break;
        }
    }

    // Get Schedule
    entitiesApi.getEntityScheduleUpcoming(parkRequested).then(function(data) {
        var operatingTimes = data;

        if (!(parkHourType === "all")) {
            operatingTimes = data.schedule.filter(x => x.type === parkHourType);
        }
        
        res.json(operatingTimes);  
    });
});

app.listen(port, () => {
    console.log('Listening on port ' + port + '.');
});