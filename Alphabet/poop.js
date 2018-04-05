
$(document).ready(function (){
    test();
    //    $.ajax
    //    ({
    //        type: "GET",
    //        url: "A/",
    //        dataType: 'json',
    //        async: false,
    //        headers: {
    //            "Authorization": "Basic " + btoa("moose10" + ":" + "moose10")
    //        },
    //        success: function (msgObject){
    //            message = msgObject;
    //            console.log(message);
    //
    //        }
    //    });


    function test(){
        var total = 0;
        for(var i= '65'; i<='90';i++)
        {
            var dir = String.fromCharCode(i);
            dir += "/";

            var count = 0;
            $.ajax({
                url: dir,
                async:false,
                success: function(data){
                    $(data).find("a:contains(.jpg)").each(function(){
                        count++;
                    });
                }
            });

            total += count;
            console.log(dir +": " + count);
        }

        console.log("Total: " + total);
    }

});
