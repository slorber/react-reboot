# react-reboot

The easiest way to refresh your React components.

There's also possibility to run this pipeline online in the playground with simple code copy-pasting (TODO find sponsor to host)

![Before](https://user-images.githubusercontent.com/749374/32229250-ab512306-be50-11e7-842c-f466668ee1bd.png)

![After](https://user-images.githubusercontent.com/749374/32229268-b5095698-be50-11e7-9218-e40e429a02da.png)

# How it works

It simply runs in a row these 3 tools in a Node server, with an opiniated default configuration:

- JSCodeshift
- ESLint --fix
- Prettier --write

# Problems

- Currently, no single tool solve every transform problem, and setting up and integrating multiple tools together is annoying

- Choosing which codemods or ESLint rules to run, in which order can take some time. This project tries apply transforms in the correct order, in a fail-safe way, and remove transforms that often crash or generate bad outputs.

- It's not always easy to migrate a large codebase with many team members in one pass. Some team might prefer to migrate gradually as they are working on well-defined folders.


# TODO

- Tests
- Support other parsers (Flow...)
- Fine-tune transformation rules
- Add CLI interface
- Publish Node API and CLI to NPM (without embedding codemods for licensing reasons?)
- Provide options
- Probably other things
- Help me :)

# Dev

### Run local website / playground:

Install js-codemod / react-codemod in ./codemods (manual procedure for now for licensing reasons, these projects are not published on NPM)

```
yarn install
yarn dev`
``

