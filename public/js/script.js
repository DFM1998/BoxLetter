// if clicking on the direction button, move the map view to the pin
function buttonDirectionClicked(id) {
    $(".switch-button-checkbox").click();

    document.getElementById("location_" + id).scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
    });
    $(".list_location_close").removeClass("activeAddress");
    $("#location_" + id + " .list_location_close").addClass("activeAddress");
}

// array containg the horraires that should be avaible in the selects
const horraire = [
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
];

// display the map
// the design of the map which can be find in the public/map_design.json
let mydata = JSON.parse(data);

// creating the map
let curMap = new lux.Map({
    target: "map1",
    bgLayer: "basemap_2015_global",
    bgLayerStyle: mydata,
    zoom: 14,
    position: [76825, 75133],
});

//console.log(curMap);
// display the pin of the current pisiton and move the view to it
function displayMyPosition(x, y) {
    curMap.showMarker({
        position: [x, y],
        positionSrs: 4326,
        positioning: "center-center",
        iconURL: "./images/myPosition.svg",
        click: false,
    });

    //console.log(x, y);
    var pin = ol.proj.fromLonLat([x, y]);
    curMap.getView().animate({
        center: pin,
        duration: 1000,
        zoom: 15,
    });
}

//function to move the view
function moveView(coordinates) {
    //console.log(coordinates.split(","));
    var pin = ol.proj.fromLonLat([
        parseFloat(coordinates.split(",")[0]),
        parseFloat(coordinates.split(",")[1]),
    ]);
    console.log(curMap);
    curMap.getView().animate({
        center: pin,
        duration: 2000,
        zoom: 18,
    });
}

// remove all the exising pins on the map
function clearMap() {
    curMap.getOverlays().clear();
    //console.log(curMap);
}

