
// variable Name: dom property string
// event handler support see https://github.com/logseq/logseq/blob/master/libs/src/helpers.ts#L422-L451
export const dataAttrs = {
  renderId: 'data-render-id',
  blockUuid: 'data-block-uuid',
  slotBlockUuid: 'data-slot-block-uuid',
  onInput: 'data-on-input',
  onFocusOut: 'data-on-focusout',
  onClick: 'data-on-click',
} as const

// data type fetch from logseq event.dataset
export type TNodeData = {
  [P in keyof typeof dataAttrs]: string
}
