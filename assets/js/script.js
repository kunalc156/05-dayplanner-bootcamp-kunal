
/**
 * display current date and day in the header
 */
function displayCurrentTime() {
    var today = moment();
    $("#currentDay").text(today.format("dddd, MMMM Do"));
}


const isTimeBetween = function(startTime, endTime, serverTime) {
    let start = moment(startTime, "h A")
    let end = moment(endTime, "h A")
    let server = moment(serverTime, "h A")
    if (end < start) {
        var x = server >= start
        var y = server<= moment('23:59:59', "h:mm:ss A") || server>= moment('0:00:00', "h:mm:ss A")
        var z = server < end;
        return server >= start && (server<= moment('23:59:59', "h:mm:ss A") || server>= moment('0:00:00', "h:mm:ss A")) && server < end;
    }
    return server> start && server< end
}

/**
 * draw the schedule
 */

function displaySchedule() {
    var firstTime = "08:00 AM"; 
    var frequency = 1;
    var count = 0;
    var xtime = null;
    while( count < 9) {


        if( count >= 1 ) 
            xtime = moment(xtime, 'hA').add(frequency, 'hour').format("hA");
        else 
           xtime = moment(firstTime, 'hA').add(frequency, 'hour').format("hA");
    
        var currentTime= moment().format("hA");    // e.g. 11:00 pm
        var endTime = moment('05:01 pm', "HH:mm a");

        var timeClass = "present";
      
        amIBetween = isTimeBetween(currentTime, endTime, xtime);

        if(amIBetween){
            timeClass = "future";
        }
        else {
            if(currentTime === xtime)
                timeClass = "present";
            else
                timeClass = "past";
        }  
           

        var row_id = "row-" + count;
        //creating row
        $('<div/>', {
            id: row_id,
            "class": 'row align-items-end',
            title: 'now this div has a title!'
        }).appendTo('.container');

        var column_one = "col-one-" + count;

        //adding columns
        $('<div/>', {
            id : column_one,
            "class": ' col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2 col-xxl-2  hour h-100 align-items-end text-wrap',
            title: 'now this div has a title!',
            "data-row" : count,
        }).appendTo('#' + row_id);
        
        $('#' + column_one).html(xtime);

        var column_two = "col-two-" + count;
        //Second column
        $('<div/>', {
            id: column_two,
            "class": 'col-6 col-sm-6 col-md-8 col-lg-8 col-xl-8 col-xxl-8 description text-wrap h-100 ' + timeClass,
            title: 'now this div has a title!',
            "data-row" : count,
        }).appendTo('#' + row_id);

        var textarea = "textarea-" + moment().format("D") + "-" + count;

        $('<textarea/>', {
            id: textarea,
            "class": 'col-6 col-sm-6 col-md-8 col-lg-8 col-xl-8 col-xxl-8 text-wrap w-100',
        }).appendTo('#' + column_two);

        var column_three = "col-three-" + count;
        //third column
        $('<div/>', {
            id: column_three,
            "class": 'col-3 col-sm-3 col-md-2 col-lg-2 col-xl-2 col-xxl-2  align-middle saveBtn h-100 align-middle text-wrap',
            title: 'now this div has a title!',
            "data-row" : count,

        }).appendTo('#' + row_id);

        $('<i/>', {
            "class": 'fas fa-save'
        }).appendTo('#' + column_three);

        $(".saveBtn").on("click", function(event) {
           
            var row_index = $(this).data("row");
            var text_area_content = $("#textarea-" + moment().format("D") + "-" + row_index).val();

            //set only if it has value
            if( text_area_content.trim()){
                var item_name  = "content-" + moment().format("D") + "-" + row_index;
                localStorage.setItem(item_name, text_area_content);
            }
        });
        count ++ ;
    }
}

/**
 * get data from local storage
 */
function loadLocalStorageContent() {
    for(var i= 0; i < 9 ; i++) {
        var val = localStorage.getItem("content-" + moment().format("D") + "-" + i);
        if(val != undefined){
            $("#textarea-" + moment().format("D") + "-" + i).html(val.trim());
        }
    }
}



displayCurrentTime();
displaySchedule();
loadLocalStorageContent();