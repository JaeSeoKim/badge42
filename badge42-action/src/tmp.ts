/* eslint-disable @typescript-eslint/ban-ts-comment */

/**
 * this script for debuging and test
 *
 * please don't use it.!
 */

import { Client42API } from './utils/42api'

import fs from 'node:fs'

const run = async () => {
  console.log('hello')
  const client = new Client42API({
    // @ts-ignore
    client_id: import.meta.env.VITE_CLIENT_ID_42,
    // @ts-ignore
    client_secret: import.meta.env.VITE_CLIENT_SECRET_42
  })
  const { data } = await client.get42User('jaeskim')

  fs.writeFileSync('./dist/user.json', JSON.stringify(data))
}

run()
