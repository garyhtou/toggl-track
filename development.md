# Development Notes

### TODO:

- Support Moment
- Convert date to proper format
- Axios
  - Axios returning string instead of parsed JSON
  - Better error handling?
  - `data` property might be confusing

https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c

## Release Process

1. Update `README.md` if necessary
2. `yarn run lint`
3. `yarn run format`
4. `yarn version --major|--minor|--patch` (this also commits, tags, and pushes both to `origin` via the `version`/`postversion` scripts)
5. `yarn publish`
