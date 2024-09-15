import '@logseq/libs'
import { model } from './common/handlers'
import { provideRendererUI } from './common/render'
import { style } from './common/style'
import LinkCard from './components/LinkCard'
import TextInput from './components/TextInput'

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

  logseq.Editor.registerSlashCommand('🔷 More Blocks: LinkCard', async () => {
    await logseq.Editor.insertAtEditingCursor(
      LinkCard.slotText(genRandomStr(), LinkCard.defaultSlot)
    )
  }
  )
  logseq.Editor.registerSlashCommand('🔷 More Blocks: One line WYSIWYG (Experimantal)', async () => {
    await logseq.Editor.insertAtEditingCursor(
      TextInput.slotText(genRandomStr()))
  })
}

// run on logseq start
logseq.ready(main).catch(console.error)
