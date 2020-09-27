# Split View

Split View is a web component for comparing two images. To use it include `/dist/split-view.js` in a page and then use `<split-view>[...]</split-view>` to use the component. It's best used with `<picture>` elements.

Give the two elements to be compared attributes of `slot="top"` and `slot="bottom"`.

```
<split-view>
  <picture slot="top">
    <img src="https://source.unsplash.com/600x400/?day" alt="Day" />
  </picture>
  <picture slot="bottom">
    <img src="https://source.unsplash.com/600x400/?night" alt="Night" />
  </picture>
</split-view>
```

Split View also supports an optional `mode` and `start` parameters. `mode`` determines how the top and bottom layers are blended. `start` defines the start point for the comparison line (in percent).

```
<split-view mode="screen" start=25>
  <picture slot="top">
    <img src="https://source.unsplash.com/600x400/?day" alt="Day" />
  </picture>
  <picture slot="bottom">
    <img src="https://source.unsplash.com/600x400/?night" alt="Night" />
  </picture>
</split-view>
```

Options are the same as CSS's `mix-blend-mode`.