import Handlebars from "handlebars";
import { $Values } from 'utility-types';

type CallbackNames = Record<string, string>
type DataProperties = Record<string, string>

// todo : add event bindings
export type TLsqComponentIntrinsicProps = {}

// a common logseq component binding template for typescript
// check my-type.ts to see how to bind specific event and data
export type TLsqTemplate<
  P extends TLsqComponentIntrinsicProps = any,
  F extends CallbackNames = CallbackNames,
  D extends DataProperties = DataProperties
> = (props: P, datas: { callbackNames: F, dataProperties: D }) => string

// render node templates
export function LsqTemplate<
  P extends TLsqComponentIntrinsicProps,
  F extends CallbackNames = CallbackNames,
  D extends DataProperties = DataProperties,
>
  (
    component: TLsqTemplate<P, F, D>,
    props: P,
    callbackNames: F,
    dataProperties: D
  ) {
  return component(props, { callbackNames, dataProperties })
}

export function renderHTMLString<
  F extends CallbackNames = CallbackNames,
  D extends DataProperties = DataProperties
>(
  datas: { callbackNames: F, dataProperties: D },
  htmlTemplate: string,
  slots: {
    id?: string,    // html dom node id
    value?: string, // html dom node text
    children?: string, // html dom children nodes text
    dataBindings?: { // TODO seperate value binding and handler binding to get a better type hints
      [K in keyof Partial<D>]: unknown | $Values<F>
    },
    [k: string]: unknown
  }
): string {

  const { dataBindings, ...properties } = slots

  // render data-ref
  let bindingStr = ""
  if (slots.dataBindings) {
    const arr = Object.keys(slots.dataBindings).map(k => `${datas.dataProperties[k]}="${slots.dataBindings![k]}"`) // ts compiler bug here
    bindingStr = " " + arr.join(" ") + " "
  }

  const template = Handlebars.compile(htmlTemplate)

  return template(
    Object.assign(properties, {
      dataBindings: new Handlebars.SafeString(bindingStr),
    })
  )

}
