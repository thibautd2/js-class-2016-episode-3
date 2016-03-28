// Several cases :
// - a 404
//   - manual, visible (user mistyped a page url, old address...)
//   - internal (API, auto fetch of rsrc, non page-rsrc...)
// - a correct page, but unknown from the server since will be resolved client-side by ui-router
// http://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
export default function handle_404 (req, res, next) {
  console.warn('! fallback "catch all" route triggered for url "' + req.url + '"');

  // so what ?
  if (! req.is_page_request) {
    // Will not be seen by the user.
    // Respond the best we can.
    res.status(404); // anyway
    if (req.accepts('json'))
      return res.send({ error: 'Not found.' });
    else
      return res.type('txt').send('Not found.');
  }

  // ok, most likely a user browsing.
  // is it a full page or just an asset ?
  // (we don't want to costly render a template just for a missing favicon)
  if (req.path.slice(-4).indexOf('.') !== -1) {
    // there is a . (dot) in the last 4 chars,
    // most likely an file extension
    // so it must be an asset since our clean page urls don't have extensions.
    res.status(404); // anyway
    return res.send('404'); // short answer
  }

  // OK, must be a client-side state/page
  var client_side_routing = false; // TODO some day maybe maybe not
  if (client_side_routing) {
    // answer with index, client-side will handle the rest (including true 404)
    console.log('! defaulting to webapp root for url "' + req.url + '"');
    res.render('app', { tpl: 'app', title: 'Express', lang: req.locale });
  }
  else {
    console.error('! rendering 404 page for url "' + req.url + '"');
    return res.render('404', {
      tpl: '404',
      uuid: req.uuid,
      url: req.url,
      lang: req.locale
    });
  }
}