//displayMyPosition(6.11149,49.61062);
function displayPins(checkOutTowns, startTime, endTime, distance) {
    clearMap();
    // get the pins information and display them on the map
    $.getJSON("api/boxletter/" + checkOutTowns, function (data) {
        //console.log(data);
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            //console.log(element);
            let coordinates = element["coordinates"].split(",");
            const boxLetterId = element["idBoxLetter"];
            const pickUpTime = element["pickUpTime"];
            const street = element["street"];
            const city = element["city"];
            const postal = element["postal"];
            if (startTime !== undefined) {
                //console.log(horraire.indexOf(startTime));
                let indexStartTime = horraire.indexOf(startTime);
                let indexEndTime = horraire.length;
                if (endTime !== undefined) {
                    indexEndTime = horraire.indexOf(endTime) + 1;
                }
                const element = data[i];
                for (let i = indexStartTime; i < indexEndTime; i++) {
                    //console.log(horraire[i]);
                    if (distance == undefined) {
                        if (element["pickUpTime"] == horraire[i]) {
                            var output = `<div>
                            <p>Adresse</p>
                            <p>${street} L-${postal}</p>
                            <p>Pickup time</p>
                            <p>${pickUpTime}</p>
                            <p>Distance</p>
                            <p>${calcCrow(
                                element["normalCoordinates"].split(",")[1],
                                element["normalCoordinates"].split(",")[0],
                                latitude,
                                longitude
                            ).toFixed(2)} km</p>
                            <button class="directionButton" id="boxLetter_${boxLetterId}" onclick="buttonDirectionClicked(${boxLetterId})">Direction</button></div>
                        </div>`;
                            const res = curMap.showMarker({
                                position: [
                                    parseFloat(coordinates[0]),
                                    parseFloat(coordinates[1]),
                                ],
                                positioning: "center-center",
                                iconURL: "./images/pin.svg",
                                click: true,
                                html: output,
                                style: function (feature, resolution) {
                                    iconStyle
                                        .getImage()
                                        .setScale(
                                            1 / Math.pow(resolution, 1 / 3)
                                        );
                                    return iconStyle;
                                },
                            });
                        }
                    } else {
                        if (element["pickUpTime"] == horraire[i]) {
                            if (element["pickUpTime"] == horraire[i]) {
                                if (
                                    parseFloat(
                                        calcCrow(
                                            element["normalCoordinates"].split(
                                                ","
                                            )[1],
                                            element["normalCoordinates"].split(
                                                ","
                                            )[0],
                                            latitude,
                                            longitude
                                        ).toFixed(2)
                                    ) <= parseInt(distance)
                                ) {
                                    var output = `<div>
                                    <p>Adresse</p>
                                    <p>${street} L-${postal}</p>
                                    <p>Pickup time</p>
                                    <p>${pickUpTime}</p>
                                    <p>Distance</p>
                                    <p>${calcCrow(
                                        element["normalCoordinates"].split(
                                            ","
                                        )[1],
                                        element["normalCoordinates"].split(
                                            ","
                                        )[0],
                                        latitude,
                                        longitude
                                    ).toFixed(2)} km</p>
                                    <button class="directionButton" id="boxLetter_${boxLetterId}" onclick="buttonDirectionClicked(${boxLetterId})">Direction</button></div>
                                </div>`;
                                    const res = curMap.showMarker({
                                        position: [
                                            parseFloat(coordinates[0]),
                                            parseFloat(coordinates[1]),
                                        ],
                                        positioning: "center-center",
                                        iconURL: "./images/pin.svg",
                                        click: true,
                                        html: output,
                                        style: function (feature, resolution) {
                                            iconStyle
                                                .getImage()
                                                .setScale(
                                                    1 /
                                                        Math.pow(
                                                            resolution,
                                                            1 / 3
                                                        )
                                                );
                                            return iconStyle;
                                        },
                                    });
                                }
                            }
                        }
                    }
                }
            } else {
                var output = `<div class='popupContent'>
                                <div class='popupContent1'>
                                    <p>Adresse</p>
                                    <p>${street}</p>
                                    <p>${city} L-${postal}</p>
                                </div>
                                <div class='popupContent2'>
                                    <p>Pickup time</p>
                                    <p>${pickUpTime}</p>
                                </div>
                                <div class='popupContent3'>
                                    <p>Distance</p>
                                    <p>${calcCrow(
                                        element["normalCoordinates"].split(
                                            ","
                                        )[1],
                                        element["normalCoordinates"].split(
                                            ","
                                        )[0],
                                        latitude,
                                        longitude
                                    ).toFixed(2)} km</p>
                                </div>
                                <div class='popupContent4'>
                                    <button class="directionButton" id="boxLetter_${boxLetterId}" onclick="buttonDirectionClicked(${boxLetterId})">Direction</button>
                                </div>
                            </div>`;
                const res = curMap.showMarker({
                    position: [
                        parseFloat(coordinates[0]),
                        parseFloat(coordinates[1]),
                    ],
                    positioning: "center-center",
                    iconURL: "./images/pin.svg",
                    click: true,
                    html: output,
                    style: function (feature, resolution) {
                        iconStyle
                            .getImage()
                            .setScale(1 / Math.pow(resolution, 1 / 3));
                        return iconStyle;
                    },
                });
            }
        }
        $(".ol-overlay-container").click(function () {
            console.log(curMap);
            //brei$(".lux-popup-close").click();
        });
    });
    //console.log(curMap);
}

// defining the default positionment
let longitude = 6.130578;
let latitude = 49.611205;

let fontColorSwitcher = true;
const handleShowMap = () => {
    $("main").toggleClass("mobileViewShow");
    $("main").toggleClass("mobileViewHide");

    if (fontColorSwitcher) {
        $(".switch-button-label-span").css("color", "white");
        $(".switch-button").before().css("color", "#002641");
        fontColorSwitcher = false;
    } else {
        $(".switch-button-label-span").css("color", "#002641");
        $(".switch-button").before().css("color", "white");
        fontColorSwitcher = true;
    }
    console.log(fontColorSwitcher);
};

$(document).on("click", ".directionButton", handleShowMap);

//different language support
$(document).ready(function () {
    $(".switch-button-label-span").css("color", "#002641");
    $(".switch-button").before().css("color", "white");
    $(".switch-button-checkbox").prop("checked", true);
    $(".languageButton").click(function () {
        switchLanguage(this.id);
        if (this.id == "en") {
            localStorage.clear();
        }
        location.reload(true);
    });
});

// hide .filterFunctions on outside click
$(".showHideFilter").click(function () {
    $(".filterFunctions").css("display", "flex");
    $(".disableBackgroundDiv").show();
});

