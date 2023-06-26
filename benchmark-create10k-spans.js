const { BasicTracerProvider } = require('@opentelemetry/sdk-trace-base');

const tracerProvider = new BasicTracerProvider();
const tracer = tracerProvider.getTracer('test')

const startCpu = process.cpuUsage();

for (let i = 0; i < 10000; i++) {
  const span = tracer.startSpan('span' + i.toString());
  span.setAttribute('number', 1234)
  span.addEvent('event1')
  span.end()
}

const cpuUsage = process.cpuUsage(startCpu)
console.log(cpuUsage.user / 1e3);
