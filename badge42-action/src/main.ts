import * as core from '@actions/core'
import { Client42API } from './utils/42api'

/**
 * entrypoint of GitHub Actions
 */
export const run = async () => {
  const { client_id, client_secret, intraId } = getActionInputs()

  const client = new Client42API({
    client_id,
    client_secret
  })

  const {
    data: { login, campus }
  } = await client.get42User(intraId)
}

const getActionInputs = () => {
  const client_id = core.getInput('fourtytwo-client-id', {
    required: true,
    trimWhitespace: true
  })
  const client_secret = core.getInput('fourtytwo-client-secret', {
    required: true,
    trimWhitespace: true
  })
  const intraId = core.getInput('intra-id', {
    required: true,
    trimWhitespace: true
  })
  const email = core.getInput('email', {
    required: false,
    trimWhitespace: true
  }) as string | undefined

  return {
    client_id,
    client_secret,
    intraId,
    email
  }
}
