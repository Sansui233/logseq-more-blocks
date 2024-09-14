export const createRenderer = <TSlotContent extends Record<string, unknown>>(
  conf: {
    name: string
  }
) => {

  /**
   * format the text output that in logseq editor
   * 
   * provide renderId to locate the renderer.
   * provide TSlotContent, and it will be converted to Text
   **/
  const slotText = (
    renderId?: string,
    slotContent?: TSlotContent
  ) => {
    const nameSuffix = renderId ? "_" + renderId : ""
    // convert object to string[] payload
    const payloads = slotContent
      ? Object.keys(slotContent).map(k => `${slotContent[k]}`)
      : undefined
    const payload = payloads ? "," + payloads.join(",") : ""

    return "{{renderer :" + conf.name + nameSuffix + payload + "}}"
  }

  const genRenderName_Id = (renderId: string) => conf.name + "_" + renderId
  const genDomId = (renderId: string) => `${logseq.baseInfo.id}--${conf.name}_${renderId}`

  return {
    name: conf.name,
    slotText,
    genId: genRenderName_Id,
    genDomId
  }
}