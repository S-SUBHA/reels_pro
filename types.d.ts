import { Connection } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var dbConnection: {
    connection: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export {};
