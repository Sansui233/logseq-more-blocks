import '@logseq/libs'

declare module '@logseq/libs' {
  export type ModelCallbacks<
    CallbackNames = {}, // should be union type
    NodeData extends Record<string, unknown>,
  > = {
      [P in CallbackNames]: (event: {
        className: string
        dataset: NodeData
        id: string
        type: keyof HTMLElementEventMap
        value: string
      }) => Promise<void> | void
    }
}

