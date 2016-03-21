import prettyjson from 'prettyjson';

// TODO replace logger


// expose prettyjson for convenience
const prettyjson_options = {

};
global.pretty = (data) => prettyjson.render(data, prettyjson_options);
