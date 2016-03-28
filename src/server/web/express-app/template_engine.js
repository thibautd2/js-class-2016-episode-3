// templating using "consolidate"
import consolidated_templates from 'consolidate';

// now require all templating engines we wish to use
import dust from 'dustjs-linkedin'; // http://dejanglozic.com/2014/01/27/dust-js-such-templating/

// additions
//import dust_intl from 'dust-intl'; // http://formatjs.io/dust/
import 'dustjs-helpers'; // also

// https://github.com/linkedin/dustjs/wiki/Dust-Tutorial#controlling-whitespace-suppression
dust.optimizers.format = (ctx, node) => node;
//dust_intl.registerWith(dust);

const template_engine = consolidated_templates.dust;
template_engine.extension = 'dust';

export default template_engine;
