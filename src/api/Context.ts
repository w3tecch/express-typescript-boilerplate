import express from 'express';
import { ContainerInstance } from 'typedi';

interface User {
    id: string;
    role: string;
}

export interface Context {
  requestId: number;
  request: express.Request;
  response: express.Response;
  container: ContainerInstance;
  user: User;
}
