import test from 'ava'
import { stub } from 'sinon'
import { resolve } from 'path'
import { Ctx } from '../../../__TESTS__/koa-ctx'
import folderExists from './folder-exists'

/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
test.beforeEach((t) => {
  t.context.ctx = new Ctx()
  t.context.nextReturns = Math.random()
  t.context.next = stub().returns(t.context.nextReturns)
})


test('test `file-exists` util with nameFolder', async (t) => {
  const ctx = t.context.ctx
  const { next, nextReturns } = t.context
  const resolveStub = stub()
    .returns(resolve(__dirname, 'folder-exists.test.js'))
  const fileInit = folderExists(resolveStub)

  ctx.setRequest('body', {
    nameFolder: 'file-exists.test.js',
  })

  const rs = await fileInit(ctx, next)

  t.true(next.called)
  t.is(rs, nextReturns)
  t.true(resolveStub.called)
})
