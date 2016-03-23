import prettyjson from 'prettyjson';

// install the sourcemap error stack beautifier
// https://www.npmjs.com/package/source-map-support
// TODO enable in prod but not with babel-watch
//import 'source-map-support/register';

// TODO replace logger


// expose prettyjson for convenience
const prettyjson_options = {

};
global.pretty = (data) => prettyjson.render(data, prettyjson_options);
