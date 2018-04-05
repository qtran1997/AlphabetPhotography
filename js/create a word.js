delete localStorage['frameStyle'];
if(sessionStorage['totalPrice'] === undefined)
{
    sessionStorage['totalPrice'] = "0";
}
window.addEventListener('load', function(){
    var imageLetterSuggestion = document.getElementsByClassName("imageLetterSuggestion");
    var nav = document.getElementsByTagName("nav");
    var body = document.getElementsByTagName("body");
    var frameToggle = false;

    var input= window.location.search;
    //    input = input.replace("[\\+]", "");
    input = input.replace(/\+/g, "");
    for(var i=0; i <input.length;i++)
    {
        if(input[i] == "=" )
        {
            input = input.substr(i+1);
            break;
        }

    }
    if(input.length == 0)
    {
        input = "hello";
    }


    var cartBoxes = document.getElementsByClassName("cartBox");
    var createWordContainer = document.getElementById("createWordContainer");
    var imageContainer = document.getElementById("imageContainer");
    var imageLetter = document.getElementsByClassName("imageLetter");
    var frameButtons = document.getElementsByClassName("frameBox");
    var exit = document.getElementById("exit");
    var modalBox = document.getElementById("modalBox");
    var imageSuggestion = document.getElementById("imageSuggestion");
    var buyingContainer = document.getElementById("buyingContainer");
    var buyButton = document.getElementById("buy");
    var imageJSON = [];

    parseImage();
    var price = 6;
    price *= input.length;
    pricing();
    buyButton.addEventListener('click', buy);
    for(var i=0;i<frameButtons.length;i++)
    {
        frameButtons[i].style.backgroundColor = "white";
        frameButtons[i].addEventListener('click',frameButton.bind(null,i));

    }


    for(var i=0;i<imageLetter.length;i++)
    {
        imageLetter[i].addEventListener("click", popModalBox.bind(null, i, imageLetter[i].src));
    }


    exit.addEventListener('click', exitModalBox);
    function exitModalBox()
    {
        $("#modalBox").modal('hide');
        imageSuggestion.innerHTML = "";
        $("#themeDrop").val($("#themeDrop option:first").val());
        $("#typeDrop").val($("#typeDrop option:first").val());

    }


    function popModalBox(number, tmpLetter)
    {
        //        $(".modal-dialog").removeAttr('style');
        $("#modalBox").modal({backdrop: 'static', keyboard: false});

        var letter = tmpLetter.substring(tmpLetter.length-14, tmpLetter.length-13);
        var tmpArray = findLetter(letter);
        for(var i=0;i<tmpArray.length;i++)
        {
            var cardString = '<input class ="imageLetterSuggestion" type="image" src="./' + tmpArray[i] + '"></input>';
            
            imageSuggestion.innerHTML += cardString;
        }

        for(var i=0;i<imageLetterSuggestion.length;i++)
        {
            imageLetterSuggestion[i].addEventListener("click", replaceCard.bind(null, i, number))
        }

    }

    function replaceCard(index,number)
    {
        console.log("Being Replaced");
        console.log(imageLetter[number].src);
        console.log("Replacing With");
        console.log(imageLetterSuggestion[index].src);

        var tmp = imageLetterSuggestion[index].src.substr(imageLetterSuggestion[index].src.length-26);
        console.log(tmp);
        imageLetter[number].src = tmp;
        imageJSON[number] = tmp;
        exitModalBox();
        console.log(imageJSON);
    }

    function parseImage()
    {
        console.log(input);
        var imageFrame = '<div class="cartBox">';
        var letters = /^[A-Za-z]+$/;
        for(var i=0;i<input.length;i++)
        {
            console.log(input[i]);
            if(input[i].match(letters))
            {

                var tmpArray = findLetter(input[i]);
                var randomNumber = Math.random()*tmpArray.length;
                //                console.log(tmpArray[Math.floor(randomNumber)]);
                imageFrame += `
<input data-target="#modalBox" data-toggle="modal" data-backdrop="static" data-keyboard="false" class ="imageLetter" type="image" src="`+tmpArray[Math.floor(randomNumber)]+`">

`;
                
                console.log(imageFrame);
            console.log("DSJFHASDKLJFLSDAKJFSADLKJFSDA");
                imageJSON.push(tmpArray[Math.floor(randomNumber)]);
                //                console.log(imageJSON);
            }
            else
            {
                input = "error";
                parseImage();
                return;
                //                alert("ERROR NOT A LETTER");
            }

        }
        imageContainer.innerHTML += imageFrame;
    }

    $('#themeDrop').on('click', sort);
    $('#typeDrop').on('click', sort);

    function sort()
    {
        var selectedTheme = $('#themeDrop option:selected');
        var selectedType = $('#typeDrop option:selected');
        var suggestArr = document.getElementsByClassName("imageLetterSuggestion");
        for(var i=0;i<suggestArr.length;i++)
        {
            var imageName = suggestArr[i].src;
            imageName = imageName.substr(imageName.length-14);
            var theme = "";
            var type = "";
            if(selectedTheme.text() == "Classic")
            {
                theme = "CL";

            }
            else if(selectedTheme.text() == "Food")
            {
                theme = "FD";
            }
            else if(selectedTheme.text() == "Las Vegas")
            {
                theme = "LV";
            }
            //            console.log(theme);
            if(selectedType.text() == "Color")
            {
                type = "CO";
            }
            else if(selectedType.text() == "Black and White")
            {
                type = "BW";
            }
            else if(selectedType.text() == "Sepia")
            {
                type = "SP";
            }
            //            console.log(type);
            if(imageName.includes(theme))
            {
                if(imageName.includes(type))
                {
                    suggestArr[i].style.display = "inline-block";
                }
                else if(selectedType.text() == "ANY")
                {
                    suggestArr[i].style.display = "inline-block";
                }
                else
                {
                    suggestArr[i].style.display = "none";

                } 
            }
            else if(selectedTheme.text() == "ANY")
            {
                if(imageName.includes(type))
                {
                    suggestArr[i].style.display = "inline-block";
                }
                else if(selectedType.text() == "ANY")
                {
                    suggestArr[i].style.display = "inline-block";
                }
                else
                {
                    suggestArr[i].style.display = "none";

                } 
            }
            else
            {
                suggestArr[i].style.display = "none";

            } 
        }
        //        console.log(suggestArr.length);
    }

    function findLetter(tmp)
    {
        var letters = /^[A-Za-z]+$/;
        if(!tmp.match(letters))
        {
            return null;
        }
        var letterArray = [];
        var dir = "./Alphabet/"
        dir += tmp.toUpperCase();
        dir += "/";
        console.log(dir);
        $.ajax({
            url: dir,
            async:false,
            success: function(data){
                $(data).find("a:contains(.jpg)").each(function(){
                    var imageName = $(this).attr("href");
                    letterArray.push(imageName);
                    //                    console.log(letterArray);
                });
            }
        });
        //            console.log(dir +": " + count);
        return letterArray;
    }

    //    readTotal();
    //    function readTotal()
    //    {
    //        var total = 0;
    //        for(var i= '65'; i<='90';i++)
    //        {
    //            var dir = "Alphabet/"
    //            dir += String.fromCharCode(i);
    //            dir += "/";
    //
    //            var count = 0;
    //            $.ajax({
    //                url: dir,
    //                async:false,
    //                success: function(data){
    //                    $(data).find("a:contains(.jpg)").each(function(){
    //                        count++;
    //                    });
    //                }
    //            });
    //
    //            total += count;
    //        }
    //
    //        console.log("Total: " + total);
    //    }

    function buy()
    {
        var imageHTML = imageContainer.innerHTML;
        localStorage.setItem('buyBoolean', 'true');
        var tmp = JSON.stringify(imageJSON);
        localStorage["imageJSON"] = tmp;

        if(sessionStorage["totalLetters"] === undefined)
        {
            sessionStorage['totalLetters'] = input.length;
            localStorage['newLetterAmount'] = input.length;
        }
        else
        {
            localStorage['newLetterAmount'] = input.length;
            var tmpLetter = parseInt(sessionStorage['totalLetters']);
            tmpLetter += parseInt(input.length);
            console.log(tmp);
            tmpLetter = tmpLetter.toString();
            sessionStorage['totalLetters'] = tmpLetter;
        }
        if(sessionStorage['totalPrice'] == "0")
        {
            sessionStorage['totalPrice'] = price.toFixed(2);
        }
        else
        {
            var tmpTotalPrice = parseFloat(sessionStorage['totalPrice']);
            tmpTotalPrice+=price;
            sessionStorage['totalPrice'] = tmpTotalPrice.toFixed(2);
        }


    }

    function pricing()
    {

        //        $("#buyBox h3").text("$" + price + ".00");
        localStorage['price'] = price.toFixed(2);

    }

    function frameButton(j)
    {
        if(frameToggle == false)
        {
            $("#frameDetail").show();
            frameToggle = true;
            price+=180;
            pricing();
        }
        for(var i=0;i<frameButtons.length;i++)
        {

            if(i == j )
            {

                //                console.log(frameButtons[j]);
                if( frameButtons[j].style.backgroundColor == "rgb(221, 221, 221)" || frameButtons[j].style.backgroundColor == "rgb(255, 255, 198)" || frameButtons[j].style.backgroundColor == "rgb(239, 215, 185)")
                {
                    $("#frameDetail").hide();
                    frameButtons[j].style.backgroundColor = "white";
                    frameToggle = false;
                    price-=180;
                    pricing();
                    cartBoxes[0].style.backgroundColor = "white";
                    cartBoxes[0].style.borderBottomColor = "black";
                    cartBoxes[0].style.borderTopColor = "black";
                    cartBoxes[0].style.borderLeftColor = "black";
                    cartBoxes[0].style.borderRightColor = "black";
                    delete localStorage['frameStyle'];
                }
                else
                {
                    var frameNumber = "#frame"+(j+1);
                    //                    console.log(frameNumber);
                    if(j==0)
                    {
                        frameButtons[j].style.backgroundColor = "#DDDDDD";
                        cartBoxes[0].style.backgroundColor = "#DDDDDD";
                        cartBoxes[0].style.borderBottomColor = $(frameNumber).css("border-bottom-color");
                        cartBoxes[0].style.borderTopColor = $(frameNumber).css("border-top-color");
                        cartBoxes[0].style.borderLeftColor = $(frameNumber).css("border-left-color");
                        cartBoxes[0].style.borderRightColor = $(frameNumber).css("border-right-color");
                        $("description").html("<b>Description:</b> Solid Black Wood Frame with Black Mat");
                    }
                    else if(j==1)
                    {
                        frameButtons[j].style.backgroundColor = "#FFFFC6";
                        cartBoxes[0].style.backgroundColor = "#FFFFC6";
                        cartBoxes[0].style.borderBottomColor = $(frameNumber).css("border-bottom-color");
                        cartBoxes[0].style.borderTopColor = $(frameNumber).css("border-top-color");
                        cartBoxes[0].style.borderLeftColor = $(frameNumber).css("border-left-color");
                        cartBoxes[0].style.borderRightColor = $(frameNumber).css("border-right-color");
                        $("description").html("<b>Description:</b> Solid Beige Wood Frame with Tan Mat");
                    }
                    else
                    {
                        frameButtons[j].style.backgroundColor = "#efd7b9";
                        cartBoxes[0].style.backgroundColor = "#efd7b9";
                        cartBoxes[0].style.borderBottomColor = $(frameNumber).css("border-bottom-color");
                        cartBoxes[0].style.borderTopColor = $(frameNumber).css("border-top-color");
                        cartBoxes[0].style.borderLeftColor = $(frameNumber).css("border-left-color");
                        cartBoxes[0].style.borderRightColor = $(frameNumber).css("border-right-color");
                        $("description").html("<b>Description:</b> Solid Brown Wood Frame with Dark Mat");
                    }

                    var frameStyle = "frame"+(j+1);
                    localStorage['frameStyle'] = frameStyle;

                }
            }
            else
            {
                frameButtons[i].style.backgroundColor = "white";



            }
        }


    }















})

