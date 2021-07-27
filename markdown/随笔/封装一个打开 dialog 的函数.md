```
import Dialog from './Dialog.vue'
import { createApp, h } from 'vue'

export const openDialog = options => {
  const {title, content} = options
  const div = document.createElement('div')
  document.body.appendChild(div)
  const app = createApp({
    render() {
      return h(Dialog, {visible: true, 'onUpdate:visible': newVisible => {
        if (newVisible === false) {
          app.unmount(div)
          div.remove()
        }
      }}, {title, content})
    }
  })
}
```