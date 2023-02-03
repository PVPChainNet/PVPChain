# NextJS Seed App

This is the repository for the Dappd NextJs Seed Application. It leverages React, Next.Js, Tailwind, and Ethers (Wagmi).

Copyright © 2022 | Dappd, LLC | All Rights Reserved | [dappd.net](https://dappd.net/)

---

## Table of Contents

- [General Links](#general-links)
- [Technologies Used](#technologies-used)
- [Version Control](#version-control)
- [Opinions and Stances](#opinions-and-stances)
- [Development](#development)

## General Links

---

- [Project Repository (https://github.com/dappd-net/nextjs-seed)](https://github.com/dappd-net/nextjs-seed)

## Technologies Used

---

### Coding

- [TypeScript](https://www.typescriptlang.org/docs/)

### DevOps

- [NodeJs](https://nodejs.org/en/)
- [NPM](https://npmjs.com/)
- [Husky](https://typicode.github.io/husky/#/)

### Linting

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

### Frameworks

- [React](https://reactjs.org/)
- [NextJs](https://nextjs.org/)

### UI

- [Tailwind](https://angular.io/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Heroicons](https://heroicons.com/)
- [React DaisyUI](https://react.daisyui.com/)
- [MUI](https://mui.com/)

### Web3 Related

- [WAGMI](https://wagmi.sh/)
- [Ethers](https://docs.ethers.io/)
- [BigNumber (Ethers)](https://docs.ethers.io/v5/api/utils/bignumber/)
- [Decimal.js](https://github.com/MikeMcl/decimal.js)

### Solidity

- [TypeChain](https://github.com/dethcrypto/TypeChain)
- [Hardhat](https://hardhat.org/)

### IDE

- [VS Code](https://code.visualstudio.com/)

### Code Quality Tools

- [EditorConfig](https://editorconfig.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

## Version Control

---

[Git](https://git-scm.com/) is used for version control. Feature/bug/hotfix branches are created from the `development` branch. The `main` branch is protected and requires a pull request from only `development` to merge into it. The `main` branch is deployed to production unless a staging environment is setup.

### Branching

- main
- development
- feature-\*
- bug-\*
- hotfix-\*

#### Branch Protections

Main and Development branches are protected. You must have a PR approved by a team member to merge into these branches.

### PRs

PRs should be made from a feature/bug/hotfix branch to the development branch.

### Merging

PRs should be merged by the author of the PR. The author should merge the PR after it has been approved by a team member. Merged pr branches should be deleted.

## Opinions and Stances

---

- The `package-lock.json` file will be committed to VCS, [here's a few answers why](https://stackoverflow.com/questions/44206782/do-i-commit-the-package-lock-json-file-created-by-npm-5?rq=1)
- We should set up `npm shrink wrap` - [read more here](https://docs.npmjs.com/cli/v7/commands/npm-shrinkwrap)

## Development

---

### Assumptions

- You have [NodeJs](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) installed
- You have enabled `Format On Save` in VSCode for `Prettier`.

### IDE Configuration

Ensure that you have the following extensions installed:

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

#### **Setup Prettier to format on save**

1. Open VSCode settings
2. Search for "Format On Save"
3. Enable "Format On Save"

### Project Setup

1. Open **VS Code**
2. Click the **source control icon** from the left-side menu
3. Click the **Clone Repository** button
4. Click **Clone From Github**
5. Search for the seed app: `dappd-net/seed`
6. Select a folder to clone the repository into
7. Open a terminal window and run `npm install`
8. _Optionals_:
   - **(Recommended)** run `npm run clean:all` to _remove_ `Solidity` support and the `example content` from the project
   - run `npm run clean:starter` to _remove_ only the `example content` from the project
   - run `npm run clean:contracts` to _remove_ only `Solidity` support from the project
   - If you have removed `Solidity` support you can run `npm run setup:contracts` to _add_ `Solidity` support back to the project
9. Run `npm run dev` to start the development server and ensure the project is working, if not, repeat the above steps

### Developing

1. Open **VS Code**
2. Run `npm run dev` to start the development server
3. Open a browser and navigate to `http://localhost:3000`
4. Make changes to the project and save
5. The browser should automatically refresh with your changes
6. If you are working on a feature, create a new branch from `development` and name it `feature/your-feature-name`
7. If you are working on a bug, create a new branch from `development` and name it `bug/your-bug-name`
8. If you are working on a hotfix, create a new branch from `main` and name it `hotfix/your-hotfix-name`
9. When you are ready to merge your changes, create a PR from your branch to `development`
10. When your PR is approved, merge it into `development`
11. Delete your branch

### Deployment

Deployments happen automatically. When a PR is merged into `development` it will be deployed to the `development` environment (`https://{project name}-development.projects.dappd.net`). When a PR is merged into `main` it will be deployed to the `production` environment.
