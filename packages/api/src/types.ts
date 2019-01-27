import { Response, Request } from 'express'

export type Middleware = (req: Request, res: Response, next: () => any) => any
export type Controller = (req: Request, res: Response) => any
