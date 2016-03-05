# Docker on ECS

A demonstration on running a Docker cluster within AWS EC2 Container Service (ECS).

## Usage

Run `./bin/cli` for a list of commands.

```
$ ./bin/cli

  Usage: cli [options] [command]


  Commands:

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
