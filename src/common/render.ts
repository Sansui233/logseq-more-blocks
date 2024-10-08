
import LinkCard from "../components/LinkCard";
import TextInput from "../components/TextInput";
import { LsqTemplate, TLsqComponentIntrinsicProps, TLsqTemplate } from "../lib/component";
import { createPluginData } from "../lib/plugin-base";
import { dataAttrs } from "./data-attrs";
import { handlerNames } from "./handlers";


export const pluginData = createPluginData<{
  content?: string // = payloads.arguments
}>({
  name: "mb"
})


export type TMyTemplate<P> = TLsqTemplate<
  P & TLsqComponentIntrinsicProps,
  typeof handlerNames,
  typeof dataAttrs
>;



type TRenderedSlottedHook = Parameters<typeof logseq.App.onMacroRendererSlotted>[0]

/**
 * render the real text into logseq slot template
 */
export const provideRendererUI: TRenderedSlottedHook = (evt) => {
  /* in logseq, {{renderer :plugin-test_dfaoj,Hi there}} will be converted to
  slot = "a slot id generated by logseq"
  payload = {
    name: "renderer",
    arguments: ["plugin-test_dfaoj", "Hi there"]
    uuid: "string-generated-by-logseq"
  }
  **/
  const { slot, payload } = evt
  // the renderer name should be like this: `:plugin-test_component_dfaoj`. 
  // that is pluginData.name_renderId
  // the content elements is split by comma in original text.
  const [rendererName, ...contents] = payload.arguments

  if (!rendererName) return

  const [pluginName, componentName, renderId] = rendererName.split('_')

  // if not the current plugin renderer, do nothing
  if (pluginName !== pluginData.name) return
  // if no renderId, do nothing
  if (!renderId) return

  // else, render the plugin UI
  // console.debug("onMacroRendererSlotted event", evt)

  // dispatch according to components
  if (componentName === TextInput.name) {
    return TextInput.provideSlotUi(renderId, slot, contents, payload.uuid)

  } else if (componentName === LinkCard.name) {
    // return logseq.provideUI({
    //   key: pluginData.genId(LinkCard.name, renderId),
    //   slot, 
    //   reset: true,
    //   template: provideUiTemplate()

    // })
  }
}

export function provideUiTemplate<P extends TLsqComponentIntrinsicProps>(myTemplate: TMyTemplate<P>, props: P) {
  // this one will render all handlers and data attrs in a single component
  // Lsq  provide only one model for every plugin so
  // you have to dispatch behaviors for different renderer in event handler
  return LsqTemplate(myTemplate, props, handlerNames, dataAttrs);
}