import { BaseListener } from "../../../common/events/base-listener";
import { UserCreatedEvent } from "../../../common/events/user-created-event";

export class UserCreatedListener extends BaseListener<UserCreatedEvent> {
  subject: UserCreatedEvent["subject"] = "user:created";
}
