import { Types } from "mongoose";

export type AccessTokenPayload = {
  userId: Types.ObjectId;
  sessionId: Types.ObjectId;
};