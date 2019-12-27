import { Router, Request, Response } from 'express'

const routes = Router()

routes.route('/')
  .get((req: Request, res: Response) => {
    res.send(
      'It looks like you are trying to access VUTTR over HTTP on the native driver port.'
    )
  })

export default routes
