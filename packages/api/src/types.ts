import { Response, Request } from 'express'

export type Controller = (req: Request, res: Response, next: () => any) => any
