delete sessionStorage['shippingCost'];
var newCart="";
//delete sessionStorage['promoCode'];
window.addEventListener('load', function(){

    var basketBox = document.getElementById("basketBox");
    var shippingBox = document.getElementById("shippingBox");
    var cartBoxes = document.getElementsByClassName("cartBox");


    start();
    totalSummary();


    function basketCount()
    {
        cartBoxes = document.getElementsByClassName("cartBox");
        var count = 0;
        for(var i = 0;i<cartBoxes.length;i++)
        {
            count++;

            sessionStorage['basketCount'] = count.toString();
            $("#inBasket p").text(sessionStorage['basketCount']);
            console.log(sessionStorage['basketCount']);
        }
    }


    $("#clear").on('click', clear);
    $("#promoCode").on('change', function(){
        //        $('#promoCode').css('color','black');
        if($("#promoCode").val() == "HELLO")
        {
            $("#promotionCost").html("<b>Promotion/Gift Code Credit: </b>-$4.00");
            sessionStorage['promoCode'] = "4.00";
            $('#promoCode').css('color','green');
        }
        else
        {
            $("#promoCode").val(""); 
            $('#promoCode').attr("placeholder",'ERROR!');
            $("#promotionCost").html("<b>Promotion/Gift Code Credit: </b>$0.00");  
            sessionStorage['promoCode'] = "0.00";
        }
        totalSummary();
        //        location.reload();
    });

    function start()
    {

        if(localStorage['buyBoolean'] === 'true')
        {

            var tmpJSON = localStorage["imageJSON"];
            var selectedWords = JSON.parse(tmpJSON);
            //            console.log(selectedWords);
            localStorage['buyBoolean'] = 'false';
            var wordArray = [];
            var arrayCount = wordArray.length;
            if(sessionStorage['wordArray'] === undefined)
            {


            }
            else
            {
                var tmp = sessionStorage['wordArray']
                wordArray = JSON.parse(tmp);
            }


            newCart = '<div class="cartTest row"><div id="cartBoxContainer" class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8"><div class="cartBox" value ="'+localStorage['price']+'" id='+localStorage['frameStyle']+'>';
            for(var i=0;i<selectedWords.length;i++)
            {
                newCart += `
<input disabled class ="imageLetter" type="image" src="`+selectedWords[i]+`">

`;
            }
            newCart += '</div></div><div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"><div class="removeBox "><button class="remove" type="button">&times; remove</button><p>$'+(parseInt(localStorage['price'])).toFixed(2)+'</p></div></div></div><br>';
            wordArray.push(newCart);
            arrayCount++;
            //            console.log(wordArray);        
            for(var i=0;i<wordArray.length;i++)
            {
                //                console.log(wordArray[i]);
                basketBox.innerHTML += wordArray[i];
            }
            sessionStorage['wordArray'] = JSON.stringify(wordArray);
            var tmpCartBox = document.getElementsByClassName("cartBox");
            for(var i=0;i<tmpCartBox.length;i++)
            {
                if(tmpCartBox[i].getAttribute('id') == "undefined")
                {
                    tmpCartBox[i].style.border = "none";
                }
            }
            //            console.log(sessionStorage['wordArray']);
        }
        else
        {
            if(sessionStorage['wordArray'] === undefined)
            {

            }
            else
            {
                var wordArray = [];
                var tmp = sessionStorage['wordArray']
                wordArray = JSON.parse(tmp);
                for(var i=0;i<wordArray.length;i++)
                {
                    basketBox.innerHTML += wordArray[i];
                }
                var tmpCartBox = document.getElementsByClassName("cartBox");
                for(var i=0;i<tmpCartBox.length;i++)
                {
                    if(tmpCartBox[i].getAttribute('id') == "undefined")
                    {
                        tmpCartBox[i].style.border = "none";
                    }
                }
            }
        }

        basketCount();

        if(sessionStorage["basketCount"] === undefined || sessionStorage["basketCount"] === "0")
        {

            console.log("shipping missing");
        }
        else
        {
            $("#shippingOption").show();
            $("#promoCode").show();
            calculatePrice();

            $("#standard").click(function(){
                sessionStorage["shippingCost"] = "6.00";
                totalSummary();
            });
            $("#express").click(function(){
                sessionStorage["shippingCost"] = "20.00";
                totalSummary();

            });
        }
        var deleteDiv = document.getElementsByClassName('remove');
        for(var i=0;i<deleteDiv.length;i++)
        {
            deleteDiv[i].addEventListener('click', remove.bind(null,i));
        }

        function remove(i)
        {
            cartBoxes = document.getElementsByClassName('cartBox');
            var deleteAmount = cartBoxes[i].getElementsByTagName('input').length;
            var subPrice = parseFloat(sessionStorage['totalPrice']);
            var wordArray = JSON.parse(sessionStorage['wordArray']);
            //            console.log(wordArray);
            //            console.log(wordArray[i]);
            wordArray.splice(i,1);
            //            console.log(wordArray);
            sessionStorage['wordArray'] = JSON.stringify(wordArray);

            sessionStorage['basketCount'] = (parseInt(sessionStorage['basketCount']) - 1).toString();

            $("#inBasket p").text(sessionStorage['basketCount']);

            var tmp = parseFloat(sessionStorage['totalPrice']);
            console.log(sessionStorage['totalPrice']);
            sessionStorage['totalPrice'] = tmp - parseFloat(cartBoxes[i].getAttribute('value'));

            //            console.log(sessionStorage['totalPrice']);

            calculatePrice();
            totalSummary();
            location.reload();
        }






    } 

    function calculatePrice()
    {
        //        console.log(sessionStorage['totalPrice']);
        var price = parseFloat(sessionStorage["totalPrice"]);
        //        console.log(price);       
        sessionStorage['price'] = price.toFixed(2);

    }

    function clear()
    {
        basketBox.innerHTML = `<h3>Items In Your Basket</h3>
<a href="index.html" class="basketButtons">CONTINUE SHOPPING</a>
<br>
<button class="basketButtons" type="button" id="clear">CLEAR BASKET</button>
<br>`; 
        $("#shippingBox").html("");
        localStorage["imageJSON"] = "";
        delete localStorage["imageJSON"];
        sessionStorage['price'] = "0";
        delete sessionStorage['wordArray'];
        sessionStorage['totalPrice'] = "0";

        //        sessionStorage["wordArray"].prop = undefined; 
        sessionStorage["basketCount"] = "0";
        wordArray = [];
        newCart = "";
        location.reload();
    }

    function totalSummary()
    {
        if(sessionStorage['price'] === undefined || sessionStorage['price'] === "0")
        {

            $("#price").html("<b>Item Total: </b>$0.00");
        }
        else
        {

            $("#price").html("<b>Item Total: </b>$"+sessionStorage['price']);
        }

        if(typeof sessionStorage['shippingCost'] === 'undefined')
        {
            $("#shippingCost").html("<b>Shipping: </b>Please Select");
        }
        else
        {
            $("#shippingCost").html("<b>Shipping: </b>$"+sessionStorage['shippingCost']);
        }
        if(sessionStorage['promoCode'] === undefined)
        {
            sessionStorage['promoCode'] ="0";
        }

        var totalCost = parseFloat(sessionStorage['price']) - parseFloat(sessionStorage['promoCode']) + parseFloat(sessionStorage['shippingCost']);

        if(sessionStorage['shippingCost'] === undefined)
        {
            $("#totalCost").html("<b>Total: </b>");
        }
        else
        {
            $("#totalCost").html("<b>Total: </b>$"+totalCost.toFixed(2));
            var totalWithoutShipping = parseFloat(sessionStorage['price']) - parseFloat(sessionStorage['promoCode']);
            document.getElementById("paypalPrice").value= totalWithoutShipping;
            document.getElementById("paypalBusiness").value= "4HKHZ32C9ZXAN";
            document.getElementById("paypalShipping").value= sessionStorage['shippingCost'];
            $("#paypal").show();
        }


    }





});