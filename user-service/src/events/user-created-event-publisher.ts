import { BasePublisher } from "common/events/base-publisher";
import { UserCreatedEvent } from "../../../common/events/user-created-event";

export class UserCreatedPublisher extends BasePublisher<UserCreatedEvent> {
  subject: UserCreatedEvent["subject"] = "user:created";
}
