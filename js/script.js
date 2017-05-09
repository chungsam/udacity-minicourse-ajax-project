function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ' ' + cityStr;

    // load streetview

    function loadStreetView() {
        var streetviewUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";


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
        $nytHeaderElem.text('Articles about ' + cityStr);
        var apiKey = '8654bfe302db4179bb820d3916338074';
        var baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
        var location = $('#city').val();

        var params = {
            'api-key': apiKey,
            'location': location
        };

        $.getJSON(baseUrl, params, function (res) {
            var docs = res.response.docs;

            docs.forEach(function (doc) {
                var article;

                // create headline element
                var $headline = document.createElement('h2');
                var $headlineLink = document.createElement('a');
                $headlineLink.innerHTML = doc.headline.main;
                $headlineLink.href = doc.web_url;
                $headlineLink.target = '_blank';
                $headline.appendChild($headlineLink);

                // create snippet element
                var $snippet = document.createElement('p');
                $snippet.innerHTML = doc.snippet;
                //a.src = doc.web

                // create article element
                article = document.createElement('li');
                article.classList.add('article');

                // append headline and snippet to article
                article.appendChild($headline);
                article.appendChild($snippet);

                // finally, append the article to the list
                $('#nytimes-articles').append(article);
            })
        }).fail(function() {
            $nytHeaderElem.text("NY Times articles couldn't be loaded!");
        });
    }



    loadStreetView();
    loadNYTimes();

    return false;
};

$('#form-container').submit(loadData);