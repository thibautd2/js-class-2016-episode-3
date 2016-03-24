import express from 'express';

import diagnostic_routes from '../../../common/static_data/app_infos';

const router = new express.Router();
export default router;

router.get('/x', (req, res) => res.send('hello meta'));
router.get('/meta', (req, res) => res.send('hello meta 2'));

/*
router.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<head>
	<title>meta routes</title>
	<style type="text/css">
		body {
			margin: 40px;
			font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
			color: #333;
		}
	</style>
</head>

<h1>...</h1>
<li><a>${req.baseUrl}/diagnostics</a>
<li><a>${req.baseUrl}/locale_test</a>
<li><a>${req.baseUrl}/config</a>
<li><a>${req.baseUrl}/../express-debug</a>

<script>
	document.querySelector('h1').textContent = document.title;
	Array.prototype.forEach.call(document.querySelectorAll('a'), function(el) {
		el.href || (el.href = el.text);
	});
</script>
	`);
});

router.get('/diagnostic', diagnostic_routes);

router.get('/locale_test', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send(
    'You asked for: ' + req.headers['accept-language'] + '\n' +
    'We support: ' + app_infos.supported_locales + '\n' +
    'Our default is: ' + app_infos.supported_locales[0] + '\n' +
    'The best match is: ' + req.locale + '\n' +
    'Choice reason: ' + req.locale_choice + '\n'
  );
});

// XXX TOREMOVE SECU
router.get('/config', function(req, res) {
  res.header('Content-Type', 'application/json');
  res.send(config);
});
*/
