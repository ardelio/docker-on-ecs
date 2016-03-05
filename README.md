# Docker on ECS

A demonstration on running a Docker cluster within AWS EC2 Container Service (ECS).

## Usage

Run `./bin/cli` for a list of commands.

```
$ ./bin/cli

  Usage: cli [options] [command]


  Commands:

    aws:cf:create [options] <stackName>     Create a stack with the specified name.
    aws:ecs:cluster:list-local              List locally configured clusters
    aws:ecs:cluster:create <clusterName>    Create a cluster with the specified name.
    aws:ecs:cluster:delete <clusterName>    Delete the specified cluster.
    aws:ecs:service:list-local              List locally configured services
    aws:ecs:service:create <serviceName>    Create a service with the specified name.
    aws:ecs:service:update <serviceName>    Update the specified service.
    aws:ecs:service:delete <serviceName>    Delete the specified service.
    aws:ecs:service:describe <serviceName>  Describe the specified service.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## File Structure

Various commands within the CLI assume a certain file structure. They are outlined below.

### Services

The below example has a service called `demo-api`.

```
$ tree ./src/services
./src/services
└── demo-api
    └── ecs-service-definition.json
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

### Stacks

The below example has a stack called `ecr`.

```
$ tree ./src/stacks
./src/stacks
└── ecr
    └── cf.json
```

The `cf.json` file is a required file in order to interact with the ECS CloudFormation Commands in the CLI. An example file:

```json
{
  "AWSTemplateFormatVersion": "2010-09-09",
  "Description": "ECS Container Registry Template",
  "Resources": {
    "DockerRegistry": {
      "Type" : "AWS::ECR::Repository",
      "Properties" : {
        "RepositoryName" : "demo-repository"
      }
    }
  }
}
```
