import * as d3 from 'd3'

const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 400 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-3')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleBand()
  .domain(['20181H', '20182H', '20191H'])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 250000])
  .range([height, 0])

const colorScale = d3
  .scaleOrdinal()
  .domain(['SSN', 'AccountNumber', 'PaymentCards', 'DrivingLicense'])
  .range(['#edf8fb', '#b2e2e2', '#66c2a4', '#238b45'])

d3.csv(require('../data/breach-types.csv'))
  .then(ready)
  .catch(err => {
    console.log(err)
  })

function ready(datapoints) {
  const nested = d3
    .nest()
    .key(function(d) {
      return d.datatype
    })
    .entries(datapoints)

  const names = nested.map(d => d.keys)
  console.log(names)

  const typeList = nested.map(d => d.values)
  console.log(typeList)

  svg
    .selectAll('.datatypes')
    .data(nested)
    .enter()
    .append('rect')
    .attr('fill', d => colorScale(d.key))

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
