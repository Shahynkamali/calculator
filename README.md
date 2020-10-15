# Solutions Calculator

## Development

### Setting Up the Enviroment

#### Using SSH Keys
The Remote - Containers extension provides out of box support for forwarding the SSH agent of your OS to the container. It works both for windows and linux.

More details on how to do this [here](https://code.visualstudio.com/docs/remote/containers#_using-ssh-keys).

### Using the Enviroment

#### Installs all dependencies listed in package.json
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn serve
```

#### Compiles and minifies for production
```
yarn build
```

#### Run your unit tests
```
yarn test:unit
```

#### Lints and fixes files
```
yarn lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Deployment

We deploy the application using an nginx inside of a docker container.

### Requirements

- Docker

### HowTo

- Pull from the repository the latest stable branch commit.
- Execute the commands bellow to create the image and run a container. Every time that we deploy a new version these commands need to be executed:

```bash
docker build . -t bufferfish-stable
docker run -d -p 8082:80 bufferfish-stable
```
