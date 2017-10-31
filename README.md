# react-reboot

The easiest way to refresh your React components with up-to-date syntax.

There's also possibility to run this pipeline online in the playground with simple code copy-pasting (TODO find sponsor to host it)

Before                     |  After
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/749374/32229250-ab512306-be50-11e7-842c-f466668ee1bd.png">  |  <img src="https://user-images.githubusercontent.com/749374/32229268-b5095698-be50-11e7-9218-e40e429a02da.png" >

# How it works

It simply runs in a row these 4 tools in a Node server, with an opiniated default configuration:

- JSCodeshift codemods
- ESLint rules with --fix
- Babel transforms (coming soon!)
- Prettier --write

# Problems

- Currently, no single tool solve every transform problem, and setting up and integrating multiple tools together is annoying

- Choosing which codemods or ESLint rules to run, in which order can take some time. This project tries apply transforms in the correct order, in a fail-safe way, and remove transforms that often crash or generate bad outputs.

- It's not always easy to migrate a large codebase with many team members in one pass. Some team might prefer to migrate gradually as they are working on well-defined folders.


# TODO

- Support other parsers (Flow...)
- Fine-tune transformation rules
- Add CLI interface
- Publish Node API and CLI to NPM (without embedding codemods for licensing reasons?)
- Provide options
- Probably other things
- Tests
- Help me :)

# Dev

### Run local website / playground:

Install js-codemod / react-codemod in ./codemods (manual procedure for now for licensing reasons, these projects are not published on NPM)`

Project only runs in yarn due to need of using 2 distinct babel versions at the same time


```
yarn install
yarn dev
```

# Sponsor

<img src="https://avatars1.githubusercontent.com/u/14985020?s=200&v=4" width="50"/>
Thanks to Zeit for sponsoring/hosting the project: it runs on NextJs and Now.

Thanks to Babel, Jscodeshift, ESlint, Prettier, and [Carbon](https://github.com/dawnlabs/carbon) for some design/layout/code inspiration.
