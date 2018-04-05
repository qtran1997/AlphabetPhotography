if(sessionStorage["basketCount"] === undefined || sessionStorage['basketCount'] == "0")
{
    $("#inBasket p").text("0");
}
else
{

    $("#inBasket p").text(sessionStorage['basketCount']);
}
window.addEventListener('load', function(){

});