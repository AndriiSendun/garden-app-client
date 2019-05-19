import * as d3 from "d3";

export const ChartModel = function() {};

ChartModel.prototype.init = function(opts) {
  this.selector = opts.selector;
  this.hourDomainStart = opts.data[0].hour;
  this.hourDomainEnd = opts.data[opts.data.length - 1].hour;
  this.xTicksAmount = opts.data.length;
};

ChartModel.prototype.clear = function() {
  this.svg.remove();
};

ChartModel.prototype.draw = function() {
  this.margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };

  this.width = 600 - this.margin.left - this.margin.right;
  this.height = 350 - this.margin.top - this.margin.bottom;
  this.svg = d3
    .select(`.${this.selector}-chart__container`)
    .attr("preserveAspectRatio", "none")
    .attr(
      "viewBox",
      `0 0  ${this.width + this.margin.left + this.margin.right} ${this.height +
        this.margin.top +
        this.margin.bottom}`
    )
    .append("g")
    .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

  this.createGradient();
  this.createScales();
  this.addAxes();
};

ChartModel.prototype.createGradient = function() {
  // Create gradient
  const defs = this.svg.append("defs");

  const gradient = defs
    .append("linearGradient")
    .attr("id", this.selector)
    .attr("x1", "0%")
    .attr("x2", "0")
    .attr("y1", "0%")
    .attr("y2", "100%");

  gradient
    .append("stop")
    .attr("class", "start")
    .attr("offset", "0%");

  gradient
    .append("stop")
    .attr("class", "stop")
    .attr("offset", "100%");
};

ChartModel.prototype.createScales = function() {
  // X scale
  this.xScale = d3
    .scaleLinear()
    .domain([this.hourDomainStart, this.hourDomainEnd])
    .range([0, this.width]);

  // Y scale
  this.yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([this.height, 0]);
};

ChartModel.prototype.addAxes = function() {
  const yAxisLabelText = {
    water: "Soil moisture",
    temperature: "Temperature",
    air: "Air humidity"
  };

  // Call the x axis in a group tag
  this.svg
    .append("g")
    .attr("class", "axis axis--x")
    .attr("transform", `translate(0, ${this.height})`)
    .call(
      d3
        .axisBottom()
        .scale(this.xScale)
        .ticks(this.xTicksAmount)
        .tickSize(0)
        .tickPadding(10)
    );

  // Call the y axis in a group tag
  this.svg
    .append("g")
    .attr("class", "axis axis--y")
    .call(
      d3
        .axisLeft()
        .scale(this.yScale)
        .tickSize(-this.width)
        .ticks(6)
        .tickPadding(10)
        .tickFormat(d3.format("0"))
    )
    .select(".domain")
    .remove();

  //Append label for x axis
  this.svg
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", `translate(${this.width / 2}, ${this.height + 25})`)
    .style("text-anchor", "middle")
    .style("fill", "#333")
    .style("font-size", "0.9rem")
    .attr("dy", "1em")
    .text("Time (hours)");

  //Append label for y axis
  this.svg
    .append("text")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - this.margin.left)
    .attr("x", 0 - this.height / 2)
    .attr("dy", "1em")
    .style("font-size", "0.9rem")
    .style("text-anchor", "middle")
    .style("fill", "#333")
    .text(yAxisLabelText[this.selector]);
};

ChartModel.prototype.addArea = function(data) {
  this.data = data;
  const _this = this;

  const clip = this.svg.append("clipPath").attr("id", `${this.selector}-clip`);
  const clipRect = clip
    .append("rect")
    .attr("width", 0)
    .attr("height", this.height);

  // line generator
  const line = d3
    .line()
    .x(d => _this.xScale(d.hour))
    .y(d => _this.yScale(d.value))
    .curve(d3.curveMonotoneX);

  // area generator
  const area = d3
    .area()
    .x(d => _this.xScale(d.hour))
    .y0(this.height)
    .y1(d => _this.yScale(d.value))
    .curve(d3.curveMonotoneX); //apply smoothing to the line

  // Append the path, bind the data, and call the area generator
  this.svg
    .data(this.data) //bind data
    .append("path")
    .transition()
    .duration(2400)
    .attr("d", area(this.data)) //Calls the area generator
    .attr("fill", `url(#${this.selector})`)
    .attr("clip-path", `url(#${this.selector}-clip)`);

  // Append the path, bind the data, and call the line generator
  this.svg
    .data(this.data)
    .append("path")
    .transition()
    .duration(2400)
    .attr("class", `${this.selector}-chart__path`)
    .attr("stroke-width", "2")
    .attr("fill", "transparent")
    .attr("d", line(this.data))
    .attr("clip-path", `url(#${this.selector}-clip)`);

  clipRect
    .transition()
    .duration(2000)
    .ease(d3.easeSin)
    .attr("width", this.width);
};

ChartModel.prototype.toolTip = function(data) {
  const dataType = {
    water: "%",
    air: "%",
    temperature: `°C`
  };
  //Apply the tooltip ability
  const _this = this; //do this because inside mousemove function can lost the context
  const focus = this.svg
    .append("g")
    .attr("class", "focus")
    .style("display", "none");

  const xLine = focus
    .append("line")
    .attr("class", "x-hover-line hover-line")
    .attr("y1", 0);

  const yLine = focus
    .append("line")
    .attr("class", "y-hover-line hover-line")
    .attr("x1", 0)
    .attr("x2", 0);

  focus
    .append("circle")
    .attr("class", "focus-circle")
    .attr("r", 8);

  const focus_g = focus.append("g").attr("class", `${this.selector}-tip`);

  focus_g
    .append("rect")
    .attr("class", `${this.selector}-tip__rect`)
    .attr("fill", "#5E5E5E")
    .attr("rx", "5")
    .attr("rx", "5");

  const tipRectWidth = 140;

  const tipText = focus_g
    .append("text")
    .attr("class", `${this.selector}-tip__text`)
    .attr("x", `${tipRectWidth / 2}`)
    .attr("y", "15")
    .attr("alignment-baseline", "middle")
    .attr("text-anchor", "middle")
    .attr("font-family", "Roboto")
    .attr("fill", "#fff");

  this.svg.on("mouseover", () => focus.style("display", null));
  this.svg.on("mouseout", () => focus.style("display", "none"));
  this.svg.on("mousemove", mousemove);

  function mousemove() {
    const bisectData = d3.bisector(d => d.hour).left;
    const x0 = _this.xScale.invert(d3.mouse(this)[0]);
    let i = bisectData(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i] || data[data.length - 1];
    const d = x0 - d0.hour > d1.hour - x0 ? d1 : d0;

    focus.attr(
      "transform",
      `translate(${_this.xScale(d.hour)}, ${_this.yScale(d.value)})`
    );

    xLine.attr("y2", _this.height - _this.yScale(d.value));
    yLine.attr("x1", -(_this.width - (_this.width - _this.xScale(d.hour))));
    tipText.text(
      () =>
        `${_this.selector}: ${parseInt(d.value * 100)}${
          dataType[_this.selector]
        }`
    );
    if (d.hour === data[data.length - 1].hour) {
      focus_g.attr("transform", `translate(-${tipRectWidth}, -50)`);
    } else if (d.hour === data[0].hour) {
      focus_g.attr("transform", `translate(0, -50)`);
    } else {
      focus_g.attr("transform", `translate(-${tipRectWidth / 2}, -50)`);
    }
  }
};
