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
  .domain(['2018, 1H', '2018, 2H', '2019, 1H'])
  .range([0, width])

const yPositionScale = d3
  .scaleLinear()
  .domain([0, 250000])
  .range([height, 0])

const totals = [
  {'datatype':'SSN',
  'values':[{
    year: '2018, 1H',
    counts: 175802
  },
  { year: '2018, 2H', counts: 55098 },
  { year: '2019, 1H', counts: 241009 }]},
  {'datatype':'Account'
  'values':[{
    year: '2018, 1H',
    counts: 150802
  },
  { year: '2018, 2H', counts: 59198 },
  { year: '2019, 1H', counts: 190009 }]},
  {'datatype':'Payment',
  'values':[{
    year: '2018, 1H',
    counts: 100802
  },
  { year: '2018, 2H', counts: 65098 },
  { year: '2019, 1H', counts: 161009 }]},
  {'datatype':'DrivingLicense',
  'values':[{
    year: '2018, 1H',
    counts: 25802
  },
  { year: '2018, 2H', counts: 10098 },
  { year: '2019, 1H', counts: 45009 }]},
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