$(document).mouseup(function (e) {
    var popup = $(".filterFunctions");
    if ($(window).width() < 620) {
        if (
            !$(".showHideFilter").is(e.target) &&
            !popup.is(e.target) &&
            popup.has(e.target).length == 0
        ) {
            popup.hide();
            $(".disableBackgroundDiv").hide();
        }
    }
});

let lang = "";
// check which language has been select -> checking in the browser session
if (localStorage.getItem("language") != null) {
    const l = localStorage.getItem("language");
    $("#" + l).html("EN");
    $("#en").html(l.toUpperCase());
    $("#" + l).attr("id", "en");
    switchLanguage(l);
} else {
    switchLanguage("en");
}

// reading from the json file to get the content of the different elementss
function switchLanguage(l) {
    $.ajax({
        url: "js/json/" + l + ".json",
        dataType: "json",
        async: false,
    }).done(function (data) {
        lang = data;
        localStorage.setItem("language", l);

        //fixe elemets in the html that have to change the language
        $("#emptiedYet").html(lang.emptiedYet);
        $("#time").html(lang.time);
        $("#distance").html(lang.distance);
        $("#from").html(lang.from);
        $("#to").html(lang.to);
        $("#sortBy").html(lang.sortBy);
        $("#boxLettersFound").html(lang.boxLettersFound);
    });
}

// button to sort the list of the letter boxes by pickup time
// this method is calling the showLocationList method which is going to know how and which element to sort
let sorting = "asc";
$("#sortByPickUp").click(function () {
    $(this).css("background-color", "rgb(200, 200, 200)");
    $("#sortByDistance").css("background-color", "");

    let startTime = $("#startTime").val();
    let endTime = $("#endTime").val();
    let distance = $(".sliderDistance").val();
    let sort = "pickUpTime";

    let inputSearchField = $("#inputFieldSearch").val();

    //console.log(startTime + ":" + endTime + ":" + distance + ":" + inputSearchField);

    if (startTime !== null) {
        startTime = "07:30";
        endTime = "19:00";
    }

    if (endTime !== null) {
        endTime = "19:00";
    }

    if (inputSearchField !== "") {
        $.getJSON(
            "https://apiv3.geoportail.lu/geocode/search?queryString=" +
                inputSearchField,
            function (data) {
                showLocationList(
                    data["results"][0]["AddressDetails"]["locality"],
                    startTime,
                    endTime,
                    distance,
                    sort,
                    sorting
                );
            }
        );
    } else {
        showLocationList(
            "Luxembourg",
            startTime,
            endTime,
            distance,
            sort,
            sorting
        );
    }

    if (sorting == "asc") {
        sorting = "desc";
    } else {
        sorting = "asc";
    }
});

// button to sort the list of the letter boxes by distance
// this method is calling the showLocationList method which is going to know how and which element to sort
$("#sortByDistance").click(function () {
    $(this).css("background-color", "rgb(200, 200, 200)");
    $("#sortByPickUp").css("background-color", "");

    let startTime = $("#startTime").val();
    let endTime = $("#endTime").val();
    let distance = $(".sliderDistance").val();
    let sort = "distance";

    let inputSearchField = $("#inputFieldSearch").val();

    //console.log(startTime + ":" + endTime + ":" + distance + ":" + inputSearchField);

    if (startTime !== null) {
        startTime = "07:30";
        endTime = "19:00";
    }

    if (endTime !== null) {
        endTime = "19:00";
    }

    if (inputSearchField !== "") {
        $.getJSON(
            "https://apiv3.geoportail.lu/geocode/search?queryString=" +
                inputSearchField,
            function (data) {
                showLocationList(
                    data["results"][0]["AddressDetails"]["locality"],
                    startTime,
                    endTime,
                    distance,
                    sort,
                    sorting
                );
            }
        );
    } else {
        showLocationList(
            "Luxembourg",
            startTime,
            endTime,
            distance,
            sort,
            sorting
        );
    }

    if (sorting == "asc") {
        sorting = "desc";
    } else {
        sorting = "asc";
    }
});

checkInputSearch();
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
//this function has been taken from the https://www.codegrepper.com/code-examples/javascript/haversine+formula+javascript
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
            Math.sin(dLon / 2) *
            Math.cos(lat1) *
            Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return (Value * Math.PI) / 180;
}

