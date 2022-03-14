<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Letter Box Post</title>
        <link rel="icon" type="image/x-icon" href="/images/pin.svg">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://apiv3.geoportail.lu/apiv3loader.js"  type="text/javascript"></script>
        <script type="text/javascript" src="map_design.json"></script>
        <script src="https://kit.fontawesome.com/3de7a0b041.js" crossorigin="anonymous"></script>

        <!--<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">-->
        <!--<link rel="stylesheet" href="/css/ui-toggle.css" type="text/css" media="screen" />-->
        <link rel="stylesheet" href="/css/css.css" type="text/css"/>
        <link rel="stylesheet" href="/css/css-mobile.css" type="text/css"/>

        <style>
            /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}a{background-color:transparent}[hidden]{display:none}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}*,:after,:before{box-sizing:border-box;border:0 solid #e2e8f0}a{color:inherit;text-decoration:inherit}svg,video{display:block;vertical-align:middle}video{max-width:100%;height:auto}.bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.bg-gray-100{--bg-opacity:1;background-color:#f7fafc;background-color:rgba(247,250,252,var(--bg-opacity))}.border-gray-200{--border-opacity:1;border-color:#edf2f7;border-color:rgba(237,242,247,var(--border-opacity))}.border-t{border-top-width:1px}.flex{display:flex}.grid{display:grid}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.font-semibold{font-weight:600}.h-5{height:1.25rem}.h-8{height:2rem}.h-16{height:4rem}.text-sm{font-size:.875rem}.text-lg{font-size:1.125rem}.leading-7{line-height:1.75rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-1{margin-left:.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.ml-12{margin-left:3rem}.-mt-px{margin-top:-1px}.max-w-6xl{max-width:72rem}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.p-6{padding:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pt-8{padding-top:2rem}.fixed{position:fixed}.relative{position:relative}.top-0{top:0}.right-0{right:0}.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}.text-center{text-align:center}.text-gray-200{--text-opacity:1;color:#edf2f7;color:rgba(237,242,247,var(--text-opacity))}.text-gray-300{--text-opacity:1;color:#e2e8f0;color:rgba(226,232,240,var(--text-opacity))}.text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.text-gray-500{--text-opacity:1;color:#a0aec0;color:rgba(160,174,192,var(--text-opacity))}.text-gray-600{--text-opacity:1;color:#718096;color:rgba(113,128,150,var(--text-opacity))}.text-gray-700{--text-opacity:1;color:#4a5568;color:rgba(74,85,104,var(--text-opacity))}.text-gray-900{--text-opacity:1;color:#1a202c;color:rgba(26,32,44,var(--text-opacity))}.underline{text-decoration:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.w-5{width:1.25rem}.w-8{width:2rem}.w-auto{width:auto}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@media (min-width:640px){.sm\:rounded-lg{border-radius:.5rem}.sm\:block{display:block}.sm\:items-center{align-items:center}.sm\:justify-start{justify-content:flex-start}.sm\:justify-between{justify-content:space-between}.sm\:h-20{height:5rem}.sm\:ml-0{margin-left:0}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:pt-0{padding-top:0}.sm\:text-left{text-align:left}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:border-t-0{border-top-width:0}.md\:border-l{border-left-width:1px}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (prefers-color-scheme:dark){.dark\:bg-gray-800{--bg-opacity:1;background-color:#2d3748;background-color:rgba(45,55,72,var(--bg-opacity))}.dark\:bg-gray-900{--bg-opacity:1;background-color:#1a202c;background-color:rgba(26,32,44,var(--bg-opacity))}.dark\:border-gray-700{--border-opacity:1;border-color:#4a5568;border-color:rgba(74,85,104,var(--border-opacity))}.dark\:text-white{--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity))}.dark\:text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.dark\:text-gray-500{--tw-text-opacity:1;color:#6b7280;color:rgba(107,114,128,var(--tw-text-opacity))}}
        </style>
    </head>
    <body class="antialiased">
        @if (Route::has('login'))
            <div class="hidden fixed sm:block" style="margin-left: 10px;margin-top: 9px;">
                @auth
                    <a href="{{ url('/home') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Home</a>
                @else
                    <a href="{{ route('login') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Log in</a>

                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline">Register</a>
                    @endif
                @endauth
            </div>
        @endif
        <header>
            <button class="showMapButton" hidden>map</button>
            <div class="dropdown">
                <a class="dropbtn">EN</a>
                <div class="dropdown-content" style="left:0;">
                    <a>LU</a>
                    <a>DE</a>
                    <a>FR</a>
                </div>
            </div>
        </header>
        <main>
            <div id="map1"></div>
            <script>
                const horraire = ["07:30", "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30", "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00", "18:30","19:00"];

                // display the map
                // the design of the map which can be find in the public/map_design.json
                var mydata = JSON.parse(data);

                var curMap = new lux.Map({
                    target: 'map1',
                    bgLayer: 'basemap_2015_global',
                    bgLayerStyle: mydata,
                    zoom: 14,
                    position: [76825, 75133]
                });

                function displayMyPosition(x,y){
                    curMap.showMarker(
                    {
                        position: [x, y],
                        positionSrs: 4326,
                        positioning: 'center-center',
                        iconURL: './images/myPosition.svg',
                        click: false
                    });
                }

                function clearMap() {
                    curMap.getOverlays().clear();
                    console.log(curMap);
                }

                //displayMyPosition(6.11149,49.61062);

                function displayPins(checkOutTowns, startTime, endTime){
                    clearMap();
                    // get the pins information and display them on the map
                    $.getJSON("http://127.0.0.1:8000/api/boxletter/"+checkOutTowns, function(data){
                        //console.log(data);
                        for (let i = 0; i < data.length; i++) {
                            const element = data[i];
                            let coordinates = element["coordinates"].split(",");
                            const pickUpTime = element["pickUpTime"];
                            const street = element["street"];
                            const city = element["city"];
                            const postal = element["postal"];
                            if (startTime !== undefined) {
                                console.log("TEST");
                                //console.log(horraire.indexOf(startTime));
                                let indexStartTime = horraire.indexOf(startTime);
                                let indexEndTime = horraire.length;
                                if (endTime !== undefined) {
                                    indexEndTime = horraire.indexOf(endTime)+1;
                                }
                                const element = data[i];
                                for (let i = indexStartTime; i < indexEndTime; i++) {
                                    //console.log(horraire[i]);
                                    if (element["pickUpTime"] == horraire[i]) {
                                        console.log("ADD");
                                        var output = '<div><div style="display: ruby-text;"><i class="fa-regular fa-clock fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left: 10px;"><p class="timePopup">'+pickUpTime+'</p><p class="smallTitle">Pickup time</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin-top:10px;"><div style="display: ruby-text;"><i class="fa-solid fa-map-location-dot fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left:10px;"><p class="streetPopup" style="line-height: 12px;">'+street+'<br>L-'+postal+' '+city+'</p><p class="smallTitle">Street</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin: auto;border: 0;"><button class="directionButton">Direction</button></div>'
                                        const res = curMap.showMarker(
                                        {
                                            position: [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
                                            positioning: 'center-center',
                                            iconURL: './images/pin.svg',
                                            click: true,
                                            html: output
                                        });  
                                    }
                                }
                            }else{
                                console.log("HEYYYY");
                                var output = '<div><div style="display: ruby-text;"><i class="fa-regular fa-clock fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left: 10px;"><p class="timePopup">'+pickUpTime+'</p><p class="smallTitle">Pickup time</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin-top:10px;"><div style="display: ruby-text;"><i class="fa-solid fa-map-location-dot fa-2xl" style="color: #002641"></i></div><div style="display: inline-block;margin-left:10px;"><p class="streetPopup" style="line-height: 12px;">'+street+'<br>L-'+postal+' '+city+'</p><p class="smallTitle">Street</p></div><hr style="margin-left: -14px; margin-right:-14px;"></div><div style="margin: auto;border: 0;"><button class="directionButton">Direction</button></div>'
                                const res = curMap.showMarker(
                                {
                                    position: [parseFloat(coordinates[0]), parseFloat(coordinates[1])],
                                    positioning: 'center-center',
                                    iconURL: './images/pin.svg',
                                    click: true,
                                    html: output
                                });   
                            }
                        };
                    });
                    //console.log(curMap);
                }

                displayPins("Luxembourg");


                //var position1 = [75977, 75099];
                var position2 = [6.11149,49.61062];
                //var position1 = [98259.62760000027,77052.32989954633];
                var position1 = [92739.74789999983,90096.97799955128]

                /*curMap.showMarker(
                    {
                    position: position1,
                    positioning: 'center-center',
                    iconURL: './images/pin.svg',
                    click: true,
                    html: output
                    });
                curMap.showMarker(
                    {
                    position: position2,
                    positionSrs: 4326,
                    positioning: 'center-center',
                    iconURL: './images/pin.svg',
                    click: true,
                    html: output
                });*/

                //EPSG:2169
                /*lux.geocode({
                    //queryString: '22, RUE DU VILLAGE ((PARKING, ENTRE 22 ET 28)), ABWEILER'
                    queryString: '19, Porte des Ardennes, Erpeldange'
                }, function(position) {
                    console.log (position);
                });*/

                //console.log(map);
            </script>
            <aside>
                <div class="filtersContent">
                    <div class="searchField"><div class="pinSearchIconBar"><img src="./images/pin.svg" class="pinSearchIcon"></div><input type="text" id="inputFieldSearch" class="searchInputField" placeholder=" Search"><label for="inputFieldSearch"><div class="searchIcon"><i class="fa-solid fa-magnifying-glass fa-sm"></i></div></label></div>
                    <hr>
                    <p style="display: inline; margin: 20px 0 20px 0;color: #474747;"><span style="min-width: 24%;display:inline-block">Emptied yet:</span><input type="checkbox" style="transform: scale(1.5);margin-left: 10px;"></p>
                    <div style="display: inline-block; float: right;"><button class="resetDefault"><i class="fa-solid fa-arrow-rotate-left"></i></button><button class="showListTowns"><i class="fa-solid fa-list-check"></i></button></div>
                    <p style="color: #474747;"><span style="min-width: 24%;display:inline-block">Time: </span><span class="smallText">from</span> <select class="selectTime" id="startTime"></select> <span class="smallText">to</span> <select class="selectTime" id="endTime"><option>??:??</option></select></p>
                    <p style="color: #474747;"><span style="width: 24%;display:inline-block">Distance:</span><input style="width: 50%" type="range" class="sliderDistance" min="1" max="100" value="5"><span style="width: 20%;display: inline-block;"><span id="distanceValueDisplay">5</span>km</span></p>
                </div>
                <p style="text-align: center;font-size: 25px;vertical-align: text-top;"><img style="height: 25px;margin-bottom:-5px;" src="./images/pin.svg" alt=""> <span class="descriptionText"><span id="totalBoxLettersFound">10</span> box letters found</p></span>
                
                <span class="filterByTownContent"></span>
                <span class="list_lo">
                </span>
            </aside>
        </main>
        <footer>
            <p class="footer_content">@copyright 2022</p>
        </footer>
        <script type="text/javascript" src="js/script.js"></script>
    </body>
</html>
