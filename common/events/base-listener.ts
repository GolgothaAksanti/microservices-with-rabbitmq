import { Channel, ConsumeMessage } from "amqplib";
import { Event } from "./base-publisher";

export abstract class BaseListener<T extends Event> {
  abstract subject: T["subject"];

  constructor(private channel: Channel, private queueName: string) {}

  async listen(callback: (data: T["data"]) => void) {
    await this.channel.assertQueue(this.queueName, { durable: true });
    console.log(`[Listener] waiting for event ${this.subject}`);

    this.channel.consume(this.queueName, (msg: ConsumeMessage | null) => {
      if (msg) {
        const data = JSON.parse(msg.content.toString());
        callback(data);
        this.channel.ack(msg);
      }
    });
  }
}
