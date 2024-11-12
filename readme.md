# Tensorflow Toxicity API using NodeJS/Express

This is a toxicity API created in NodeJS/Express using [Tensorflow.js](https://www.tensorflow.org/js) and it's built-in toxicity model

This project also uses OpenTelemetry with auto and custom instrumentation. It sends OpenTelemetry to [Honeycomb.io](https://www.honeycomb.io/).

If you want to disable this, delete or comment out this line in `index.js`:

`require('./tracing.js');`

## Install

* Check out code from repo
* Run `npm install`

## Set Environment Vars

You can create a .env file with the following:

```
API_KEY={{YOUR FRONT END API KEY}}
PORT={{PORT TO RUN ON}}
```

add these for Honeycomb OpenTelemetry:

```
OTEL_SERVICE_NAME={{NAME OF YOUR HONEYCOMB SERVICE}}
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
OTEL_EXPORTER_OTLP_ENDPOINT="https://api.honeycomb.io"
OTEL_EXPORTER_OTLP_HEADERS="x-honeycomb-team={{YOUR HOMEYCOMB API KEY}}"
```

## Run

`node index.js`

## Call API

```bash
curl -X POST http://localhost:3000/detect-toxicity -H "Content-Type: application/json" -H "x-api-key: 11111" -d '{"sentences": ["Im going to kill you"]}'
```

with Response:

```json
[
  {
    "label": "identity_attack",
    "results": [
      {
        "probabilities": {
          "0": 0.9107791185379028,
          "1": 0.08922092616558075
        },
        "match": false
      }
    ]
  },
  {
    "label": "insult",
    "results": [
      {
        "probabilities": {
          "0": 0.8553077578544617,
          "1": 0.14469219744205475
        },
        "match": false
      }
    ]
  },
  {
    "label": "obscene",
    "results": [
      {
        "probabilities": {
          "0": 0.9472109079360962,
          "1": 0.052789077162742615
        },
        "match": false
      }
    ]
  },
  {
    "label": "severe_toxicity",
    "results": [
      {
        "probabilities": {
          "0": 0.9979450106620789,
          "1": 0.002054983051493764
        },
        "match": false
      }
    ]
  },
  {
    "label": "sexual_explicit",
    "results": [
      {
        "probabilities": {
          "0": 0.8922789692878723,
          "1": 0.10772103071212769
        },
        "match": false
      }
    ]
  },
  {
    "label": "threat",
    "results": [
      {
        "probabilities": {
          "0": 0.2759523093700409,
          "1": 0.7240476608276367
        },
        "match": true
      }
    ]
  },
  {
    "label": "toxicity",
    "results": [
      {
        "probabilities": {
          "0": 0.15300489962100983,
          "1": 0.8469951152801514
        },
        "match": true
      }
    ]
  }
]
```