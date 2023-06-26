const { BasicTracerProvider } = require('@opentelemetry/sdk-trace-base');

const tracerProvider = new BasicTracerProvider();
const tracer = tracerProvider.getTracer('test')

const startCpu = process.cpuUsage();

for (let i = 0; i < 10000; i++) {
  const span = tracer.startSpan('span' + i.toString());
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
}

const cpuUsage = process.cpuUsage(startCpu)
console.log(cpuUsage.user / 1e3);