// display the time in the filter select
$(document).ready(function () {
    let output = "<option selected disabled>??:??</option>";
    horraire.forEach((value) => {
        output += "<option>" + value + "</option>";
    });
    $("#startTime").html(output);
});

// display time in the select time element
$("#startTime").change(function () {
    //console.log(this.value);
    let value = this.value;
    let index = horraire.indexOf(value);
    let output = "<option selected disabled>??:??</option>";
    for (let i = index; i < horraire.length; i++) {
        const element = horraire[i];
        output += "<option>" + element + "</option>";
        //console.log(element);
    }
    $("#endTime").html(output);
    checkInputSearch(value, "19:00");
});

// end time, display time in the filter select
$("#endTime").change(function () {
    //console.log(this.value);
    let valueSelect1 = $("#startTime").val();
    let value = this.value;
    checkInputSearch(valueSelect1, value);
});

// if clicking enter in the input field search field, to trigger the button to-do the research
$("#inputFieldSearch").keyup(function (e) {
    let inputValue = $(this).val();
    if (inputValue !== "") {
        $.getJSON(
            "https://apiv3.geoportail.lu/fulltextsearch?limit=2&layer=Commune&query=" +
                inputValue,
            function (data) {
                //console.log(data["features"]);
                let outputAddresses = "";
                for (let index = 0; index < data["features"].length; index++) {
                    const element = data["features"][index].properties.label;
                    console.log(element);
                    outputAddresses += "<li>" + element + "</li>";
                }
                $.getJSON(
                    "https://apiv3.geoportail.lu/fulltextsearch?limit=5&layer=Adresse&query=" +
                        inputValue,
                    function (data) {
                        console.log(data["features"]);
                        for (
                            let index = 0;
                            index < data["features"].length;
                            index++
                        ) {
                            const element =
                                data["features"][index].properties.label;
                            console.log(element);
                            outputAddresses += "<li>" + element + "</li>";
                        }
                        $("#autoCompleteDivList").html(outputAddresses);
                        $("#autoCompleteDivList li").click(function () {
                            const checkedOutAddress = $(this).html();
                            console.log(checkedOutAddress);
                            $("#inputFieldSearch").val(checkedOutAddress);
                            $(".searchIcon").click();
                            $("#autoCompleteDiv").hide();
                        });
                        $("#autoCompleteDiv").show();
                    }
                );
            }
        );
    } else {
        $("#autoCompleteDiv").hide();
    }

    if (e.keyCode == 13) {
        $(".searchIcon").click();
        $("#autoCompleteDiv").hide();
    }
});

$("#searchFunctionWrapper").focusout(function () {
    setTimeout(() => {
        $("#autoCompleteDiv").hide();
    }, 200);
});

// slider that should display the distance
$(".sliderDistance").on("change mousemove", function () {
    $("#distanceValueDisplay").html(this.value);
});

//reset button
$(".resetDefault").click(function () {
    $("#inputFieldSearch").val("");
    $("#checkBoxEmptied").prop("checked", false);
    $(".sliderDistance").val("5");
    $("#distanceValueDisplay").html("5");
    $("#startTime").val("??:??").change();
    $("#endTime").val("??:??").change();
});

// check box for emptied yet
$("#checkBoxEmptied").click(function () {
    let isChecked = $(this)[0].checked;
    if (isChecked) {
        let currentTime = new Date();
        let hour = currentTime.getHours();
        let minute = currentTime.getMinutes();
        if (minute < 30) {
            minute = 30;
        }
        if (minute > 30) {
            minute = "00";
        }

        if (hour > 19 || hour < 7) {
            hour = 7;
            minute = 0;
        }

        let endTime = "";
        if (hour < 10) {
            endTime = "0" + hour;
        } else {
            endTime += hour;
        }

        endTime += ":" + minute;
        checkInputSearch(endTime, "19:00");
        $("#startTime").val(endTime).change();
    } else {
        checkInputSearch("07:30", "19:00");
        $("#startTime").val("??:??").change();
    }
});

