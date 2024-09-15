import { pluginData, provideUiTemplate, TMyTemplate } from "../../common/render";
import { renderHTMLString } from "../../lib/component";
import editorHtml from "./editor.html?raw";
import htmlTemplateString from "./index.html?raw";

const name = "textinput"

type Props = {
  renderId: string,
  content: string,
  blockUuid: string,
}

const TextInput = {
  name,
  slotText: (renderId?: string, slotContent?: string) => {
    return "{{renderer " + pluginData.name + "_" + name + (renderId ? "_" + renderId : "")
      + "," + (slotContent ? slotContent : "Hi")
      + "}}"
  },
  parseSlotText: (blockContent: string | undefined) => {
    if (!blockContent) return ""
    // block Content should be "{{renderer slotid, content}}"
    const startIndex = blockContent.indexOf("{{");
    const endIndex = blockContent.lastIndexOf("}}");
    const middle = blockContent.substring(startIndex + 2, endIndex)
    const arrs = middle.split(",")
    if (arrs.length >= 2) {
      return arrs[1] as string// content part
    }
    return ""
  },
  provideSlotUi: (
    renderId: string,
    slot_id: string,
    slotContents: string[],
    blockUuid: string
  ) => logseq.provideUI({
    key: pluginData.genId(TextInput.name, renderId), // this is part of the dom id. see keepKey
    slot: slot_id, // this var name should be slotid. slot means to insert into editor block. Otherwise, the plugin window will float. <div> with slot__id will wrapper outside your plugin window
    reset: true,
    template: provideUiTemplate(createTextInput, {
      renderId,
      content: slotContents.length !== 0 ? slotContents.join(",") : "",
      blockUuid
    })
  }),
  provideEditorUi: (
    slotRenderId: string,
    content: string,
    rect: DOMRectReadOnly | null,
    slotBlockUuid: string,
  ) => {
    // console.debug("editor UI")
    logseq.provideUI({
      key: pluginData.genId(TextInput.name, "editor_" + slotRenderId),
      close: 'outside',
      template: provideUiTemplate(createTextInputEditor, {
        slotRenderId,
        content,
        slotBlockUuid
      }),
      style: { // styles on container
        left: (rect ? rect.x : 300) + 'px',
        top: (rect ? rect.y : 400) + 'px',
        width: (rect ? rect.width : 500) + "px",
        backgroundColor: " var(--ls-primary-background-color)",
        border: "1px solid var(--ls-border-color)"
      },
      attrs: {
        title: "🖋 Edit Mode"
      }
    })
  }
}

const createTextInput: TMyTemplate<Props> = ({ content, blockUuid, renderId }, datas) => {
  return renderHTMLString(datas, htmlTemplateString, {
    id: pluginData.genId(name, "dom_" + renderId),
    value: content,
    dataBindings: {
      renderId,
      blockUuid,
      onClick: datas.callbackNames.handleClick
    }
  })
}

const createTextInputEditor: TMyTemplate<{
  slotRenderId: string,
  content: string,
  slotBlockUuid: string,
}> = (props, datas) => {
  return renderHTMLString(datas, editorHtml, {
    domId: pluginData.genId(TextInput.name, "editor_" + props.slotRenderId),
    value: props.content,

    dataBindings: {
      onInput: datas.callbackNames.handleInput,
      slotBlockUuid: props.slotBlockUuid,
    }
  })
}

export default TextInput