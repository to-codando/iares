import htm  from 'htm'
import type { HTMType, GenericObjectType } from './types'

function h(type: unknown, props: GenericObjectType, ...children: []): HTMType {
  return { type, props, children };
}

const html = htm.bind(h);

export { html };
