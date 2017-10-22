![anni_01](https://user-images.githubusercontent.com/1121873/31864196-f065dbbe-b71e-11e7-8ef9-c6f0b9462aba.jpg)

# Anni Platform
This repository contains the source code of Anni, a platform for animators to manage and present their work. Anni allows animators to write scripts, create moodboards, organize storyboards and collaborate with their clients in a single space.

You can explore the beta version of the app [here](https://anni-platform.github.io/)

## Roadmap
Here is an overview of the features built to date. For detailed information of progress follow our GitHub Project board [here](https://github.com/anni-platform/anni-platform/projects/1)
- [x] User Authentication
- [x] Dashboard

- [x] Text Editor
- [x] Moodboard Builder
- [x] Storyboard Builder
- [ ] Video Player
- [ ] Styleframe Gallery Builder
- [ ] Public share view
- [ ] Feedback

## Design
Styles are written in [Styled Components](https://www.styled-components.com/). Styled components are explained and organized in a reusable pattern library that can be viewed [here](https://anni-platform.github.io/patterns)
<img width="1680" alt="screen shot 2017-10-22 at 12 24 14 pm" src="https://user-images.githubusercontent.com/1121873/31864518-f8b47c6c-b723-11e7-87aa-c5e22c81984c.png">

## Instructions
### Setup
1. `npm install`
2. Create a config file:
  - `touch src/app-config.json`
  - Add the following to it and save
  ```shell
  {
    "CLIENT_ID" : "<YOUR CLIENT ID>"
  }
  ```
3. Add `http://localhost:3000/auth` to your Dropbox App's *Redirect URIs*

### Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at [http://localhost:3000/](http://localhost:3000/)

## Frontend Technology
The frontend of Anni is built using [React](https://reactjs.org/) and [Redux](http://redux.js.org/), written in ES6 Javascript compiled by Babel. Styles are written using [Styled Components](https://www.styled-components.com/)
