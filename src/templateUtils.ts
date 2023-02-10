import htm from 'htm'
import { IHTM } from './interfaces'

const css = (tags: any[], ...values: any[]): string => {
  return tags
    .map((tag: any, index: number) => {
      return `${tag}${values[index] || ''}`
    })
    .join('')
}

function h(type: any, props: any, ...children: any[]): IHTM {
  return { type, props, children }
}

const html = htm.bind(h)

export { html, css }
