# OpenTelemetry JavaScript benchmarks

## Overview

All results reported here were generated on Apple M1 Pro chip.

CPU usage is measured using Node's `process.cpuUsage()` function ([documentation](https://nodejs.org/dist/latest-v20.x/docs/api/process.html#processcpuusagepreviousvalue)).

## Generating spans

The SDK can generate ~500,000 spans per second.

```js
node benchmark-create-spans.js
```

Generating 10,000 spans as described in the spec takes ~100ms.

```js
node benchmark-create10k-spans.js
```

## Exporting spans

This test was intended to measure the CPU time required to export X number of spans. Note that the JavaScript SDK does not have eager export as of June 2023. The max number of spans that is exported by default is 512 every 5s. In order to export more spans, the batch and queue size configuration of the batch exporter has been increased accordingly.

The export was run on all three OTLP exporters (HTTP proto, HTTP json, gRPC). The data was exported to a locally-running Collector, which only logged the requests.

The test does the following - generates X number of spans, then immediately calls flush on the tracer provider. CPU usage is measured only while the flush call is executing.

The test was run 5 times for each exporter. The median measurement is reported here, rounded to ms.

Results:
| # of spans | HTTP | Proto | gRPC |
| --- | --- | --- | --- |
| 1 | 25 | 29 | 46 |
| 1000 | 22 | 67 | 86 |
| 10000 | 94 | 296 | 328 |

```js
node benchmark-export-spans.js
```

## Instrumentation Cost

This test is intended to follow the [OTel benchmark spec](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/performance-benchmark.md#cpu-usage-measurement).

The test generates 10,000 spans every second for the duration of 15 seconds. CPU is measured every second, and the results report the total, average, and max values. The test was run three times for every OTLP exporter, and the median value is reported here.

| exporter | total | average | max |
| --- | --- | --- | --- |
| HTTP | 1279 | 75 | 216 |
| Proto | 1606 | 94 | 409 |
| gRPC | 1688 | 99 | 416 |

Based on these results, about 10% of wall clock time is spent on OTel generating and exporting spans.

```js
node test-10kspans-per-second.js
```
