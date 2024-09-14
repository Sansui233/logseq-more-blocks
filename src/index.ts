import '@logseq/libs'
import { model } from './common/handlers'
import { provideRendererUI } from './common/render'
import { style } from './common/style'
import MyInput from './components/TextInput'

const genRandomStr = () => Math.random().
  toString(36).
  replace(/[^a-z]+/g, '').
  slice(0, 5)

/**
 * main entry
 */
async function main() {
  logseq.provideModel(model) // prepare dom event method
  logseq.provideStyle(style) // prepare css style
  logseq.App.onMacroRendererSlotted(provideRendererUI) // render on this event

  logseq.Editor.registerSlashCommand('🖊 WYSIWYG', async () => {
    await logseq.Editor.insertAtEditingCursor(
      MyInput.slotText(genRandomStr()))
  })
  logseq.Editor.registerSlashCommand('More Block: Card', async () => {

  })
}

// run on logseq start
logseq.ready(main).catch(console.error)