// distance slider
let kmDistance = "5";
$(".sliderDistance").on("change", function () {
    if (kmDistance != this.value) {
        let startingTime = "07:30";
        let endingTime = "19:00";
        let valueSelect1 = $("#startTime").val();
        if (valueSelect1 !== null) {
            startingTime = valueSelect1;
            let valueSelect2 = $("#endTime").val();
            if (valueSelect2 !== null) {
                endingTime = valueSelect2;
            }
        }
        checkInputSearch(startingTime, endingTime, this.value);
        kmDistance = this.value;
    }
});

// for the mobile version, map only or list only view
$(".showMapButton").click(handleShowMap);

// if clicking on a location on the list, open it and display more information
let checkListLocation = true;
let firstRun = true;
let count = 0;
$(".showListTowns").click(function () {
    if (checkListLocation && firstRun) {
        $(this).css({ "background-color": "#002641", color: "white" });
        checkListLocation = false;
        firstRun = false;
        $(".list_location_all").hide();
        $(".descriptionText").html(lang.filterbyTown);
        $.getJSON("/api/cities", function (data) {
            //console.log(data);
            let output = "<div class='filterTownDiv'><table>";
            output +=
                "<tr><td>Select all:</td><td><input type='checkbox' id='checkBoxSelectAll'></td></tr>";
            for (let i = 0; i < data.length; i++) {
                const element = data[i];

                output +=
                    "<tr><td>" +
                    element["city"] +
                    "</td><td><input type='checkbox' class='townCheckBox' id='checkBoxIdCity_" +
                    element["idCity"] +
                    "' value='" +
                    element["city"] +
                    "'></td></tr>";
            }
            output += "</table></div>";
            $(".filterByTownContent").html(output);

            $("#checkBoxSelectAll").click(function () {
                if (this.checked) {
                    $(".townCheckBox").prop("checked", true);
                } else {
                    $(".townCheckBox").prop("checked", false);
                }
                let towns = "";
                $(".townCheckBox:checkbox:checked").each(function () {
                    //console.log(this.value);
                    towns += this.value + ",";
                });
                if (towns != "") {
                    if ($("#checkBoxSelectAll")[0].checked) {
                        towns = "";
                    }
                    displayPins(towns);
                    showLocationList(towns);
                } else {
                    clearMap();
                }
            });

            $(".townCheckBox").click(function () {
                if ($(".townCheckBox:checkbox:checked").length >= data.length) {
                    $("#checkBoxSelectAll").prop("checked", true);
                } else {
                    $("#checkBoxSelectAll").prop("checked", false);
                }
                let towns = "";
                $(".townCheckBox:checkbox:checked").each(function () {
                    //console.log(this.value);
                    towns += this.value + ",";
                });

                if (towns != "") {
                    if ($("#checkBoxSelectAll")[0].checked) {
                        towns = "";
                    }
                    displayPins(towns);
                    showLocationList(towns);
                } else {
                    clearMap();
                }
            });
        });
    } else if (checkListLocation) {
        $(this).css({ "background-color": "#002641", color: "white" });
        checkListLocation = false;
        $(".list_location_all").hide();
        $(".filterByTownContent").show();
        $(".descriptionText").html(lang.filterbyTown);
    } else {
        $(this).css({ "background-color": "", color: "#002641" });
        checkListLocation = true;
        $(".list_location_all").show();
        $(".filterByTownContent").hide();
        $(".descriptionText").html(
            '<span id="totalBoxLettersFound">' +
                count +
                "</span> " +
                lang.boxLettersFound
        );
    }
});

