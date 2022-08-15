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
                <a id="nav_home" href="index.html" class="item-navBar">Home</a>
                <a id="nav_servicos" href="servicos.html" class="item-navBar">Serviços</a>
                <a id="nav_sobrenos" href="servicos.html" class="item-navBar">Sobre Nós</a>
                <a id="nav_download" href="download.html" class="item-navBar">Download</a>
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
