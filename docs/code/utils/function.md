# 实用工具方法

## 元素是否已进入可视区

```js
function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === 'function' && el instanceof jQuery) {
    el = el[0]
  }
  var rect = el.getBoundingClientRect()
  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)) ||
    (rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight))
  )
}
```

```js
const callback = function(entries) {
  entries.forEach(entry => {
    entry.target.classList.toggle('is-visible')
  })
}

const observer = new IntersectionObserver(callback)

const targets = document.querySelectorAll('.show-on-scroll')
targets.forEach(function(target) {
  observer.observe(target)
})
```

```css
.inline-photo {
  border: 1em solid #fff;
  border-bottom: 4em solid #fff;
  border-radius: 0.25em;
  box-shadow: 1em 1em 2em 0.25em rgba(0, 0, 0, 0.2);
  margin: 2em auto;
  opacity: 0;
  transform: translateY(4em) rotateZ(-5deg);
  transition: transform 4s 0.25s cubic-bezier(0, 1, 0.3, 1), opacity 0.3s 0.25s
      ease-out;
  max-width: 600px;
  width: 90%;
  will-change: transform, opacity;
}

.inline-photo.is-visible {
  opacity: 1;
  transform: rotateZ(-2deg);
}
```
