![iares](https://private-user-images.githubusercontent.com/94268593/366589418-e1d1b87f-b0a3-45d9-9750-8ec7bb662350.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjYwODE0OTEsIm5iZiI6MTcyNjA4MTE5MSwicGF0aCI6Ii85NDI2ODU5My8zNjY1ODk0MTgtZTFkMWI4N2YtYjBhMy00NWQ5LTk3NTAtOGVjN2JiNjYyMzUwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MTElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTExVDE4NTk1MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTlkNjE5MWVjODhkZTljZTg0MWVmZjg5YjE2YzI0ZmIzYzVkNTZkYjVhYmJmODE2MmQwNWFhYWI3NDRjMGQzMGEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.FPDgB12NylMw8fX8v5dfdIeBfLdikiKCAWJUG54VwVM)

> IARES is a javascript micro-library, written in typescript.
> Despite being extremely small (300 lines) it is perfectly capable and allows building SPA applications quickly and uncomplicated.

With IARES you won't waste hours and hours reading documentation. Read once, use forever!

IARES was created taking into account DRY, KISS and YAGNI. Therefore, it is designed to help drive real value in delivering software products and solutions.

No more wasting time, see how to use IARES below.

# Install

Para instalar IARES em um novo projeto:

```
npm install iares
```

Para iniciar a partir de um template:

```
 npx degit github:to-codando/iares-template my-new-project
```

# Component

A component in IARES is just a factory function that can receive properties with a parameter and that returns an object containing the component's resources.

```ts
import { createState, html, css } from 'iares'

import {ComponentType, TemplateType} from './types'


const styles = () => css`
  .title-ctx { color: blue }
`
const template: TemplateType = ({ state, props }) => html`
  <h1 class="title-ctx">Hello ${props.word} ${state.word}!</h1>
`

export HelloApp: ComponentType = ({ props }) => {

  const store = createState({ word: 'world'})

  return {
    styles,
    template
  }
}
```

And to create the application and render the component:

```ts
import { html, createApp, render } from 'iares'

import { HelloApp } from './components/HelloApp'

export const appHost = createApp({
  onMount: (body: HTMLElement) => {
    render(html`<${HelloApp} word="beaultiful" />`, body)
  }
})
```

In the index.html file that loads the application bundle:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello IARES</title>
  </head>
  <body>

    <script src="main.js" type="module"></script>
    
    <script type="module">

      import { appHost } from './main.js'
        
      appHost.mount()

    </script>

  </body>
</html>

```

If you started with the default template described above, just run the code below in the project directory in the terminal to see the result of the configurations created so far.

```
pnpm start
```

That's it for now.

IARES is under development and I'm focused on creating the documentation right now.

I intend to publish the rest of the documentation soon.
