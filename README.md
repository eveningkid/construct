# Construct

Construct is an open-source graphical Structural Equation Models (SEM) creation software. These models are used to model complex social and economic phenomena for statistical analysis.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). If you're not familiar with this tool yet, you can find more information about it on their own repository.

## Available scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Project structure

```
construct/
  README.md
  TODO.md
  package.json
  public/
    index.html
  src/
    actions/
    components/
    constants/
    elements/
    reducers/
    App.js
    index.js
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

The `src` folder contains a few important subdirectories:
- `actions`: list of actions that can be dispatched using redux.
  - `actionTypes.js`: contains every actions' names as constants;
  - `*.js`: corresponds to every store data subset.
- `components`: list of React components that seems *big* enough to be independent. Always come up with a new subdirectory and eventually a CSS file.
- `constants`: list of miscellaneous constants (that aren't component-related).
- `elements`: list of all models (could probably be renamed as `models` in the future). `index.js` exposes them all as submodules.
- `reducers`: list of reducers interpreting actions being dispatched. Works exactly as the `actions` folder: as soon as there is another store data subset, you should add another reducer file.

Only files inside `public` can be used from `public/index.html`.

## License

MIT © [eveningkid](//github.com/eveningkid)