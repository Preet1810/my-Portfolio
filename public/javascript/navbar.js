

$(window).scroll(function () {
    const scroll=$(window).scrollTop();

    if (scroll>=700) {
        $(".navbar").addClass("fixed-top");
    } else {
        $(".navbar").removeClass("fixed-top");
    }
});