declare module 'screen-reader-focus-trap' {
  export interface Options {
    containerDomNode: HTMLElement
    sourceDomNode: HTMLElement
    initialFocusDomNode?: HTMLElement
  }

  export class FocusTrap {
    constructor(options: Options)

    activate(): void
    deactivate(): void
    setInitialFocus(): void
    setFocusBackToSourceDomNode(): void
    gatherOutsideDomNodes(currentElement: HTMLElement | null): void
    hideOutsideDomNodes(): void
    showOutsideDomNodes(): void
    getDomNode(domNode: HTMLElement | string): HTMLElement | null
  }
}
