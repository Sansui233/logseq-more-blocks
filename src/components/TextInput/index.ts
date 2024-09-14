import { pluginData, TMyTemplate } from "../../common/render";
import { renderHTMLString } from "../../lib/component";
import htmlTemplateString from "./index.html?raw";

type Props = {
  renderId: string,
  content: string,
  blockUuid: string,
}

const myInputConstructor: TMyTemplate<Props> = ({ content, blockUuid, renderId }, datas) => {
  return renderHTMLString(datas, htmlTemplateString, {
    id: pluginData.genId("myid"),
    value: content,
    bindings: {
      renderId,
      blockUuid,
      onInput: datas.callbackNames.handleInput,
      onFocusOut: datas.callbackNames.handleFocusOut,
    }
  })
}

const name = "mb-input"

const MyInput = Object.assign(myInputConstructor, {
  slotText: (
    renderId?: string,
    slotContent?: string
  ) => {
    const idSuffix = renderId ? "_" + renderId : ""
    return "{{renderer :" + name + idSuffix + slotContent + "}}"
  }
})



export default MyInput
