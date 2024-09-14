export const createPluginData = <TSlotContent extends Record<string, unknown>>(
  conf: {
    name: string
  }
) => {

  const genRenderName_Id = (componentName: string, renderId: string) => conf.name + "_" + componentName + "_" + renderId
  // const genDomId = (renderId: string) => `${logseq.baseInfo.id}--${conf.name}_${renderId}`

  return {
    name: conf.name,
    genId: genRenderName_Id,
    // genDomId
  }
}