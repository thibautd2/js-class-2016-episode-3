/* */ 
(function(process) {
  function message(m) {
    process.send(m);
  }
  function broadcast(m) {
    return message(m);
  }
  function listen(fn) {
    process.on('message', function(m) {
      if (typeof m === 'object' && m.$$eval) {
        return;
      } else {
        fn(m);
      }
    });
  }
  function resolve(v) {
    process.send({$$resolve: v});
  }
  function reject(v) {
    process.send({$$reject: v});
  }
  process.on('message', function(m) {
    if (typeof m === 'object' && m.$$eval) {
      function _ref_(o) {
        return eval(o);
      }
      eval(m.$$eval);
    }
  });
})(require('process'));
