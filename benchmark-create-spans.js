const benchmark = require('./benchmark');
const { BasicTracerProvider } = require('@opentelemetry/sdk-trace-base');

var suite = benchmark()
 
const tracerProvider = new BasicTracerProvider();
const tracer = tracerProvider.getTracer('test')

suite
.add('1 span, 1 attribute, 1 event', function() {
  const span = tracer.startSpan('span');
  span.setAttribute('number', 1234)
  span.addEvent('event1')
  span.end()
})
.add('10 attributes', function() {
  const span = tracer.startSpan('span');
  span.setAttribute('aaaaaaaaaaaaaaaaaaaa', 'aaaaaaaaaaaaaaaaaaaa');
  span.setAttribute('bbbbbbbbbbbbbbbbbbbb', 'aaaaaaaaaaaaaaaaaaaa');
  span.setAttribute('cccccccccccccccccccc', 'aaaaaaaaaaaaaaaaaaaa');
  span.setAttribute('dddddddddddddddddddd', 'aaaaaaaaaaaaaaaaaaaa');
  span.setAttribute('eeeeeeeeeeeeeeeeeeee', 'aaaaaaaaaaaaaaaaaaaa');
  span.setAttribute('ffffffffffffffffffff', 'aaaaaaaaaaaaaaaaaaaa');
  span.setAttribute('gggggggggggggggggggg', 'aaaaaaaaaaaaaaaaaaaa');
  span.setAttribute('hhhhhhhhhhhhhhhhhhhh', 'aaaaaaaaaaaaaaaaaaaa');
  span.setAttribute('iiiiiiiiiiiiiiiiiiii', 'aaaaaaaaaaaaaaaaaaaa');
  span.setAttribute('jjjjjjjjjjjjjjjjjjjj', 'aaaaaaaaaaaaaaaaaaaa');
  span.end()
})
.run({ 'async': true });
