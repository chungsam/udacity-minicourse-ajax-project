function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    function loadStreetView() {
        var streetviewUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";

        var streetStr = $('#street').val();
        var cityStr = $('#city').val();
        var address = streetStr + ' ' + cityStr;

        var imgSrcUrl = streetviewUrl.concat(address);

        // update greeting
        $greeting.text('So, you want to live at ' + address + '?');

        // remove old img element if it exists
        $('#streetViewImage').remove();

        // create new img element
        var img = document.createElement('img');
        img.id = 'streetViewImage';
        img.src = imgSrcUrl;
        img.className = 'bgimg';

        $('body').append(img);
    }

    // NYTimes 
    function loadNYTimes() {
        var apiKey = '8654bfe302db4179bb820d3916338074';
        var baseUrl = '';
    }





    return false;
};

$('#form-container').submit(loadData);