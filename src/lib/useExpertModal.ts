import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EXPERTS, type Expert } from '@/data/experts'

/** Profile modal state stored in the URL (?expert=id) so profiles are shareable. */
export function useExpertModal() {
  const [params, setParams] = useSearchParams()
  // Prerendered pages never include the modal, so it opens only after hydration.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  const id = hydrated ? params.get('expert') : null
  const expert = useMemo(() => EXPERTS.find((e) => e.id === id) ?? null, [id])

  const open = useCallback(
    (e: Expert) =>
      setParams(
        (p) => {
          p.set('expert', e.id)
          return p
        },
        { replace: false, preventScrollReset: true },
      ),
    [setParams],
  )
  const close = useCallback(
    () =>
      setParams(
        (p) => {
          p.delete('expert')
          return p
        },
        { replace: true, preventScrollReset: true },
      ),
    [setParams],
  )
  return { expert, open, close }
}
