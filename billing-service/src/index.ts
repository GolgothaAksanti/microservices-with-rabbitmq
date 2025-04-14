import amqp from "amqplib";

import { UserCreatedListener } from "./event/user-created-listener";

(async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const listener = new UserCreatedListener(channel);
  await listener.listen((user) => {
    console.log(`Billing: Creating billing account for ${user.email}`);
  });
})();
