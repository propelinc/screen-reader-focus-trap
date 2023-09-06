class FocusTrap {
    containerDomNode;
    sourceDomNode;
    initialFocusDomNode;
    hiddenDomNodes = [];
    inertDomNodes = [];
    constructor({ containerDomNode, sourceDomNode, initialFocusDomNode, }) {
        if (!containerDomNode) {
            throw new Error('No containerDomNode provided.');
        }
        if (!sourceDomNode) {
            throw new Error('No sourceDomNode provided.');
        }
        this.containerDomNode = this.getDomNode(containerDomNode);
        this.sourceDomNode = this.getDomNode(sourceDomNode);
        this.initialFocusDomNode = initialFocusDomNode
            ? this.getDomNode(initialFocusDomNode)
            : this.containerDomNode;
    }
    activate() {
        this.hideOutsideDomNodes();
        this.setInitialFocus();
    }
    deactivate() {
        this.showOutsideDomNodes();
        this.setFocusBackToSourceDomNode();
    }
    setInitialFocus() {
        this.initialFocusDomNode && this.initialFocusDomNode.focus();
    }
    setFocusBackToSourceDomNode() {
        this.sourceDomNode && this.sourceDomNode.focus();
    }
    gatherOutsideDomNodes(currentElement) {
        // 1. Start at the current element (begins with the container element).
        // 2. Hide all sibling elements that are not already aria-hidden.
        // 3. Go up one level to the parent element.
        // 4. Repeat steps 2-3 until you reach the `html` element.
        if (!currentElement) {
            return undefined;
        }
        if (currentElement !== document.querySelector('body')) {
            const parentElement = currentElement.parentElement;
            if (parentElement !== null) {
                const siblingElements = [...parentElement.children];
                siblingElements.forEach((element) => {
                    if (element !== currentElement && !element.getAttribute('inert')) {
                        this.hiddenDomNodes.push(element);
                    }
                });
                this.gatherOutsideDomNodes(parentElement);
            }
        }
    }
    hideOutsideDomNodes() {
        this.gatherOutsideDomNodes(this.containerDomNode);
        this.hiddenDomNodes.forEach(element => element.setAttribute('inert', 'true'));
    }
    showOutsideDomNodes() {
        this.hiddenDomNodes.forEach(element => element.removeAttribute('inert'));
        this.hiddenDomNodes = [];
    }
    getDomNode(element) {
        return typeof element === 'string'
            ? document.querySelector(element)
            : element;
    }
}

export { FocusTrap };
