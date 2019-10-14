import * as d3 from 'd3'

const margin = { top: 50, left: 50, right: 50, bottom: 50 }
const height = 400 - margin.top - margin.bottom
const width = 700 - margin.left - margin.right

const svg = d3
  .select('#chart-1')
  .append('svg')
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

const xPositionScale = d3
  .scaleBand()
  .domain([2014, 2015, 2016, 2017, 2018, 2019])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 1200])
  .range([height, 0])

const totals = [
  { year: '2014', counts: 790 },
  { year: '2015', counts: 795 },
  { year: '2016', counts: 1104 },
  {
    year: '2017',
    counts: 1002
  },
  { year: '2018', counts: 1198 },
  { year: '2019', counts: 699 }
]

svg
  .selectAll('rect')
  .data(totals)
  .enter()
  .append('rect')
  .attr('width', width / totals.length - 10)
  .attr('height', d => {
    return height - yPositionScale(d.counts)
  })

  .attr('x', d => xPositionScale(d.year))
  .attr('y', d => yPositionScale(d.counts))
  .attr('fill', 'pink')

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
