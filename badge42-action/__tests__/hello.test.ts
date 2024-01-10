import { describe, it, expect, vi } from 'vitest'

import * as main from '../src/main'

// Mock the action's entrypoint
const runMock = vi.spyOn(main, 'run').mockImplementation(async () => {})

describe('index', () => {
  it('calls run when imported', async () => {
    await import('../src/index')

    expect(runMock).toHaveBeenCalledOnce()
  })
})
