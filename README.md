# react-redux-project-boilerplate
500Tech Boilerplate for new projects using React &amp; Redux

# Decisions
- TS vs. Flow
  - Nir: TS is more mature (2018) 
  - Ilya: Flow has less friction
- Prettier
  - Nir says: Extra configuration. Use IDE auto format instead based on the project TSlint
    - Ilya replies: Prettier actually requires very little configuration. Since not everyone uses WebStorm/VS Code it is challenging to use the same code conventions.
- Lint rules
  - Nir suggested: - TSlint language defaults + Modified AirBNB
- API Middleware
- Liron suggested: API Middleware (that handles both HTTP and WebSockets)
- Thunk

# Suggestions
- Based on create react-app
- Folders
  - Constants
    - Example Constants
  - Components
    - Example Component
    - use renderXXX
  - Redux (see later)
  - Utils
    - Example Utils
  - Assets
- Redux
  - Folders (reducers, actions, middlewares, selector)
  - Using lodash/fp
  - Example for each type of unit
  - addons
    - redux-freeze (in dev)
    - redux-actions
- Prettier + NPM scripts
- Test infrastructure
  - JEST
- babelrc
- tslint / eslint rules
- Liron suggested: styled-components
- webpack
  - case sensitive plugin
  - performance optimiziations
  
## Extras:
- Localization
- Aran suggested: Git Hooks (Husky)
  - Ilya suggested: incorportate fht-style

# Contributing
Edit README.

Nir: ## General Conventions (Suggestions)
  - Nir: Don't use the redux logger (keep browser console clean)
    - Ilya: Actually redux logger is very helpful in many situations (given you run it with { collapsed: true } flag).
  - Nir: Each Action / event in the system must be included in redux dev-tools (Including API)
 - Nir: Actions should be name spaced for easy tracking ( Example: `[users] API_CALL` )
 - Nir: File names should include type (`user.actions.ts`, `user.reducer.ts`, `user.selectors.ts` etc..)
  - Ilya: Why?
 - Nir: action constants should be in the same file with their action creators
  - Ilya: That's most of the times a bad practice, since then you lose the main point of constants: 1) you can theoretically create two actions with the same name 2) some action types are common and used in multiple actions
 - Nir: Avoid default exports
  - Ilya: Why?