$(document).ready(function () {
    var theForm = $("#theForm");
    theForm.hide = true;

    var button = $("#buyButton");
    button.on("click", function () {
        console.log("Buying Button");
    });

    var productInfo = $(".product-props li");
    productInfo.on("click", function () {
        console.log($(this).text());
    });

    var $loginToggle = $("#loginToggle");
    var $popupForm = $('.popup-form');

    $loginToggle.on("click", function () {
        $popupForm.toggle(1000);
    });
});