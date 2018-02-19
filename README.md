## How to use

```
$ git clone git@bitbucket.org:500tech/react-redux-project-boilerplate.git
$ git remote set-url origin <the-specific-repo-git-url>
$ yarn start  
```

## TODO

* react-redux-router (when it's ready)
* Locale switcher
* try to use redux types
* Test infrastructure
  * JEST
* tslint / eslint rules
* case sensitive plugin
* performance optimizations
* IDE predefinitions
* Snippets (like https://medium.com/@stinaqv/visual-studio-code-snippet-for-creating-a-functional-stateless-component-with-flow-db147aa1ef0b)
* Flow linting rules (missing @flow)
* Kebab Plugin

# react-redux-project-boilerplate

500Tech Boilerplate for new projects using React &amp; Redux

# Decisions

* Lint rules
  * Nir suggested: - TSlint language defaults + Modified AirBNB
* API Middleware
* Liron suggested: API Middleware (that handles both HTTP and WebSockets)

# Contributing

Make a Pull Request

Nir: ## General Conventions (Suggestions)

* Nir: Don't use the redux logger (keep browser console clean)
  * Ilya: Actually redux logger is very helpful in many situations (given you run it with { collapsed: true } flag).
* Nir: Each Action / event in the system must be included in redux dev-tools (Including API)
* Nir: Actions should be name spaced for easy tracking ( Example: `[users] API_CALL` )
* Nir: File names should include type (`user.actions.ts`, `user.reducer.ts`, `user.selectors.ts` etc..)
* Ilya: Why?
* Nir: action constants should be in the same file with their action creators
* Ilya: That's most of the times a bad practice, since then you lose the main point of constants: 1) you can theoretically create two actions with the same name 2) some action types are common and used in multiple actions
* Nir: Avoid default exports
* Ilya: Why?
