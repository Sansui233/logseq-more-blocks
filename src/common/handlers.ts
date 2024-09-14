import { ModelCallbacks } from "@logseq/libs";
import TextInput from "../components/TextInput";
import { TNodeData } from "./data-attrs";

export const model: ModelCallbacks<"handleInput" | "handleFocusOut", TNodeData> = {
  handleInput: async (evt) => {
    // console.debug("handleInput", evt)
    // the way to get event.target
    // const elem = evt.id !== "" ? document.getElementById(evt.id) : null
  },

  /**
   *  edit the real text in logseq block
   */
  handleFocusOut: async (evt) => {
    // console.debug("handleFocusOut", evt)
    const block = await logseq.Editor.getBlock(evt.dataset.blockUuid)
    if (block) {
      logseq.Editor.updateBlock(
        evt.dataset.blockUuid,
        TextInput.slotText(
          evt.dataset.renderId,
          evt.value
        )
      )
      // console.debug("handleFocusOut new", block.content)
    }
  }
}
/**
 *  method names: used in dom property value
 */
export const handlerNames = (() => {
  const keys = Object.keys(model) as Array<keyof typeof model>;
  let o: any = {};
  for (let i = 0; i < keys.length; i++) {
    if (!keys[i]) continue;
    o[keys[i]!] = keys[i];
  }
  return o as {
    [P in keyof typeof model]: P;
  };
})();

