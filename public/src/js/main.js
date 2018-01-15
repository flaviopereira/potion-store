var xhttp = new XMLHttpRequest();
var contentLoader = document.getElementById('mainContent');
var priceContainer = document.getElementById('priceContainer');
var levelContainer = document.getElementById('levelContainer');
var tagContainer = document.getElementById('tagContainer');
var prices = [];
var levels = [];
var tags = [];

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText),
            price, reqLevel, tag,
            htmlOutput = '',
            priceOutput = '',
            reqLevelOutput = '',
            tagsOutput = '';

        for (var k in json.potions) {
            price = json.potions[k].price;
            reqLevel = json.potions[k].required_level;
            tag = json.potions[k].tags;

            arrayPush(price, prices);
            arrayPush(reqLevel, levels);
            for (var y in tag) {
                arrayPush(tag[y], tags);
            }

            htmlOutput += renderItem(json.potions[k]);

        }

        priceOutput += renderFilter(prices);
        reqLevelOutput += renderFilter(levels);
        tagsOutput += renderFilter(tags);

        console.log(prices);
        console.log(levels);
        console.log(tags);

        contentLoader.innerHTML = htmlOutput;
        priceContainer.innerHTML = priceOutput;
        levelContainer.innerHTML = reqLevelOutput;
        tagContainer.innerHTML = tagsOutput;
    }
};

function arrayPush(item, dist) {
    if (dist.indexOf(item) < 0) {
        dist.push(item);
    }
};

function renderItem(data) {
    console.log(data);
    var output = '';

    output += '<div data-tags="'+ data.tags.join(' ') +'">';
    output += '<p>Name: ' + data.name + '</p>';
    output += '<p>Price: ' + data.price + '</p>';
    output += '<img src="img/' + data.id + '.png">';
    output += '</div>';

    return output;
}

function renderFilter(data) {
    var output = '';

    for (var k in data) {
        output += '<a href="#">' + data[k] + '</a>';
    }

    return output;
}

xhttp.open("GET", "http://localhost:3000/api", true);
xhttp.send();
