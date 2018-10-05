# codotype-generator
Codebase generators that power [codotype.io](http://codotype.io).

## System Requirements
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)


## Local Development Setup

The following instructions will guide you through the process of getting your local computer set up to make contributions to the `codotype-generator` codebase.

### Generating an example app with codotype

1. Fork this repository (`codotype/codotype-generator`) so you have your own copy hosted on GitHub at `github.com/your-username/codotype-generator`.

2. Clone your fork of the repository down to your local machine and navigate into the resulting directory. Use `Clone with SSH` fron the `Clone or download` dropdown on GitHub with the following terminal command:

```
git clone git@github.com:your-username/codotype-generator.git
cd codotype-generator
```

3. In the `codotype-generator` directory, use the following command to add the `upstream` remote to the repository:

```
git remote add upstream git@github.com:codotype/codotype-generator.git
```

You can ensure this worked correctly by running `git remote show`. You should see entries for both `origin` and `upstream`.

The `upstream` remote will allow you to pull the latest changes from `codotype/codotype-generator` so you're always editing up-to-date code.

4. Install [npm](https://www.npmjs.com/) dependencies:

```
npm install
```

5. Test your installation

```
npm test
```

This command will generate a full-stack example application in the `codotype-generator/build/app_[...]/todo_list` directory. If this command completes without an error, your local setup of codotype is working.

### Starting the generated app

6. Use the following commands to install docker and docker-compose:

```
# Install Docker
curl -sSL https://get.docker.com/ | sh

# Add your user to docker group...
sudo usermod -aG docker <username>

# Install docker-compose
sudo curl -o /usr/local/bin/docker-compose -L https://github.com/docker/compose/releases/download/1.13.0/docker-compose-`uname -s`-`uname -m`
sudo chmod +x /usr/local/bin/docker-compose
```

7. Run `docker-compose up` in the `todo_list` directory to start the Docker containers.

8. Run `npm install && npm start` in the `web_api` directory to start the ExpressJS API server. If you get an error message when running `npm start`, try running `MONGO_DB_URI="0.0.0.0" PORT="4000" npm start` instead as a temporary fix.

9. Run `npm install && npm start` in the `web_client` directory to start the VueJS app. This should automatically open the app in a browser window.

## Submitting Changes

The following instructions will guide you through the process of merging your local changes into the upstream `codotype/codotype-generator` repository.

1. Push your changes to the `dev` branch on your fork of the repository:

```
git push origin dev
```

2. Open a [new pull-request](https://github.com/codotype/codotype-generator/compare) into the `dev` branch of `codotype/codotype-generator` from the `dev` branch of your fork (i.e. `your-username/codotype-generator`).

3. Your pull request will be reviewed.


## Built With

- [ejs](http://ejs.co/)

- [fs-extra](https://github.com/jprichardson/node-fs-extra)

- [lodash](lodash.com/docs/4.17.4)

- [underscore.string](http://gabceb.github.io/underscore.string.site/)
