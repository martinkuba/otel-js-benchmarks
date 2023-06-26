const benchmark = require('./benchmark');
const { BasicTracerProvider } = require('@opentelemetry/sdk-trace-base');

var suite = benchmark()
 
const tracerProvider = new BasicTracerProvider();
const tracer = tracerProvider.getTracer('test')

suite
.add('create span', function() {
  const span = tracer.startSpan('span');
  span.setAttribute('number', 1234)
  span.addEvent('event1')
  span.end()
})
.run({ 'async': true });
