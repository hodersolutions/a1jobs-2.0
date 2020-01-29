// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  SECRET_KEY: '0f0311b78575b5a5629d76bf5bee74f2',
  AUTH_TOKEN: '',
  API_URL: 'http://localhost:5100/api/v1/{0}',
  API_HEADERS: {
    'Content-type': 'application/json',
    'Accept': 'text/plain'
  },
  UID_HEADER: 'UID_HEADER'
};
