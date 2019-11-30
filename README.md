# Cloud Web App

## 👋 Introduction

This mono-repo is used to demonstrate how an entire web app could be composed, configured and deployed to a cloud provider.
It can currently be deployed to AWS using the [Terraform] configuration provided.

## 🤖 Setup

### 🌍 Global

First, use git to clone this repository.

If you are running Windows, inspect `.\windows-setup.ps1`, then install [Chocolatey] and run that script to install any
missing dependencies. Similar commands like `apt-get` are available for Linux distros.

### 📌 Local

Run the GraphQL API in one terminal with:

```bash
cd api
yarn install
yarn start
```

## 🕴 Real-World

Were this a real-world application, in addition to the code here, I would also:

- Split the API and web app into separate repositories, and use a package manager such as [Gemfury] to share private code,
    such as the GraphQL schema and models, via npm packages.
- Add [Husky] to each separate repo to run a build, lint and unit tests before pushing to its remote.

[Chocolatey]: https://chocolatey.org/ "The package manager for Windows"
[Gemfury]: https://gemfury.com/ "Private RubyGems, npm, PyPI, NuGet, Composer & more"
[Husky]: https://github.com/typicode/husky "🐶 Git hooks made easy"
[Terraform]: https://www.terraform.io/
