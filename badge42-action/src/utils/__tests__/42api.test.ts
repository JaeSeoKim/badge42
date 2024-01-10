import { describe, it, expect } from 'vitest'
import { fake_token_ref, server } from '../../mocks/42Api.node'
import { Client42API } from '../42api'

server.listen()

describe('Client42API', () => {
  it('test Client42API get42OauthToken.', async () => {
    const api = new Client42API({
      client_id: 'id',
      client_secret: 'secret'
    })
    const { data } = await api.get42OauthToken()
    expect(data.access_token).not.toBeUndefined()
    expect(data.created_at).not.toBeUndefined()
    expect(data.expires_in).not.toBeUndefined()
  })

  it('test Client42API get42Cursus.', async () => {
    const api = new Client42API({
      client_id: 'id',
      client_secret: 'secret'
    })
    const { data } = await api.get42Cursus()
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0].created_at).not.toBeUndefined()
    expect(data[0].id).not.toBeUndefined()
    expect(data[0].name).not.toBeUndefined()
    expect(data[0].slug).not.toBeUndefined()
  })

  it('test Client42API should retry with auth error', async () => {
    const api = new Client42API({
      client_id: 'id',
      client_secret: 'secret'
    })
    let { data } = await api.get42Cursus()
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0].created_at).not.toBeUndefined()
    expect(data[0].id).not.toBeUndefined()
    expect(data[0].name).not.toBeUndefined()
    expect(data[0].slug).not.toBeUndefined()
    fake_token_ref.current = undefined
    data = (await api.get42Cursus()).data
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0].created_at).not.toBeUndefined()
    expect(data[0].id).not.toBeUndefined()
    expect(data[0].name).not.toBeUndefined()
    expect(data[0].slug).not.toBeUndefined()
  })

  it('test Client42API get42Cursus should response all cursus', async () => {
    const api = new Client42API({
      client_id: 'id',
      client_secret: 'secret'
    })
    const { data } = await api.get42Cursus({
      'page[size]': 43,
      'page[number]': 1
    })
    expect(data).toBeInstanceOf(Array)
    expect(data.length).toBe(1000)
  })
})
