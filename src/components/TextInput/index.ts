import { pluginData, TMyTemplate } from "../../common/render";
import { renderHTMLString } from "../../lib/component";
import htmlTemplateString from "./index.html?raw";

const name = "textinput"

type Props = {
  renderId: string,
  content: string,
  blockUuid: string,
}

const createTextInput: TMyTemplate<Props> = ({ content, blockUuid, renderId }, datas) => {
  return renderHTMLString(datas, htmlTemplateString, {
    id: pluginData.genId(name, "dom_" + renderId),
    value: content,
    bindings: {
      renderId,
      blockUuid,
      onInput: datas.callbackNames.handleInput,
      onFocusOut: datas.callbackNames.handleFocusOut,
    }
  })
}


const TextInput = {
  name,
  slotText: (renderId?: string, slotContent?: string) => {
    return "{{renderer " + pluginData.name + "_" + name + (renderId ? "_" + renderId : "")
      + "," + (slotContent ? slotContent : "Hi")
      + "}}"
  }
}

export { createTextInput };

export default TextInput
