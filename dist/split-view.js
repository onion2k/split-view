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
      outline: var(--outline, -webkit-focus-ring-color auto 1px);
    }
  </style>
  <div class="split" id="split" role="img" aria-label="Comparison of two images">
    <div
      class="bottom"
      id="bottom"
      aria-label="First image to compare"
    >
      <slot name="bottom"></slot>
    </div>
    <div
      class="top"
      id="top"
      aria-label="Second image to compare"
    >
      <slot name="top"></slot>  
    </div>
    <label id="label" for="slider">Slide left and right to compare images</label>
    <input
      type="range"
      role="slider"
      min=0
      max=100
      value=0
      name="slider"
      id="slider"
      aria-labelledby="label"
      aria-valuemin=0
      aria-valuemax=100
    />
    </div>
`;class SplitView extends HTMLElement{constructor(){super();let t=this.attachShadow({mode:"open"});t.appendChild(tmpl.content.cloneNode(!0))}connectedCallback(){const t=this.shadowRoot.getElementById("split"),e=this.shadowRoot.getElementById("slider"),l=this.shadowRoot.getElementById("label"),s=this.shadowRoot.getElementById("top"),i=this.getAttribute("start")||50,a=this.getAttribute("split-view-label")||"Comparison of two images",r=this.getAttribute("slider-label")||"Press left and right to compare images",n=this.getAttribute("mode")||"normal";e.addEventListener("input",d=>{const o=+d.target.value;t.style.setProperty("--split",o),e.setAttribute("aria-valuenow",o)}),t.style.setProperty("--split",i),e.setAttribute("aria-valuenow",i),e.value=i,t.setAttribute("aria-label",a),l.innerText=r,s.style.mixBlendMode=n}}window.customElements.define("split-view",SplitView);