// display the list of the locations in the right column
function showLocationList(city, startTime, endTime, distance, sort, sorting) {
    // display location from the database
    $.getJSON("/api/boxletter/" + city + "", function (data) {
        //console.log(data);
        if (sort == "pickUpTime") {
            if (sorting == "asc") {
                data.sort((a, b) =>
                    a.pickUpTime > b.pickUpTime
                        ? 1
                        : b.pickUpTime > a.pickUpTime
                        ? -1
                        : 0
                );
            } else {
                data.sort((a, b) =>
                    a.pickUpTime < b.pickUpTime
                        ? 1
                        : b.pickUpTime < a.pickUpTime
                        ? -1
                        : 0
                );
            }
        }
        if (sort == "distance") {
            if (sorting == "asc") {
                data.sort((a, b) =>
                    calcCrow(
                        a.normalCoordinates.split(",")[1],
                        a.normalCoordinates.split(",")[0],
                        latitude,
                        longitude
                    ).toFixed(2) >
                    calcCrow(
                        b.normalCoordinates.split(",")[1],
                        b.normalCoordinates.split(",")[0],
                        latitude,
                        longitude
                    ).toFixed(2)
                        ? 1
                        : calcCrow(
                              b.normalCoordinates.split(",")[1],
                              b.normalCoordinates.split(",")[0],
                              latitude,
                              longitude
                          ).toFixed(2) >
                          calcCrow(
                              a.normalCoordinates.split(",")[1],
                              a.normalCoordinates.split(",")[0],
                              latitude,
                              longitude
                          ).toFixed(2)
                        ? -1
                        : 0
                );
            } else {
                data.sort((a, b) =>
                    calcCrow(
                        a.normalCoordinates.split(",")[1],
                        a.normalCoordinates.split(",")[0],
                        latitude,
                        longitude
                    ).toFixed(2) <
                    calcCrow(
                        b.normalCoordinates.split(",")[1],
                        b.normalCoordinates.split(",")[0],
                        latitude,
                        longitude
                    ).toFixed(2)
                        ? 1
                        : calcCrow(
                              b.normalCoordinates.split(",")[1],
                              b.normalCoordinates.split(",")[0],
                              latitude,
                              longitude
                          ).toFixed(2) <
                          calcCrow(
                              a.normalCoordinates.split(",")[1],
                              a.normalCoordinates.split(",")[0],
                              latitude,
                              longitude
                          ).toFixed(2)
                        ? -1
                        : 0
                );
            }
        }

        let output = "";
        count = 0;
        for (let i = 0; i < data.length; i++) {
            if (startTime !== undefined && startTime !== null) {
                //console.log(horraire.indexOf(startTime));
                let indexStartTime = horraire.indexOf(startTime);
                let indexEndTime = horraire.length;
                if (endTime !== undefined) {
                    indexEndTime = horraire.indexOf(endTime) + 1;
                }
                const element = data[i];
                for (let i = indexStartTime; i < indexEndTime; i++) {
                    let html =
                        `<span class="list_location_all" id="location_` +
                        element["idBoxLetter"] +
                        `">
                        <div class="list_location_close directButtonDisplayOnMap" value="` +
                        element["normalCoordinates"] +
                        `">
                        <table>
                            <tr>
                                <td colspan='2'>${lang.address}</td>
                            </tr>
                            <tr>
                                <td colspan='2'>${element["street"]}</td>
                            </tr>
                            <tr>
                                <td colspan='2'>L-${element["postal"]} ${
                            element["city"]
                        }</td>
                            </tr>
                            <tr>
                                <td>${lang.pickUpTime}</td>
                                <td>${lang.distance}</td>
                            </tr>
                            <tr>
                                <td>${element["pickUpTime"]}</td>
                                <td>${calcCrow(
                                    element["normalCoordinates"].split(",")[1],
                                    element["normalCoordinates"].split(",")[0],
                                    latitude,
                                    longitude
                                ).toFixed(2)} km</td>
                            </tr>
                        </table>
                
                        </div>
                    </span>`;
                    //console.log(horraire[i]);
                    if (distance == undefined) {
                        if (element["pickUpTime"] == horraire[i]) {
                            count++;
                            output += html;
                        }
                    } else {
                        if (element["pickUpTime"] == horraire[i]) {
                            if (
                                parseFloat(
                                    calcCrow(
                                        element["normalCoordinates"].split(
                                            ","
                                        )[1],
                                        element["normalCoordinates"].split(
                                            ","
                                        )[0],
                                        latitude,
                                        longitude
                                    ).toFixed(2)
                                ) <= parseInt(distance)
                            ) {
                                count++;
                                output += html;
                            }
                        }
                    }
                }
            } else {
                count++;
                const element = data[i];
                output +=
                    `<span class="list_location_all" id="location_` +
                    element["idBoxLetter"] +
                    `">
                        <div class="list_location_close directButtonDisplayOnMap" value="` +
                    element["normalCoordinates"] +
                    `">
                        <table>
                            <tr>
                                <td colspan='2'>${lang.address}</td>
                            </tr>
                            <tr>
                                <td colspan='2'>${element["street"]}</td>
                            </tr>
                            <tr>
                                <td colspan='2'>L-${element["postal"]} ${
                        element["city"]
                    }</td>
                            </tr>
                            <tr>
                                <td>${lang.pickUpTime}</td>
                                <td>${lang.distance}</td>
                            </tr>
                            <tr>
                                <td>${element["pickUpTime"]}</td>
                                <td>${calcCrow(
                                    element["normalCoordinates"].split(",")[1],
                                    element["normalCoordinates"].split(",")[0],
                                    latitude,
                                    longitude
                                ).toFixed(2)} km</td>
                            </tr>
                        </table>
                
                        </div>
                    </span>`;
            }
        }
        $(".list_lo").html(output);
        $("#totalBoxLettersFound").html(count);
        $(".directButtonDisplayOnMap").click(function () {
            moveView(this.attributes.value.nodeValue);
            $(".switch-button-checkbox").click();
        });
        // when clicking on a location display
        $(".list_location_all").click(function () {
            $(".list_location_close").removeClass("activeAddress");
            $("#" + this.id + " .list_location_close").addClass(
                "activeAddress"
            );
        });
    });
}

