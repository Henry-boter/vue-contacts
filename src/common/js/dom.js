/**
 * Created by Administrator on 2018/4/22.
 */
// DOM操作
export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
