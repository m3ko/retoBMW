$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});

<<<<<<< HEAD

        $(window).scroll(function() {
            if ($(document).scrollTop() > 50) {
                $('.nav').addClass('affix');
                console.log("OK");
            } else {
                $('.nav').removeClass('affix');
            }
        });

        $('.navTrigger').click(function () {
            $(this).toggleClass('active');
            $("#mainListDiv").toggleClass("show_list");
            $("#mainListDiv").fadeIn();
        });
=======
>>>>>>> fe720a21c2aa736c1debab782217bbf3fb0c36f4
