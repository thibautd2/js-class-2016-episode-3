/** try to figure out if given express request is a page request by a user or if internal (xhr)/invisible request.
 */

export default function is_page_request (req) {
  return    (! req.xhr) // caller manually told us it was a xhr
         && (req.accepts('html')); // most likely a browser asset
}
