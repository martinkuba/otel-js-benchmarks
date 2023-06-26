/*
 * Generates X number of spans per second (defined by `spansPerSecond`)
 */

const initializeOtel = require('./otel')

const spansPerSecond = 10000
let spansCreated = 0
let cycles = 0

const exporter = 'http' // proto|http|grpc
const url = 'http://localhost:4318/v1/traces' 
// const url = 'http://localhost:4317/v1/traces' 
const tracerProvider = initializeOtel(exporter, url);

const tracer = tracerProvider.getTracer('default')

let running = true
const startCpu = process.cpuUsage()
const cpuMeasurements = []
let lastCpuMeasurement = startCpu

const intervalHandle = setInterval(runCycle(), 1000)

// run this at every interval (1s)
function runCycle() {
  const newCpuMeasurement = process.cpuUsage()
  cpuMeasurements.push((newCpuMeasurement.user - lastCpuMeasurement.user)/1e3)
  lastCpuMeasurement = newCpuMeasurement
  
  if (running) {
    cycles++
    process.stdout.cursorTo(0)
    process.stdout.write('cycle ' + cycles)
    generateSpans()
  } 
  return runCycle
}

// timeout to end after specified time (15s)
setTimeout(() => {
  // stop generating spans
  running = false
  
  // let export finish
  console.log('')
  console.log('waiting for final export to finish...')
  tracerProvider.shutdown().then(() => {
    setTimeout(finish, 1000)
  })
}, 15000)

function generateSpans() {
  for (let i = 0; i < spansPerSecond; i++) {
    const span = tracer.startSpan('span' + i.toString());
    span.setAttribute('number', 1234)
    span.addEvent('event1')
    span.end()
    spansCreated++
  }
}

function finish() {
  clearInterval(intervalHandle)
  const endCpu = process.cpuUsage()
  console.log(`cpu (system): ${(endCpu.system - startCpu.system)/1e3}ms`)
  console.log(`cpu (user): ${(endCpu.user - startCpu.user)/1e3}ms`)
  console.log(cpuMeasurements)

  const total = cpuMeasurements.reduce((previous, current) => {
    return previous + current
  }, 0);
  console.log('total: ', total);
  console.log('average: ', total / cpuMeasurements.length);
  console.log('max: ', Math.max(...cpuMeasurements));
}