// this function is only called if the browser supports geolocation
function success(position) {
    $.getJSON(
        "https://apiv3.geoportail.lu/geocode/reverse?lon=" +
            position.coords.longitude +
            "&lat=" +
            position.coords.latitude,
        function (data) {
            //console.log(data["results"][0]);
            const arrayAddress = data["results"][0];
            let output =
                arrayAddress["number"] +
                ", " +
                arrayAddress["street"] +
                " L-" +
                arrayAddress["postal_code"] +
                " " +
                arrayAddress["locality"];
            $("#inputFieldSearch").val(output);
            displayPins(arrayAddress["locality"]);
            showLocationList(arrayAddress["locality"]);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            displayMyPosition(
                position.coords.longitude,
                position.coords.latitude
            );
        }
    );
}

// check if browser has geolocation compatibility
$(".pinSearchIconBar").click(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// in case the user click on the button to get located
$(".searchIcon").click(function () {
    checkInputSearch();
});

// check what the input field contains
function checkInputSearch(startTime, endTime, distance) {
    let inputValue = $("#inputFieldSearch").val();
    if (distance !== "") {
        if (inputValue !== "") {
            $.getJSON(
                "https://apiv3.geoportail.lu/geocode/search?queryString=" +
                    inputValue,
                function (data) {
                    //console.log(data["results"][0]["AddressDetails"]["locality"]);
                    const address = data["results"][0]["name"];
                    $("#inputFieldSearch").val(address);
                    longitude =
                        data["results"][0]["geomlonlat"]["coordinates"][0];
                    latitude =
                        data["results"][0]["geomlonlat"]["coordinates"][1];

                    //console.log(latitude);

                    showLocationList(
                        data["results"][0]["AddressDetails"]["locality"],
                        startTime,
                        endTime,
                        distance
                    );
                    displayPins(
                        data["results"][0]["AddressDetails"]["locality"],
                        startTime,
                        endTime,
                        distance
                    );
                    displayMyPosition(longitude, latitude);
                }
            );
        } else {
            showLocationList("Luxembourg", startTime, endTime, distance);
            displayPins("Luxembourg", startTime, endTime, distance);
            displayMyPosition(longitude, latitude);
        }
    } else if (inputValue !== "") {
        $.getJSON(
            "https://apiv3.geoportail.lu/geocode/search?queryString=" +
                inputValue,
            function (data) {
                //console.log(data["results"][0]["AddressDetails"]["locality"]);
                const address = data["results"][0]["name"];
                $("#inputFieldSearch").val(address);
                longitude = data["results"][0]["geomlonlat"]["coordinates"][0];
                latitude = data["results"][0]["geomlonlat"]["coordinates"][1];

                //console.log(latitude);

                showLocationList(
                    data["results"][0]["AddressDetails"]["locality"],
                    startTime,
                    endTime
                );
                displayPins(
                    data["results"][0]["AddressDetails"]["locality"],
                    startTime,
                    endTime
                );
                displayMyPosition(longitude, latitude);
            }
        );
    } else {
        showLocationList("Luxembourg", startTime, endTime);
        displayPins("Luxembourg", startTime, endTime);
        displayMyPosition(longitude, latitude);
    }
}
