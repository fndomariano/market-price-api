import { Request, Response } from 'express'

class IndexController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.json("Home")
  }
}


export default new IndexController()
