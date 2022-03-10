$(document).ready(function(){
    // display the time in the filter select
    const horraire = ["7:30", "8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30", "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00", "18:30","19:00"];
    
    let output = "<option selected disabled>??:??</option>";
    horraire.forEach(value => {
        output += "<option>"+value+"</option>";
    });
    $("#startTime").html(output);

    $("#startTime").change(function(){
        //console.log(this.value);
        let value = this.value;
        let index = horraire.indexOf(value);
        let output = "<option selected disabled>??:??</option>";
        for (let i = index; i < horraire.length; i++) {
            const element = horraire[i];
            output += "<option>"+element+"</option>"; 
            //console.log(element);
        }
        $("#endTime").html(output);
    });
    // end of display time in the filter select

    // slider that should display the distance 
    $(".sliderDistance").on("change mousemove",function(){
        $("#distanceValueDisplay").html(this.value)
    });

    // for the mobile version, map only or list only view
    let check = true;
    $(".showMapButton").click(function(){
        if (check){
            $("main").css("grid-template-columns", "minmax(376px,100%) 0%");
            check = false; 
        }else{
            $("main").css("grid-template-columns", "0% minmax(376px,100%)");
            check = true;
        }

    });

    // if clicking on a location on the list, open it and display more information
    let checkListLocation = true;
    $(".showListTowns").click(function(){
        if(checkListLocation){
            $(this).css({"background-color": "#002641", "color": "white"});
            checkListLocation = false;
            $(".list_location_all").hide();
            $(".descriptionText").html(" Filter by Town");
            $.getJSON("http://127.0.0.1:8000/api/cities", function(data){
                //console.log(data);
                let output = "<div class='filterTownDiv'><table style='width: 100%'>";
                output += "<tr><td style='width: 25%'></td><td style='width: 50%'>Select all:</td><td style='width: 25%'><input type='checkbox' id='checkBoxSelectAll' checked></td></tr>";
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    output += "<tr><td></td><td>"+element["city"]+"</td><td><input type='checkbox' class='townCheckBox' id='checkBoxIdCity_"+element["idCity"]+"' value='"+element["city"]+"' checked></td></tr>";
                }
                output += "</table></div>";
                $(".filterByTownContent").html(output);

                $("#checkBoxSelectAll").click(function(){
                    if(this.checked){
                        $( ".townCheckBox" ).prop( "checked", true );
                    }else{
                        $( ".townCheckBox" ).prop( "checked", false );
                    }
                    let towns = "";
                    $(".townCheckBox:checkbox:checked").each(function(){
                        console.log(this.value);
                        towns += this.value + ","; 
                    });
                    if (towns != "") {
                        displayPins(towns);
                    }
                });

                $(".townCheckBox").click(function(){
                    if ($(".townCheckBox:checkbox:checked").length >= data.length) {
                        $( "#checkBoxSelectAll" ).prop( "checked", true );
                    }else{
                        $( "#checkBoxSelectAll" ).prop( "checked", false );
                    }
                    let towns = "";
                    $(".townCheckBox:checkbox:checked").each(function(){
                        console.log(this.value);
                        towns += this.value + ","; 
                    });
    
                    if (towns != "") {
                        displayPins(towns);
                    }
                });

            })
        }else{
            $(this).css({"background-color": "", "color": "#002641"});
            checkListLocation = true;
            $(".list_location_all").show();
            $(".filterByTownContent").html("");
            $(".descriptionText").html('<span id="totalBoxLettersFound">10</span> box letters found</p>');
        }
    });

    // display 10 location from the database
    $.getJSON("http://127.0.0.1:8000/api/boxletter", function(data){
        console.log(data);
        let output = "";
        let count = 0;
        for (let i = 0; i < 11; i++) {
            count++;
            const element = data[i];
            output += `
                <span class="list_location_all" id="location_`+element["idBoxLetter"]+`">
                <div class="list_location_close">
                    <span class="pickupTime">
                    Pickup Time<br>
                    <span class="time">`+element["pickUpTime"]+`</span>
                    </span>
                    <span class="pickupAddress">
                    Address<br>
                    <span class="address">`+element["street"]+` <br>`+element["city"]+`</span>
                    </span>
                    <span class="pickupDistance">
                    Distance<br>
                    <span class="distance">??? m</span>
                    </span>
                </div>
                <div class="list_location_open" hidden>
                    <table style="width: 100%;border-collapse: collapse;">
                    <tr style="border-bottom: 0.2px solid #9B9B9B">
                        <td style="text-align:center;width: 25%;">
                            <i class="fa-regular fa-clock" style="font-size: 30px"></i>
                        </td>
                        <td>
                            <span style="font-size: 35px;">`+element["pickUpTime"]+`</span>
                        </td>
                    </tr>
                    <tr style="border-bottom: 0.2px solid #9B9B9B">
                        <td style="text-align: center;">
                            <i class="fa-solid fa-map-location-dot" style="font-size: 30px"></i>
                        </td>
                        <td>
                            <span style="font-size: 18px;line-height: 0px;font-family: RajdhaniRegular;"><p>`+element["street"]+`</p><p>`+element["city"]+`</p></span>
                        </td>
                    </tr>
                    <tr style="border-bottom: 0.2px solid #9B9B9B">
                        <td style="text-align: center;">
                            <i class="fa-solid fa-location-arrow" style="font-size: 30px"></i>
                        </td>
                        <td>
                            <span>??? m</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan='2' style="text-align:center;">
                            <button class="directionButton" style="width: 60%; font-size: 20px;margin-top:5px;" >Direction</button>
                        </td>
                    </tr>
                    </table></div></span>`;
        }
        $(".list_lo").html(output);
        $("#totalBoxLettersFound").html(count);
        // when clicking on a location display
        $(".list_location_all").click(function(){
            if ($("#"+this.id + " .list_location_close").css('display') != 'none') {
                $(".list_location_open").hide();
                $(".list_location_close").show();
                $("#" + this.id + " .list_location_close").hide("slow");
                $("#" + this.id + " .list_location_open").show("slow");
            }
        });

     });
});