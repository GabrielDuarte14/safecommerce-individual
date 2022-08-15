class myHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="header">
        <div class="container">
            <div class="marca">
                <img class="logo" src="assets/logo-img.png" alt="">
                <span class="logo-titulo">SafeCommerce</span>
            </div>
            <div class="navBar">
                <a class="item-navBar aqui">Home</a>
                <a class="item-navBar">Serviços</a>
                <a class="item-navBar">Sobre Nós</a>
                <a class="item-navBar">Contato</a>
            </div>
            <div class="registro">
                <button class="but-login">Login</button>
                <button class="but-cadastro">Cadastro</button>
            </div>

        </div>
    </div>
        `
    }
}

customElements.define('my-header', myHeader);
