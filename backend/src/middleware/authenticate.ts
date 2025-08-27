import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";

// wrap with catchErrors() if you need this to be async
const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  // NOTE:
  // RequestHandler sets the req to the default express Request typing.
  // this default typing doesn't have property called useId or sessionId.
  // index.d.ts file does not fix this error, type is unkown.
  // I cannot fix it smartly, so just add an ignore annnotation.
  // It is OK for devlopment but not a good idea for production, lol.

 // @ts-ignore
  req.userId = payload.userId;
  // @ts-ignore
  req.sessionId = payload.sessionId;
  next();
};

export default authenticate;
