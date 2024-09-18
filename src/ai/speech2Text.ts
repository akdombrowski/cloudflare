const fetch = require('node-fetch');

const url = 'https://api.cloudflare.com/client/v4/accounts/account_id/ai/run/model_name';

const options = {
  method: 'POST',
  headers: {'Content-Type': 'application/json', Authorization: 'Bearer undefined'},
  body: '{"text":"string"}'
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
