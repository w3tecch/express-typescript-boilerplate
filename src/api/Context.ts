import express from 'express';
import { ContainerInstance } from 'typedi';

export interface Context {
  requestId: number;
  request: express.Request;
  response: express.Response;
  container: ContainerInstance;
}
