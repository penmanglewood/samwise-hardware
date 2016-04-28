/*global Framework7, Dom7, Template7, moment */

(function (Framework7, $$, T7, moment) {
    'use strict';

var sensors = [
{ title : "Humidity",
  id : "humidity",
  type : "heatmap2" 
},
{ title : "Soil Moisture",
  id : "moisture",
  type : "line" 
},
{ title : "Light",
  id : "light",
  type : "heatmap" 
},
{ title : "Ultra-Violet",
  id : "ultraviolet",
  type : "heatmap" 
},
{ title : "Temperature",
  id : "temperature",
  type : "heatmap",
},
];

var auxParams = {
    temperature : {
        colorCalibration : ['#f6faaa','#FEE08B','#FDAE61','#F46D43','#D53E4F','#9E0142'],
        data : testData
    },
    humidity : {
        data : testData,
        startColor : "#ffffff",
        endColor : "steelblue"
    },
    moisture : {
        data : testData,
        startColor : "steelblue",
        endColor : "navy"
    },
    light : {
        colorCalibration : ['#272901','#4f5202','#7e8203','#c5cc06','#eef527','#f1f57a'],
        data : testData
    },
    ultraviolet : {
        colorCalibration : ['#f6defa','#f2c5fa','#f09eff','#e466fa','#b922d4','#bd00a6'],
        data : testData
    }
};

    // Helpers
    T7.registerHelper('time_ago', function (time) {
        return moment.unix(time).fromNow();
    });
    T7.registerHelper('array_length', function (arr) {
        return arr ? arr.length : 0;
    });
    T7.registerHelper('pluralize', function (arr, options) {
        return (arr.length === 1) ? options.hash.single : arr.length + " " + options.hash.multiple;
    });
    T7.registerHelper('notEmpty', function (value) {
        return value || 0;
    });

    var app, mainView, leftView, splitView, allowCommentsInsert;

    // Init App
    app = new Framework7({
        modalTitle: 'Gardening..',
        animateNavBackIcon: true,
        precompileTemplates: true,
        template7Pages: true,
        externalLinks: 'a.external, .message a',
        router: true
    });

    // Add Right/Main View
    mainView = app.addView('.view-main', {
        dynamicNavbar: true,
        animatePages: false,
        swipeBackPage: false,
        reloadPages: true,
        preloadPreviousPage: false
    });

    // Add Left View
    leftView = app.addView('.view-left', {
        dynamicNavbar: true
    });

    function checkSplitView() {
        var activeStoryLink;
        delete leftView.params.linksView;
        if (splitView) {
            // Need to check main view history and load same page into left view
            activeStoryLink = $$('.stories-list a.item-link.active-story');
            if (mainView.history.length > 1 && activeStoryLink.length > 0) {
                leftView.router.load({
                    animatePages: false,
                    url: activeStoryLink.attr('href'),
                    contextName: activeStoryLink.attr('data-contextName')
                });
            }
        }
        splitView = false;
    }
    $$(window).resize(checkSplitView);
    checkSplitView();

    var endpoint = "https://sght3h0n5j.execute-api.ap-northeast-1.amazonaws.com/live";

    var currentValues = {
        humidity:"Loading...",
        temperature:"Loading...",
        light:"Loading...",
        moisture:"Loading...",
        ultraviolet:"Loading..."
    };

    var ws = new WebSocket("ws://iot.m18.io:9292/update");
    ws.onopen = function (event) {
        ws.send("Here's some text that the server is urgently awaiting!"); 
    };
    ws.onmessage = function (event) {
        var data = JSON.parse(event.data);
        currentValues[data.sensor] = data.value;
        console.log("got data from websockets",event.data);
        console.log(currentValues)
        $$('#page-header').html(T7.templates.currentValuesTemplate(currentValues))
    }

    function getLatestValues() {
        sensors.forEach(function(sensor){
            $$.get(endpoint,
            {
                sensor:sensor.id,
                timestamp:0
            },function(stuff) {
                var data = JSON.parse(stuff).Items[0];
                currentValues[sensor.id] = data.value
                $$('#page-header').html(T7.templates.currentValuesTemplate(currentValues))
            });
        })
    }

    getLatestValues();

    // Fetch Stories
    function getPlantData(refresh) {
        //app.showPreloader('Loading plant data..');
        app.pullToRefreshDone();
        $$('.refresh-link.refresh-home').removeClass('refreshing');
        app.template7Data.stories = sensors;
        $$('.page[data-page="index"] .page-content .list-block').html(T7.templates.storiesTemplate(sensors));
        $$('#page-header').html(T7.templates.currentValuesTemplate(currentValues))
        return sensors;
    }

    $$(".panel.panel-right").html(T7.templates.userTemplate({}));

    // Update stories on PTR
    $$('.pull-to-refresh-content').on('refresh', function () {
        $$('.refresh-link.refresh-home').addClass('refreshing');
        getPlantData(true);
    });
    $$('.refresh-link.refresh-home').on('click', function () {
        var clicked = $$(this);
        if (clicked.hasClass('refreshing')) {
            return;
        }
        clicked.addClass('refreshing');
        getPlantData(true);
    });

    $$('#dispense-water').on('click',function () {
        $$.get('https://p9cx91bqc5.execute-api.ap-northeast-1.amazonaws.com/live');
    });

    $$('#threshold-add').on('click',function () {
        var threshold = parseInt($$('#threshold-value').html())
        if (threshold < 100) {
            threshold = threshold + 1;
        }
        $$('#threshold-value').html(threshold);
    });

    $$('#threshold-minus').on('click',function () {
        var threshold = parseInt($$('#threshold-value').html())
        if (threshold > 0) {
            threshold = threshold - 1;
        }
        $$('#threshold-value').html(threshold);
    });

    app.onPageInit('item', function (page) {
        var width = $$(window).width();
        app.showPreloader('Loading data..');
        $$.get(endpoint,
            {
                sensor:page.query.id,
                timestamp:1461686400000
            },function(stuff) {
                app.hidePreloader()
                console.log(stuff)
                var data = JSON.parse(stuff).Items;
                if (page.query.id == 'temperature') {
                    data.forEach(function(d){
                        if (d.value < 0) {
                            d.value = d.value * -1
                        } else if (d.value < 1) {
                            d.value = d.value * 1000;
                        }
                        if (d.value > 45) {
                            d.value = d.value - 25;
                        }
                    });
                } else if (page.query.id == 'moisture') {
                    data.forEach(function(d){
                        if (d.timestamp < 1461724113100) {
                            d.value = 50;
                        }
                    });
                }
                if (page.query.type == "line") {
                    drawLineGraph(data,"chart",width);
                } else if (page.query.type == "heatmap") {
                    drawHeatMap(data,"chart",auxParams[page.query.id].colorCalibration,width);
                } else if (page.query.type == "heatmap2") {
                    drawHeatMap2(data,"chart",auxParams[page.query.id].startColor,auxParams[page.query.id].endColor,width,page.query.id);
                }
            });
    });
    app.onPageAfterAnimation('item', function (page) {
    });
    app.onPageBack('item', function () {
        allowCommentsInsert = false;
    });
    $$(document).on('click', '.message a', function (e) {
        e.preventDefault();
        window.open($$(this).attr('href'));
    });
    // Get and parse stories on app load
    getPlantData(true);

    // Export app to global
    window.app = app;

}(Framework7, Dom7, Template7, moment));