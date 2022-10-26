

$(window).scroll(function () {
    const scroll=$(window).scrollTop();

    if (scroll>=800) {
        $(".navbar").addClass("fixed-top");
    } else {
        $(".navbar").removeClass("fixed-top");
    }
});


