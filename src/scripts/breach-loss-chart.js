import * as d3 from 'd3'

const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 400 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-2')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scalePoint()
  .domain([2014, 2015, 2016, 2017, 2018, 2019])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 870])
  .range([height, 0])

const colorScale = d3.scaleOrdinal().range(['#7bccc4', '#2b8cbe'])

const line = d3
  .line()
  .x(d => xPositionScale(d.year))
  .y(d => yPositionScale(d.counts))

d3.csv(require('../data/breach-losses.csv'))
  .then(ready)
  .catch(err => {
    console.log(err)
  })

function ready(datapoints) {
  const nested = d3
    .nest()
    .key(function(d) {
      return d.orgtype
    })
    .entries(datapoints)

  svg
    .selectAll('g')
    .data(nested)
    .enter()
    .append('path')
    .attr('d', d => line(d.values))
    .attr('fill', 'none')
    .attr('stroke', d => colorScale(d.key))
    .attr('stroke-width', 1.5)

  const yAxis = d3.axisLeft(yPositionScale)
  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)

  const xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
}
