const debug = require('debug')('banner:index')
const Koa = require('koa')
const Router = require('koa-router')
const middleware = require('./src/middleware')
const {
  uploadBanner,
  compressImg,
  compressArchive,
  parseBanner,
  base64Convert,
} = require('./src/controllers')


const router = new Router()
const app = new Koa()

compressImg(router, '/compress/img')
uploadBanner(router, '/upload')
compressArchive(router, '/compress/archive')
parseBanner(router, '/parse/banner')
base64Convert(router, '/base64')

middleware(app)

app
  .use(router.routes())
  .listen(8000, () => {
    debug('server run on port: 8000')
  })
