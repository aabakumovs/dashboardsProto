var fs = require('fs');
var util = require('util');
var serve = require('koa-static');
var bodyParser = require('koa-body-parser');
var koa = require('koa');
var app = koa();
//var bunyanLogstash = require('bunyan-logstash');

var dir = 'app';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

app.use(serve('.'));
app.use(serve('app'));
app.use(bodyParser());

// var log = bunyan.createLogger({
//   name: 'demo',
//   streams: [{
//     type: 'rotating-file',
//     path: 'tmp/events.log'
//   }]
// });

app.use(function *(next) {
  var origin = this.get('Origin');
  if (!origin) {
    // ignore
    return yield *next;
  }

  if (this.method !== 'OPTIONS') {
    // cors request and riderect
    this.set('Access-Control-Allow-Origin', origin);
    yield *next;
  } else {
    if (this.get('Access-Control-Request-Method')) {
      // preflight request
      this.set('Access-Control-Allow-Origin', origin);
      // get allowed headers
      var allowHeaders = this.get('Access-Control-Request-Headers');
      if (allowHeaders) {
        // set allowed headers
        this.set('Access-Control-Allow-Headers', allowHeaders);
      }
      // no response to send back
      this.status = 204;
    } else {
      // this not preflight request, ignore it
      return yield *next;
    }
  }
});

app.use(function *() {
  if (this.request.method === 'POST') {
    // try {
    //   var payload = this.request.body;
    //   if(payload.type === 'streamStart') {
    //     var streamLog = bunyan.createLogger({
    //       streams: [
    //       {
    //         type: "raw",
    //         stream: bunyanLogstash.createStream({
    //           host: '127.0.0.1',
    //           port: 5505
    //         })
    //       }
    //       ]
    //     });
    //     this.status = 200;
    //     return;
    //   }
    //   if(payload.type === 'message') {
    //     log.info({ event: {
    //       data: payload.data,
    //       type: payload.type,
    //       time: Date.now()
    //     }});  
    //   } else {
    //     log.error({ event: {
    //       data: payload.data,
    //       type: payload.type,
    //       time: Date.now()
    //     }});
    //   }

    // } catch (err) {
    //   console.log(err);
    // }
    this.status = 200;
  }
});




app.on('error', function(error, context) {
  console.error('server error', error, context);
});

app.listen(3000);
console.log('listening on port 3000');
