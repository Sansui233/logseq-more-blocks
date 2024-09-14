export const createRenderer = <TSlotContent extends Record<string, unknown>>(
  conf: {
    name: string
  }
) => {

  const genRenderName_Id = (renderId: string) => conf.name + "_" + renderId
  const genDomId = (renderId: string) => `${logseq.baseInfo.id}--${conf.name}_${renderId}`

  return {
    name: conf.name,
    genId: genRenderName_Id,
    genDomId
  }
}