import trs from "../../services/translation/translation.service";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      trx: string
    }
  }
}

export default function trx(element: Element, accessor: () => string) {
  const trKey = accessor();
  const translation = trs.get(trKey);

  element.textContent = translation;
}