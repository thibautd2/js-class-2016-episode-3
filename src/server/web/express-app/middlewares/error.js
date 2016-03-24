import is_page_request from '../../../incubator/is-page-request';


// REM a "4 parameters" middleware is recognized as an error handler
export default function on_express_error (err, req, res, next) {
  console.warn('1st error handler', err, err.stack);
  //logger.exception(err);

  // so we have an error. Do we have a status ?
  const status = err.status || 500;
  // (todo validate err.status)
  res.status(status);

  if (! is_page_request(req)) {
    // Will not be seen by the user.
    // Respond the best we can.
    if (req.accepts('json'))
      return res.send({ error: 'server error : ' + status + ' (as json)' });
    else
      return res.type('txt').send('server error : ' + status + ' (as text)');
  }

  // ok, most likely a user browsing.
  // is it a full page or just an asset ?
  // (we don't want to costly render a template just for a missing favicon)
  if (req.url.slice(-4).indexOf('.') !== -1) {
    // there is a . (dot) in the last 4 chars,
    // most likely an file extension
    // so it must be an asset since our clean page urls don't have extensions.
    return res.send('error'); // short answer
  }

  // eventually
  try {
    res.render('error', { tpl: 'error', error: err });
  }
  catch(e) {
    console.error('The error template didn´t work :', e);
    res.send(500, 'Something broke and the nice error template didn´t work !');
  }
}
