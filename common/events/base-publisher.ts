// base-publisher.ts
import { Channel } from "amqplib";

export interface Event {
  subject: string;
  data: any;
}

export abstract class BasePublisher<T extends Event> {
  abstract subject: T["subject"];

  constructor(private channel: Channel) {}

  async publish(data: T["data"]) {
    await this.channel.assertExchange(this.subject, "fanout", {
      durable: false,
    });

    this.channel.publish(this.subject, "", Buffer.from(JSON.stringify(data)));

    console.log(`[Publisher] Event ${this.subject} published`);
  }
}
