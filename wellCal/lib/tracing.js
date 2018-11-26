const initJaegerTracer = require("jaeger-client").initTracer;

module.exports.initTracer = serviceName => {
  var config = {
      serviceName: 'wellCal-Service',
      reporter: {
          collectorEndpoint: 'http://jaeger-collector:14268/api/traces'
      },
      sampler: {
        type: 'probabilistic',
        param: 1.0,
      }
  };
  const options = {
    logger: {
      info: function logInfo(msg)  {
        console.log("WelCal Service INFO ", msg);
      },
      error: function logError(msg) {
        console.log("ERROR", msg);
      },
    },
  };
  return initJaegerTracer(config, options);
};
