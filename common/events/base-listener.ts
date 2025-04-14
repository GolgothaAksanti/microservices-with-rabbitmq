import { Channel, ConsumeMessage } from "amqplib";
import { Event } from "./base-publisher";

export abstract class BaseListener<T extends Event> {
  abstract subject: T["subject"];
  abstract queueGroupName: string;

  constructor(protected channel: Channel) {}

  async listen(callback: (data: T["data"]) => void) {
    await this.channel.assertExchange(this.subject, "fanout", {
      durable: false,
    });

    const q = await this.channel.assertQueue(this.queueGroupName, {
      durable: false,
    });

    await this.channel.bindQueue(q.queue, this.subject, "");

    console.log(`[Listener] Waiting for ${this.subject} on queue "${q.queue}"`);

    this.channel.consume(q.queue, (msg: ConsumeMessage | null) => {
      if (msg) {
        const data = JSON.parse(msg.content.toString());
        callback(data);
        this.channel.ack(msg);
      }
    });
  }
}
