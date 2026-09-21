import { miniFor } from '@/config/images'

/** 36px round thumbnail for menu items. Renders nothing if no image exists. */
export function MenuThumb({ id }: { id?: string }) {
  const src = id ? miniFor(id) : null
  if (!src) return null
  return (
    <img
      src={src}
      alt=""
      width={96}
      height={96}
      loading="lazy"
      decoding="async"
      className="size-9 shrink-0 rounded-full border border-line-soft object-cover"
    />
  )
}
