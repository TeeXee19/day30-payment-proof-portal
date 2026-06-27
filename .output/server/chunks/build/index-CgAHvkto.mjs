import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const supabase = useSupabaseClient();
    const rows = ref([]);
    const loading = ref(true);
    function proofUrl(path) {
      return supabase.storage.from("payment-proofs").getPublicUrl(path).data.publicUrl;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-wrap container" }, _attrs))}><div class="admin-head"><div><h1 class="serif" style="${ssrRenderStyle({ "color": "var(--navy)" })}">Payment Submissions</h1><p>Day 30 Vocal Series Finale</p></div><button class="small-btn">Logout</button></div>`);
      if (unref(loading)) {
        _push(`<p>Loading...</p>`);
      } else {
        _push(`<table class="table"><thead><tr><th>Reference</th><th>Name</th><th>Phone</th><th>Email</th><th>Payment Date</th><th>Proof</th><th>Status</th><th>Action</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(rows), (r) => {
          _push(`<tr><td>${ssrInterpolate(r.reference_no)}</td><td>${ssrInterpolate(r.full_name)}</td><td>${ssrInterpolate(r.phone)}</td><td>${ssrInterpolate(r.email)}</td><td>${ssrInterpolate(r.payment_date)}</td><td><a${ssrRenderAttr("href", proofUrl(r.proof_file_path))} target="_blank">View</a></td><td><span class="pill">${ssrInterpolate(r.status)}</span></td><td><select${ssrRenderAttr("value", r.status)}><option>PENDING</option><option>VERIFIED</option><option>REJECTED</option><option>NEEDS_CLARIFICATION</option></select></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CgAHvkto.mjs.map
