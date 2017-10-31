# react-reboot

The easiest way to refresh your React components.

# How it works

It simply runs in a row these 3 tools in a Node server, with an opiniated default configuration:

- JSCodeshift
- ESLint (--fix)
- Prettier

# Problems

- Currently, no single tool solve every transform problem, and setting up and integrating multiple tools together is annoying

- Choosing which codemods or ESLint rules to run, in which order can take some time. This project tries apply transforms in the correct order, in a fail-safe way, and remove transforms that often crash or generate bad outputs.

- It's not always easy to migrate a large codebase with many team members in one pass. Some team might prefer to migrate gradually as they are working on well-defined folders.


# TODO

- Support other parsers (Flow...)
- Fine-tune transformation rules
- Add CLI interface
- Provide options
- Probably other things
- Help me :)

