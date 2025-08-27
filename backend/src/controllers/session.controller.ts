import { z } from "zod";
import { NOT_FOUND, OK } from "../constants/http";
import SessionModel from "../models/session.model";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";

export const getSessionsHandler = catchErrors(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      // NOTE:
      // get all the reques where the userId equals to request useId.
      
      // userId: req.userId,
      expiresAt: { $gt: new Date() },
    },
    {
      _id: 1,
      userAgent: 1,
      createdAt: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res.status(OK).json(
    // mark the current session
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session.id === req.sessionId && {
        isCurrent: true,
      }),
    }))
  );
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = z.string().parse(req.params.id);
  const deleted = await SessionModel.findOneAndDelete({
    _id: sessionId,

    // NOTE:
    // please add user check, otherwise anyone can remove the session.

    // userId: req.userId,
  });
  appAssert(deleted, NOT_FOUND, "Session not found");
  return res.status(OK).json({ message: "Session removed" });
});
