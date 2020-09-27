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
`;
class SplitView extends HTMLElement {

  /**
   * Split View is an image comparison component
   * 
   * <split-view>
   *   <picture slot="top">[...]</picture>
   *   <picture slot="bottom">[...]</picture>
   * </split-view>
   * 
   * Options are;
   * 
   * start (number) The point where the comparison line should start (0 = left, 1000 = right)
   * mode (string) A CSS mix-blend-mode to use for comparison
   */

  constructor() {
    super();
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  connectedCallback() {
    const splitter = this.shadowRoot.getElementById("split");
    const slider = this.shadowRoot.getElementById("slider");
    const label = this.shadowRoot.getElementById("label");
    const top = this.shadowRoot.getElementById("top");

    const start = this.getAttribute("start") || 50;
    const splitViewLabelText = this.getAttribute("split-view-label") || 'Comparison of two images';
    const sliderLabelText = this.getAttribute("slider-label") || 'Press left and right to compare images';
    const mode = this.getAttribute("mode") || "normal";

    slider.addEventListener("input", (event) => {
      const split = +event.target.value;
      splitter.style.setProperty("--split", split);
      slider.setAttribute('aria-valuenow', split);
    });

    splitter.style.setProperty("--split", start);
    slider.setAttribute('aria-valuenow', start);
    slider.value = start;

    splitter.setAttribute('aria-label', splitViewLabelText)

    label.innerText = sliderLabelText;

    top.style.mixBlendMode = mode;
  }

}
window.customElements.define('split-view', SplitView);