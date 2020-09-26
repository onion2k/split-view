let tmpl = document.createElement('template');
tmpl.innerHTML = `
  <style>
    :host {
      display: block;
    }
    :host([hidden]) { display: none }
    .split {
      position: relative;
      height: 100%;
      display: grid;
      align-items: center;
      --split: 100;
    }
    .top,
    .bottom {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .bottom {
      background-color: red;
    }
    .top {
      z-index: 2;
      right: calc(8px + (((100% - 16px) / 100) * var(--split)));
      overflow: hidden;
      border-right: 1px solid white;
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      z-index: 3;
      background-color: transparent;
      -webkit-appearance: none;
    }
    input[type="range"]:focus {
      outline: none;
    }    
  </style>
  <div class="split" id="split">
    <div class="bottom" id="bottom"><slot name="bottom"></slot></div>
    <div class="top" id="top"><slot name="top"></slot></div>
    <input type="range" min=0 max=100 value=0 id="slider" />
  </div>
`;
class SplitView extends HTMLElement {
  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }
  connectedCallback() {
    const slider = this.shadowRoot.getElementById("slider");
    const splitter = this.shadowRoot.getElementById("split");
    slider.addEventListener("input", (event) => {
      const split = +event.target.value;
      console.log(split)
      splitter.style.setProperty("--split", 100 - split);
    });

    const top = this.shadowRoot.getElementById("top");
    top.style.mixBlendMode = this.getAttribute("mode") || "normal";
  }
}
window.customElements.define('split-view', SplitView);