var drawHeatMap = function(heatmapData,chartId,colorCalibration,screenWidth){
  var data = JSON.parse(JSON.stringify(heatmapData));
  //UI configuration
  var itemSize = 18,
    cellSize = itemSize-1,
    width = screenWidth,
    height = 1200,
    margin = {top:20,right:20,bottom:20,left:25};

  //formats
  var hourFormat = d3.time.format('%H'),
    dayFormat = d3.time.format('%j'),
    timeFormat = d3.time.format('%Y-%m-%dT%X'),
    monthDayFormat = d3.time.format('%m.%d');

  //data vars for rendering
  var dateExtent = null,
    dayOffset = 0,
    dailyValueExtent = {};

  //axises and scales
  var axisWidth = 0 ,
    axisHeight = itemSize*60,
    xAxisScale = d3.time.scale(),
    xAxis = d3.svg.axis()
      .orient('top')
      .ticks(d3.time.days,3)
      .tickFormat(monthDayFormat),
    yAxisScale = d3.scale.linear()
      .range([0,axisHeight])
      .domain([0,60]),
    yAxis = d3.svg.axis()
      .orient('left')
      .ticks(12)
      .tickFormat(d3.format('02d'))
      .scale(yAxisScale);

  initCalibration();

  var svg = d3.select('[role="heatmap"]');
  var heatmap = svg
    .attr('width',width)
    .attr('height',height)
  .append('g')
    .attr('width',width-margin.left-margin.right)
    .attr('height',height-margin.top-margin.bottom)
    .attr('transform','translate('+margin.left+','+margin.top+')');
  var rect = null;

  data.forEach(function(valueObj){
    valueObj.date = new Date(valueObj.timestamp);
    var day = valueObj.day = monthDayFormat(valueObj.date);
    var dayData = dailyValueExtent[day] = (dailyValueExtent[day] || [1000,-1]);
    var pmValue = valueObj.value;
    dayData[0] = d3.min([dayData[0],pmValue]);
    dayData[1] = d3.max([dayData[1],pmValue]);
  });
  dateExtent = d3.extent(data,function(d){
    return d.date;
  });
  axisWidth = itemSize*25;
  //render axises
  xAxis = d3.scale.linear().range([0,axisWidth]).domain([0,23]);
  svg.append('g')
    .attr('transform','translate('+margin.left+','+margin.top+')')
    .attr('class','x axis')
    .call(d3.svg.axis().scale(xAxis).orient("top"))
  .append('text')
    .text('hour')
    .attr('transform','translate('+axisWidth+',-10)');
  svg.append('g')
    .attr('transform','translate('+margin.left+','+margin.top+')')
    .attr('class','y axis')
    .call(yAxis)
  .append('text')
    .text('minutes')
    .attr('transform','translate(-10,'+(70)+') rotate(-90)');
  //render heatmap rects
  dayOffset = dayFormat(dateExtent[0]);
  rect = heatmap.selectAll('rect')
    .data(data)
  .enter().append('rect')
    .attr('width',cellSize)
    .attr('height',cellSize)
    .attr('x',function(d){
      return itemSize*d.date.getHours();
    })
    .attr('y',function(d){            
      return d.date.getMinutes()*itemSize;
    })
    .attr('fill','#ffffff');
  rect.filter(function(d){ return d.value>0;})
    .append('title')
    .text(function(d){
      return monthDayFormat(d.date)+' '+d.value;
    });
  renderColor();

  function initCalibration(){
    d3.select('[role="calibration"] [role="example"]').select('svg')
      .selectAll('rect').data(colorCalibration).enter()
    .append('rect')
      .attr('width',cellSize)
      .attr('height',cellSize)
      .attr('x',function(d,i){
        return i*itemSize;
      })
      .attr('fill',function(d){
        return d;
      });
  }

  function renderColor(){
    rect
      .filter(function(d){
        return (d.value>=0);
      })
      .transition()
      .delay(function(d){      
        return (dayFormat(d.date)-dayOffset)*15;
      })
      .duration(500)
      .attrTween('fill',function(d,i,a){
        //choose color dynamicly      
        var colorIndex = d3.scale.quantize()
          .range([0,1,2,3,4,5])
          .domain(dailyValueExtent[d.day]);

        return d3.interpolate(a,colorCalibration[colorIndex(d.value)]);
      });
  } 
};
