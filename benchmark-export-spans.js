const { BasicTracerProvider, BatchSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');

const { OTLPTraceExporter: HttpExporter } =  require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPTraceExporter: ProtoExporter } =  require('@opentelemetry/exporter-trace-otlp-proto');
const { OTLPTraceExporter: GrpcExporter } =  require('@opentelemetry/exporter-trace-otlp-grpc');

const totalSpansToGenerate = 10000

const resource = new Resource({
    ['service.name']: '1234567890',
    ['service.version']: '1234567890',
    ['service.instance.id']: 'd62c58bc-139e-11ee-be56-0242ac120002',
});

const tracerProvider = new BasicTracerProvider({
  resource: resource
});

const url = 'http://localhost:4318/v1/traces' 
// const exporter = new HttpExporter({ url: url });
const exporter = new ProtoExporter({ url: url });
// const url = 'http://localhost:4317/v1/traces' 
// const exporter = new GrpcExporter({ url: url });

tracerProvider.addSpanProcessor(new BatchSpanProcessor(exporter, {
  maxExportBatchSize: (totalSpansToGenerate > 512) ? totalSpansToGenerate:512, // default 512
  maxQueueSize: (totalSpansToGenerate > 2048) ? totalSpansToGenerate:2048, // default 2048
  scheduledDelayMillis: 5000, //default 5000
}));

const tracer = tracerProvider.getTracer('test');

for (let i = 0; i < totalSpansToGenerate; i++) {
  const span = tracer.startSpan('span');
  span.setAttribute('number', 1234)
  span.addEvent('event1')
  span.end()
}

const startCpu = process.cpuUsage();
tracerProvider.forceFlush()
  .then(() => {
    console.log(process.cpuUsage(startCpu));
  });

