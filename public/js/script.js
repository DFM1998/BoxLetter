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
            console.log(element);
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

    })

    // when clicking on a location display
    $(".list_location_all").click(function(){
        if ($("#"+this.id + " .list_location_close").css('display') != 'none') {
            $(".list_location_open").hide();
            $(".list_location_close").show();
            $("#" + this.id + " .list_location_close").hide("slow");
            $("#" + this.id + " .list_location_open").show("slow");
        }
    });

    // if clicking on a location on the list, open it and display more information
    let checkListLocation = true;
    $(".showListTowns").click(function(){
        if(checkListLocation){
            checkListLocation = false;
            $(".list_location_all").hide();
            $(".descriptionText").html(" Filter by Town");
            $.getJSON("http://localhost:8000/api/cities", function(data){
                //console.log(data);
                let output = "<div class='filterTownDiv'><table>";
                output += "<tr><td style='width: 25%'></td><td style='width: 50%'>Select all:</td><td style='width: 25%'><input type='checkbox' id='checkBoxSelectAll' checked></td></tr>";
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    output += "<tr><td></td><td>"+element["city"]+"</td><td><input type='checkbox' class='townCheckBox' id='checkBoxIdCity_"+element["idCity"]+"' checked></td></tr>";
                }
                output += "</table></div>";
                $(".filterByTownContent").html(output);

                $("#checkBoxSelectAll").click(function(){
                    if(this.checked){
                        $( ".townCheckBox" ).prop( "checked", true );
                    }else{
                        $( ".townCheckBox" ).prop( "checked", false );
                    }
                });

                $(".townCheckBox").click(function(){
                    if ($(".townCheckBox:checkbox:checked").length >= data.length) {
                        $( "#checkBoxSelectAll" ).prop( "checked", true );
                    }else{
                        $( "#checkBoxSelectAll" ).prop( "checked", false );
                    }
                });

            })
        }else{
            checkListLocation = true;
            $(".list_location_all").show();
            $(".filterByTownContent").html("");
            $(".descriptionText").html('<span id="totalBoxLettersFound">10</span> box letters found</p>');
        }
    });
    

});