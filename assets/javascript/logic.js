$(document).ready(function() {
    $(".navbar-link").click(function() {
        let leftValue = $(this).attr("data-value");
        $("#content-div").animate({left: leftValue}, 1000)
    })
})