import express from "express";
import amqp from "amqplib";
import { UserCreatedPublisher } from "../events/user-created-event-publisher";

const router = express.Router();

router.post("/register", async (req, res) => {
  const user = { id: Date.now(), name: req.body.name, email: req.body.email };

  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const publisher = new UserCreatedPublisher(channel, "user_created");
  await publisher.publish(user);

  res.status(201).json({ message: "user created", user });

  setTimeout(() => connection.close(), 500);
});

export default router;
