$(document).ready(function () {
    $("#product").hide();
});

function edValueKeyPress() {
    debugger;
    if ($("#txtsearch").val == '') {
        $('#product').empty("")
    }
    {
        searchProduct();
    }
}

$("#search-icon").click(function () {
    $('.search-overlay').addClass('active-search-overlay');
});
$("#close").click(function () {
    $('.search-overlay').removeClass('active-search-overlay');
});




$("#close").click(function () {
    debugger;
    $('#txtsearch').val("");
    $('#product').empty("")
});


$(document).ready(function () {
    $('input[type="text"]').keyup(function (e) {
        if (e.keyCode == 27) {
            $('#txtsearch').val("");
            $('#product').empty("")
        }
    });
});