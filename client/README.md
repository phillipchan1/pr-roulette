# Gulp App Boilerplate
This is a boilerplate for app development using Gulp to jump start development.

## Table of Contents
1. [Setting Up](#setting-up)
2. [Under the Hood](#under-the-hood)

## Setting Up

Install all dependencies:

```
npm install
```

Minify SASS, Minify JS:
```
gulp
```

# Under the Hood
This has two front-end processes that are useful for app development:

- Concatenates and minifies scss
- Concatenates and minifies js
- Automatically reloads page (if [Live Reload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) is installed)

Distribution files will be loaded in the `css` and `js` respectively.
