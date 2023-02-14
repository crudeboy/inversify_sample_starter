import JwtClient from "../../shared/services/JWT";
import JWTError from "../../shared/utils/JWTError";
import { NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { Request, Response } from "../types";
import environment from "../../config/environment";
import dotenv from "dotenv";
import AuthorizationError from "@shared/utils/AuthorizationError";
dotenv.config();

export interface IUerObj {
  id: string;
  email: string;
  user_type: string;
}

export function adminAuthenticate() {
  return (req: Request, res: Response, next: NextFunction) => {
    const JwtService = new JwtClient();

    const signature = req.get("Authorization");
    if (!signature) {
      throw new JWTError("Token not found.");
    }
    const token = signature.split(" ")[1];
    try {
      const result = verify(token, environment.jwtAccessTokenSecret) as IUerObj;
      req.user = result;
      if (result.user_type !== "admin") throw new Error("User not authorized!!");
      next();
    } catch (error: any) {
      throw new JWTError("Not Authorized");
    }
  };
}

export function grantAdminAaccess() {

  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (req.user.user_type !== "admin") throw new AuthorizationError("User not authorized.", 401);
      next();
    } catch (error: any) {
      throw new AuthorizationError("User not authorized.", 401);
    }
  };
}

export function grantAdminAndFranchiseAaccess() {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const access = ["admin", "franchisee"]
      if (!access.includes(req.user.user_type) ) throw new AuthorizationError("User not authorized.", 401);
      next();
    } catch (error: any) {
      throw new AuthorizationError("User not authorized.", 401);
    }
  };
}

export function grantFranchiseeAaccess() {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (req.user.user_type !== "franchisee") throw new AuthorizationError("User not authorized.", 401);
      next();
    } catch (error: any) {
      throw new AuthorizationError("Only Franchisees are authorized.", 401);
    }
  };
}

export function authenticate() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const JwtService = new JwtClient();

      const signature = req.get("Authorization");
      if (!signature) {
        throw new AuthorizationError("Token not found.", 401);
      }
      const token = signature.split(" ")[1];
      try {
        const result: any = verify(token, environment.jwtAccessTokenSecret);
        req.user as string | JwtPayload;
        req.user = result;
        next();
      } catch (error: any) {
        throw new JWTError("Not Authorized");
      }
    } catch (error) {
      throw new AuthorizationError("Token not found.", 401);
    }
  };
}
