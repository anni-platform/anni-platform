## Anni Beta
An open source project management platform for animators.

### Setup Instructions

1. `npm install`
2. Create a config file:
  - `touch .env.json`
  - Add the following to it and save
  ```shell
  {
    "CLIENT_ID" : "<YOUR CLIENT ID>"
  }
  ```
3. Add `http://localhost:3000/auth` to your Dropbox App's *Redirect URIs*


### Run Dev Tasks

1. `npm start` - this will run `react-scripts start`
