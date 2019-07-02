$(document).ready(function() {
    $(".navbar-link").click(function() {
        let leftValue = $(this).attr("data-value");
        $("#content-div").animate({left: leftValue}, 1000)
    })

    var blogID = "780172493463723194";

    $.ajax({
        url: `https://www.googleapis.com/blogger/v3/blogs/${blogID}/posts?&key=AIzaSyDVmEf5myTpxk-GbSKjxjy0Zbg6UMNbvtQ`,
        method: "GET"
    }).then(function(response) {
        let posts = response.items;
        let titleList = $("#title-list");
        let postBucket = $("#writing-bucket");
        let postCount = 0;
        for (let post of posts) {
            let card = $("<div>");
            card.attr("class", "card");
            card.attr("id", "post-" + postCount)
            let h3 = $("<h3>");
            h3.text(post.title);
            card.append(h3);
            let p = $("<p>");
            let content = post.content.replace("\\n", "").replace("\\", "");
            p.html(content);
            card.append(p);
            postBucket.append(card);
            let li = $("<li>");
            let a = $("<a>");
            a.attr("href", "#post-" + postCount);
            a.attr("class", "writing--link");
            a.text(post.title);
            li.append(a);
            titleList.append(li);
            postCount++;
        }
    })

    $("#send-button").click(function () {
        var template_params = {
            "name": $("#name").val(),
            "email": $("#email").val(),
            "subject": $("#subject").val(),
            "message": $("#message").val()
        }

        var service_id = "gmail";
        var template_id = "alisa_email";
        emailjs.send(service_id, template_id, template_params);
        $("#name").val(""),
        $("#email").val(""),
        $("#subject").val(""),
        $("#message").val("")
    })
})