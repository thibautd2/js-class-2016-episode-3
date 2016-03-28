/** try to figure out if given express request is a page request by a user or if internal (xhr)/invisible request.
 */

export default function is_page_request (req) {

  if (req.xhr) // caller manually told us it was a xhr
    return false;

  if (req.accepts('html')) // most likely a browser asset
    return true;

  return true; // by default, assume a user will see that request, safer.
}
