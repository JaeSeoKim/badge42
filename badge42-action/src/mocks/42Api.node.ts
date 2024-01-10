import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import {
  Cursus,
  END_POINT_42API,
  Get42OauthToken,
  validateToken
} from '../utils/42api'

export const fake_token_ref: {
  current?: Get42OauthToken | undefined
} = {}

const createFakeToken: () => Get42OauthToken = () => ({
  access_token: Date.now().toString(),
  created_at: Date.now(),
  expires_in: 10000
})

const validatedFakeToken: (
  token?: string | null | undefined
) => boolean = token => {
  const fake_token = fake_token_ref.current
  if (
    token &&
    fake_token &&
    token === `Bearer ${fake_token?.access_token}` &&
    validateToken(fake_token)
  ) {
    return true
  }
  return false
}

const fourtyTwoApiHandler = [
  http.post(`${END_POINT_42API}/oauth/token`, async ({ request }) => {
    const fake_token = fake_token_ref.current
    const { grant_type, client_id, client_secret } = (await request.json()) as {
      grant_type: string
      client_id: string
      client_secret: string
    }

    if (
      !grant_type ||
      !client_id ||
      !client_secret ||
      grant_type !== 'client_credentials'
    )
      return HttpResponse.json({}, { status: 403 })

    if (!validateToken(fake_token)) fake_token_ref.current = createFakeToken()
    return HttpResponse.json(fake_token_ref.current)
  }),
  http.get(`${END_POINT_42API}/v2/cursus`, async ({ request }) => {
    const url = new URL(request.url)

    const totalPage = 1000

    const pageNumber = parseInt(url.searchParams.get('page[number]') ?? '1')
    const pageSize = parseInt(url.searchParams.get('page[size]') ?? '30')

    const mockData: Cursus[] = Array.from({
      length: totalPage - pageSize * pageNumber + pageSize
    }).map((_, i) => ({
      created_at: new Date(i).toISOString(),
      id: i + pageNumber * pageSize,
      name: `name${i + pageNumber * pageSize}`,
      slug: `slug${i + pageNumber * pageSize}`
    }))

    if (!validatedFakeToken(request.headers.get('Authorization'))) {
      return HttpResponse.json({}, { status: 401 })
    }
    return HttpResponse.json(mockData, {
      headers: {
        'X-Per-Page': pageSize.toString(),
        'X-Page': pageNumber.toString(),
        'X-Total': Math.ceil(totalPage / pageSize).toString()
      }
    })
  })
]

export const server = setupServer(...fourtyTwoApiHandler)
