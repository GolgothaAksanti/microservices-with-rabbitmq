# Prerequisities

## Install RabbitMQ (via Docker)

Make sure you have Docker installed, then run:

```bash
docker run -d --hostname rabbit --name rabbitmq \ -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

in case you do not have docker installed on your machine got to [this official docker documentation](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository) to install docker

- RabbitMQ UI: [http://localhost:15672](http://localhost:15672)
- Username: `guest` | Password: `guest`

## Project setup

- First clone the project
- Install dependencies in each service with your preferable package manager, in my case I use `pnpm`

  - user-service

    ```bash
    cd user-service \ pnpm i
    ```

  - notification-service

    ```bash
    cd ../notification-service \ pnpm i
    ```

  - billing-service

    ```bash
    cd ../billing-service \ pnpm i
    ```

  - common

    ```bash
    cd ../common \ pnpm i
    ```

    in this case, common is a shared library for all services where it hold the rabbitmq implemetation

## Test Everything

1.  Start RabbitMQ (if not running):

    ```bash
    docker start rabbitmq
    ```

2.  Start Notification Service (subscriber):

    ```bash
    cd ../notification-service
    pnpm dev
    ```

    you should see:

    ```bash
     [Listener] Waiting for event user:created
    ```

3.  Start Billing Service (subscriber):

    ```bash
    cd ../billing-service
    pnpm dev
    ```

    you should see:

    ```csharp
     [Listener] Waiting for user:created on queue "billing-service"
    ```

4.  Start User Service (publisher):
    ```bash
    cd ../user-service
    pnpm dev
    ```
    you should see:
    ```csharp
    User Service running on port 5001
    [Publisher] Event user:created published
    ```
5.  Send Request

    ```http
    POST http://localhost:3001/api/users/register
    Body: {
    "name": "Alice",
    "email": "alice@example.com"
    }
    ```

    #### Result

    - user service logs:
      ```csharp
      User Service running on port 5001
      [Publisher] Event user:created published
      ```
    - notification service logs:

      ```csharp
        Sending welcome email to alice@example.com
      ```

    - billing service logs:
      ```csharp
        Billing: Creating billing account for golgotha@example.com
      ```
