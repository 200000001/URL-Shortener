// mongoDB long URL 삽입

import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'interfaces/IControllerBase.interface'

import shortenerModel from './shortener.model'
import IShortener from './shortener.interface';


class ShortenerController implements IControllerBase {
    public path = '/'
    public router = express.Router()
    
    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.index)
        this.router.get('/:shortcode', this.get)
        this.router.post('/create', this.create)
    }
// 랜덤 url 생성
    private generateRandomUrl(length: Number) {

        const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let urlChars = "";

        for (var i = 0; i < length; i++) {
            urlChars += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        }
            
        return urlChars;
    }
// 인덱스 페이지 비동기 방식 표시
    index = async(req: Request, res: Response) => {

        res.render('home/index')
    }
// shortURL 정보 확인
    get = async(req: Request, res: Response) => {
        
        const { shortcode } = req.params

        const data: IShortener = {
            shortUrl: shortcode
        }

        const urlInfo = await shortenerModel.findOne(data)

        if (urlInfo != null) {
            res.redirect(302, urlInfo.longUrl)
        } else {
            res.render('home/not-found')
        }
    }
// longURL 비동기 방식 단축
    create = async(req: express.Request, res: express.Response) => {

        const { url } = req.body

        const data: IShortener = {
            longUrl: url
        }

        let urlInfo = await shortenerModel.findOne(data)

        if (urlInfo == null) {
            var shortCode: string
            
            do{
                shortCode = this.generateRandomUrl(5)
                urlInfo = await shortenerModel.findOne({shortUrl: shortCode})
            }while(urlInfo !== null)

            const shortData: IShortener = {
                longUrl: url,
                shortUrl: shortCode
            }
    
            const shortenerData = new shortenerModel(shortData)
    
            urlInfo = await shortenerData.save()
        }

        res.json({
            success: true,
            message: 'URL Shortened',
            url: urlInfo.shortUrl
        })
    }
}

export default ShortenerController
