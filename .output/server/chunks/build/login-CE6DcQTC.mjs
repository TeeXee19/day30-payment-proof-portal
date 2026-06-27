import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import { u as useRouter } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    useRouter();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-wrap container" }, _attrs))}><section class="card" style="${ssrRenderStyle({ "max-width": "440px", "margin": "auto" })}"><div class="brand"><div class="logo">MDB</div><div><h1>ADMIN LOGIN</h1><p>VOCAL SERIES</p></div></div>`);
      if (unref(error)) {
        _push(`<div class="alert error">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form style="${ssrRenderStyle({ "margin-top": "24px" })}"><label>Email</label><input${ssrRenderAttr("value", unref(email))} type="email"><br><br><label>Password</label><input${ssrRenderAttr("value", unref(password))} type="password"><br><br><button class="btn">LOGIN</button></form></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-CE6DcQTC.mjs.map
