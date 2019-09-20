const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')

const { APP_VERSION, PORT, NODE_ENV } = process.env

const port = parseInt(PORT, 10) || 3000
const dev = NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get(['/', '/ping'], async ctx => {
    ctx.body = {
      status: 'ok',
      version: APP_VERSION,
    }
  })

  router.all('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
