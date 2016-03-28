import morgan from 'morgan';

import config from '../../../config';

morgan.token('uuid', (req, res) => req.uuid);
morgan.token('is_page_request', (req, res) => req.is_page_request ? '[page]' : '[xhr]');

const morgan_instance_upfront = morgan(
  config.web.morgan.upfront_format,
  {
    immediate: true
  }
);

const morgan_instance_final = morgan(
  config.web.morgan.final_format,
  {
    //skip: (req, res) => res.statusCode < 400,
  }
);

export default function log_express_requests (req, res, next) {
  // forward to morgan, two-tiered
  morgan_instance_upfront(req, res, () => {
    morgan_instance_final(req, res, next);
  });
}
