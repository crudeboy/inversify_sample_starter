import express from "express";

export interface Response extends express.Response {
  jsend: JSend;
}

export interface Request extends express.Request {
    
}

export interface JSend {
  success(data: any, statusCode?: number): void;
  fail(message: string, data: any): void;
  error(message: string, code?: string, data?: any): void;
  errorWithStatus(message: string, status?: number, data?: any): void;
}

export type stringx = string | null | undefined;