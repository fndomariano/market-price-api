import { Request, Response } from 'express'

class MarketController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.json("Market")
  }
}


export default new MarketController()
