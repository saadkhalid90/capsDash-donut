function drawDonutArc(percent, innerRad, outerRad, arcStyle, backGrndStyle1, backGrndStyle2) {
  const width = 400;
  const height = 400;
  // svg selection
  const svgG = d3.select('svg.donutArc')
                .append('g')
                .attr('transform', "translate(" + width / 2 + "," + height / 2 +")");

  // arc function to draw the arc
  const arc = d3.arc()
    	.innerRadius(innerRad)
    	.outerRadius(outerRad)

  const backGrndArc = d3.arc()
    	.innerRadius(0)
    	.outerRadius((outerRad + innerRad)/ 2)

  let datum = [{
  	"data": percent,
  	"index": 0,
  	"value": percent,
  	"startAngle": 0,
  	"endAngle": computeEndAngle(percent),
  	"padAngle": 0
  }];

  function createDatum(endAngle){
    return {
      "data": percent,
    	"index": 0,
    	"value": percent,
    	"startAngle": 0,
    	"endAngle": endAngle,
    	"padAngle": 0
    }
  };

  //datum = [createDatum(computeEndAngle(percent))];

  svgG.selectAll('path.arc')
      .data(datum)
      .enter()
      .append('path')
      .classed('arc', true)
      .styles(arcStyle)
      .transition()
      .delay(100)
      .duration(1000)
      .attrTween('d', d => {
        return function(t){
          const endAngleInterp = d3.interpolate(createDatum(0), d);
          return arc(endAngleInterp(t));
        }
      });

  if (backGrndStyle1){
    svgG.append('path')
        .classed('backGrndArc', true)
        .attr('d', arc(createDatum(Math.PI * 2)))
        .style('fill', 'none')
        .style('stroke', 'grey');
  }

  if (backGrndStyle2){
    svgG.append('path')
        .classed('backGrndArc', true)
        .attr('d', backGrndArc(createDatum(Math.PI * 2)))
        .style('fill', 'none')
        .style('stroke', 'grey')
        .style('stroke-dasharray', 2);

  }

  function computeEndAngle(percent){
    return (2 * Math.PI) * (percent/ 100);
  }
}

drawDonutArc(
  15,
  160,
  200,
  {
    'fill': 'grey'
  },
  false,
  true
);
