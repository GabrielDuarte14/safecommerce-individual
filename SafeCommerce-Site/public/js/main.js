class myHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `

        `
    }
}

customElements.define('my-header', myHeader);
