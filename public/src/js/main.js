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
        parseData(this.responseText);
    }
};

function parseData(data) {
    var json = JSON.parse(data),
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

    prices = sortByInt(prices);
    levels = sortByInt(levels);
    tags = sortByString(tags);

    priceOutput += renderFilter(prices, 'price');
    reqLevelOutput += renderFilter(levels, 'level');
    tagsOutput += renderFilter(tags, 'tag');

    contentLoader.innerHTML = htmlOutput;
    priceContainer.innerHTML = priceOutput;
    levelContainer.innerHTML = reqLevelOutput;
    tagContainer.innerHTML = tagsOutput;
};

function arrayPush(item, dist) {
    if (dist.indexOf(item) < 0) {
        dist.push(item);
    }
};

function renderItem(data) {
    var output = '';

    output += '<div class="item" data-tags="'+ data.tags.join(' ') +'">';
    output += '<p class="itemName">' + data.name + '</p>';
    output += '<img src="img/' + data.id + '.png">';
    output += '<p class="itemPrice"><b>Price:</b> ' + data.price + ' G</p>';
    output += '<p class="itemLevel"><b>Required Level:</b> ' + data.required_level + '</p>';
    output += '<p class="itemTags">Tags: ' + data.tags.join(', ') + '</p>';
    output += '</div>';

    return output;
};

function sortByInt(arr) {
    arr.sort(function (a, b) {
        return a - b;
    });
    return arr;
};
function sortByString(arr) {
    arr.sort(function(a, b) {
        var nameA = a.toUpperCase();
        var nameB = b.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }

        return 0;
    });
    return arr;
};

function renderFilter(data, filter) {
    var output = '';

    for (var k in data) {
        output += '<a href="#" class="itemFilter" data-filter="'+ filter +'" data-filterValue="' + data[k] + '" onclick=triggerFilter(this)>' + data[k] + '</a>';
    }

    return output;
};

function triggerFilter(item) {
    if (document.getElementsByClassName('active').length > 0) {
        document.getElementsByClassName('active')[0].classList.remove('active');
    }

    item.classList.add('active');

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = JSON.parse(this.responseText),
                htmlOutput = '';

            for (var k in json.potions) {
                htmlOutput += renderItem(json.potions[k]);
            }

            contentLoader.innerHTML = htmlOutput;
        }
    };
    xhttp.open("GET", "http://localhost:3000/api/filter/"+item.getAttribute("data-filter")+"/"+item.getAttribute("data-filterValue"), true);
    xhttp.send();
};

xhttp.open("GET", "http://localhost:3000/api/all", true);
xhttp.send();
