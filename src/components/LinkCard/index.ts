import { pluginData } from "../../common/render"
import { objectToString } from "../../lib/utils"

const name = "linkcard"

const LinkCard = {
  name,
  defaultSlot: {
    title: "Title",
    titleLink: "[[page name]] or https://url",
    picLink: "(optional)https://",
    description: "(optional)text",
  },
  slotText: (
    renderId: string,
    slotContent: {
      title: string,
      titleLink: string,
      picLink: string,
      description: string,
    }) => {
    const idSuffix = renderId ? "_" + renderId : ""

    return "{{renderer " + pluginData.name + "_" + name + idSuffix + ",\n"
      + objectToString(slotContent) + "}}"
  }
}

export default LinkCard