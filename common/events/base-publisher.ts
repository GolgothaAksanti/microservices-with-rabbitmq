import { Channel } from "amqplib";

// Enforce the shape of the event
export interface Event {
  subject: string;
  data: any;
}

export abstract class BasePublisher<T extends Event> {
  abstract subject: T["subject"];

  constructor(private channel: Channel, private queueName: string) {}

  async publish(data: T["data"]) {
    await this.channel.sendToQueue(
      this.queueName,
      Buffer.from(JSON.stringify(data))
    );
    console.log(`[Publisher] Event ${this.subject} publisher`);
  }
}
