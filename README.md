# Docker on ECS

A demonstration on running a Docker cluster within AWS EC2 Container Service (ECS).

***Please Note:*** *Using this repo will create billed AWS resources such as EC2 Instances (and more than one). Therefore you* ***WILL*** *be charge by AWS.*

## Contents
- [Usage](#usage)
- [File Structure](#file-structure)
 - [Apps](#apps)
 - [Services](#services)
 - [Stacks](#stacks)

## Usage

Run `./bin/cli` for a list of commands.

```
$ ./bin/cli

Usage: cli [options] [command]


Commands:

  aws:cf:list-local                       List locally configured stacks
  aws:cf:create [options] <stackName>     Create a stack with the specified name.
  aws:cf:delete <stackName>               Delete the specified stack.
  aws:cf:update [options] <stackName>     Update the specified stack.
  aws:ecs:cluster:create <clusterName>    Create a cluster with the specified name.
  aws:ecs:cluster:delete <clusterName>    Delete the specified cluster.
  aws:ecs:cluster:list-local              List locally configured clusters
  aws:ecs:service:create <serviceName>    Create a service with the specified name.
  aws:ecs:service:delete <serviceName>    Delete the specified service.
  aws:ecs:service:describe <serviceName>  Describe the specified service.
  aws:ecs:service:update <serviceName>    Update the specified service.
  aws:ecs:service:list-local              List locally configured services
  aws:ecs:task:list-local                 List locally configured tasks
  aws:ecs:task:register <taskName>        Register a task definition with the specified name.
  aws:ecr:list-local                      List locally configured repositories
  aws:ecr:create <repositoryName>         Create an EC2 Container Repository with the specified name.
  aws:ecr:delete <repositoryName>         Delete the specified repository.
  aws:ecr:describe [repositoryName...]    Describe the available EC2 Container Repositories. Provide an optional list of repository names.

Options:

  -h, --help     output usage information
  -V, --version  output the version number
```

## File Structure

Various commands within the CLI assume a certain file structure. They are outlined below.

### Apps

The apps directory is a placeholder for your applications. There is a hello world example with a packer file for building a flat Docker Image and publishing to your ECR 


### Services

The below example has a service called `demo-api`.

```
$ tree ./src/services
./src/services
└── demo-api
    └── ecs-service-definition.json
    └── ecs-task-definition.json
```

The `ecs-service-definition.json` file is a required file in order to interact with the ECS Service Commands in the CLI. An example file:

```json
{
    "cluster": "app-ecs-cluster",
    "taskDefinition": "demo-api",
    "desiredCount": 0,
    "deploymentConfiguration": {
        "maximumPercent": 200,
        "minimumHealthyPercent": 100
    }
}
```

You will notice that there is no `"serviceName": "demo-api"`, this is injected by the relevant CLI commands.

The `ecs-task-definition.json` file is a required file in order to interact with the ECS Task Commands in the CLI. An example file:

```json
{
  "containerDefinitions": [
    {
      "name": "consul",
      "environment": [],
      "links": [],
      "image": "progrium/consul:latest",
      "essential": true,
      "command": [
        "-server" ,
        "-bootstrap",
        "-ui-dir",
        "ui"
      ],
      "portMappings": [
        {
          "containerPort": 8500,
          "hostPort": 8500
        }
      ],
      "memory": 256,
      "cpu": 128
    }
  ]
}
```

You will notice that there is no `"family": "consul"`, this is injected by the relevant CLI commands.

### Stacks

The below example has a stack called `network`.

```
$ tree ./src/stacks
./src/stacks
└── network
    └── cf.json
```

The `cf.json` file is a required file in order to interact with the ECS CloudFormation Commands in the CLI.
