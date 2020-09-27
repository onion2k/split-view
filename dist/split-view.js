let tmpl=document.createElement("template");tmpl.innerHTML=`
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
      right: calc(8px + (((100% - 16px) / 100) * (100 - var(--split))));
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
`;class SplitView extends HTMLElement{constructor(){super();let t=this.attachShadow({mode:"open"});t.appendChild(tmpl.content.cloneNode(!0))}connectedCallback(){const t=this.shadowRoot.getElementById("slider"),e=this.shadowRoot.getElementById("split"),s=this.shadowRoot.getElementById("top"),o=this.getAttribute("start")||50,n=this.getAttribute("mode")||"normal";t.addEventListener("input",l=>{const i=+l.target.value;console.log(i),e.style.setProperty("--split",i)}),e.style.setProperty("--split",o),t.value=o,s.style.mixBlendMode=n}}window.customElements.define("split-view",SplitView);
