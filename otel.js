const { BasicTracerProvider, BatchSpanProcessor, SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { Resource } = require('@opentelemetry/resources');

const { OTLPTraceExporter: HttpExporter } =  require('@opentelemetry/exporter-trace-otlp-http');
const { OTLPTraceExporter: ProtoExporter } =  require('@opentelemetry/exporter-trace-otlp-proto');
const { OTLPTraceExporter: GrpcExporter } =  require('@opentelemetry/exporter-trace-otlp-grpc');

function initializeOtel(exporterType, url) {
  const resource = new Resource({
      ['service.name']: '1234567890',
      ['service.version']: '1234567890',
      ['service.instance.id']: 'd62c58bc-139e-11ee-be56-0242ac120002',
  });
  
  const tracerProvider = new BasicTracerProvider({
    resource: resource
  });
  
  let exporter
  if (exporterType === 'http') {
    exporter = new HttpExporter({ url: url })
  } else if (exporterType  === 'proto') {
    exporter = new ProtoExporter({ url: url })
  } else if (exporterType === 'grpc') {
    exporter = new GrpcExporter({ url: url })
  }
  
  tracerProvider.addSpanProcessor(new BatchSpanProcessor(exporter, {
    maxExportBatchSize: 10000, // default 512
    maxQueueSize: 10000, // default 2048
    scheduledDelayMillis: 5000, //default 5000
  }));
  
  return tracerProvider
}

module.exports = initializeOtel
