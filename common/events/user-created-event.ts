export type UserCreatedEvent = {
  subject: "user:created";
  data: {
    id: number;
    name: string;
    email: string;
  };
};
