import { defineComponent, ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import { _ as _export_sfc } from './server.mjs';
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
    const search = ref("");
    const statusFilter = ref("ALL");
    const startDate = ref("");
    const endDate = ref("");
    const currentPage = ref(1);
    const pageSize = ref(10);
    const showModal = ref(false);
    const selectedRecord = ref(null);
    const statusOptions = ["ALL", "PENDING", "VERIFIED", "REJECTED", "NEEDS_CLARIFICATION"];
    function proofUrl(path) {
      return supabase.storage.from("payment-proofs").getPublicUrl(path).data.publicUrl;
    }
    function filterMatches(row) {
      const query = search.value.trim().toLowerCase();
      const matchesSearch = !query || [row.reference_no, row.full_name, row.phone, row.email].map((value) => String(value || "").toLowerCase()).some((value) => value.includes(query));
      const matchesStatus = statusFilter.value === "ALL" || row.status === statusFilter.value;
      const paymentDate = row.payment_date || "";
      const matchesStart = !startDate.value || paymentDate >= startDate.value;
      const matchesEnd = !endDate.value || paymentDate <= endDate.value;
      return matchesSearch && matchesStatus && matchesStart && matchesEnd;
    }
    const filteredRows = computed(() => rows.value.filter(filterMatches));
    const totalPages = computed(() => Math.max(1, Math.ceil(filteredRows.value.length / pageSize.value)));
    const pagedRows = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      return filteredRows.value.slice(start, start + pageSize.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-wrap container" }, _attrs))} data-v-9664382a><div class="admin-head" data-v-9664382a><div data-v-9664382a><h1 class="serif" style="${ssrRenderStyle({ "color": "var(--navy)" })}" data-v-9664382a>Payment Submissions</h1><p data-v-9664382a>Day 30 Vocal Series Finale</p></div><button class="small-btn" data-v-9664382a>Logout</button></div><section class="admin-controls" data-v-9664382a><div class="filter-group" data-v-9664382a><label data-v-9664382a>Search</label><input${ssrRenderAttr("value", unref(search))} placeholder="Search reference, name, phone, email" data-v-9664382a></div><div class="filter-group" data-v-9664382a><label data-v-9664382a>Status</label><select data-v-9664382a><!--[-->`);
      ssrRenderList(statusOptions, (status) => {
        _push(`<option${ssrRenderAttr("value", status)} data-v-9664382a${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), status) : ssrLooseEqual(unref(statusFilter), status)) ? " selected" : ""}>${ssrInterpolate(status)}</option>`);
      });
      _push(`<!--]--></select></div><div class="filter-group" data-v-9664382a><label data-v-9664382a>From</label><input type="date"${ssrRenderAttr("value", unref(startDate))} data-v-9664382a></div><div class="filter-group" data-v-9664382a><label data-v-9664382a>To</label><input type="date"${ssrRenderAttr("value", unref(endDate))} data-v-9664382a></div><div class="filter-group info" data-v-9664382a><label data-v-9664382a>Total</label><div data-v-9664382a>${ssrInterpolate(unref(filteredRows).length)} records</div></div></section>`);
      if (unref(loading)) {
        _push(`<p data-v-9664382a>Loading...</p>`);
      } else {
        _push(`<div data-v-9664382a><table class="table" data-v-9664382a><thead data-v-9664382a><tr data-v-9664382a><th data-v-9664382a>Reference</th><th data-v-9664382a>Name</th><th data-v-9664382a>Phone</th><th data-v-9664382a>Email</th><th data-v-9664382a>Payment Date</th><th data-v-9664382a>Proof</th><th data-v-9664382a>Status</th><th data-v-9664382a>Action</th></tr></thead><tbody data-v-9664382a>`);
        if (unref(pagedRows).length === 0) {
          _push(`<tr data-v-9664382a><td colspan="8" data-v-9664382a>No records match your filters.</td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(pagedRows), (r) => {
          _push(`<tr data-v-9664382a><td data-v-9664382a>${ssrInterpolate(r.reference_no)}</td><td data-v-9664382a>${ssrInterpolate(r.full_name)}</td><td data-v-9664382a>${ssrInterpolate(r.phone)}</td><td data-v-9664382a>${ssrInterpolate(r.email)}</td><td data-v-9664382a>${ssrInterpolate(r.payment_date)}</td><td data-v-9664382a><button class="link-btn" type="button" data-v-9664382a>View</button></td><td data-v-9664382a><span class="pill" data-v-9664382a>${ssrInterpolate(r.status)}</span></td><td data-v-9664382a><select${ssrRenderAttr("value", r.status)} data-v-9664382a><option data-v-9664382a>PENDING</option><option data-v-9664382a>VERIFIED</option><option data-v-9664382a>REJECTED</option><option data-v-9664382a>NEEDS_CLARIFICATION</option></select></td></tr>`);
        });
        _push(`<!--]--></tbody></table><div class="pagination" data-v-9664382a><button class="small-btn"${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} data-v-9664382a>Previous</button><span data-v-9664382a>Page ${ssrInterpolate(unref(currentPage))} of ${ssrInterpolate(unref(totalPages))}</span><button class="small-btn"${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} data-v-9664382a>Next</button></div></div>`);
      }
      if (unref(showModal)) {
        _push(`<div class="modal-backdrop" data-v-9664382a><div class="modal" data-v-9664382a><div class="modal-header" data-v-9664382a><h2 data-v-9664382a>Upload Preview</h2><button class="small-btn" data-v-9664382a>Close</button></div><p data-v-9664382a><strong data-v-9664382a>Reference:</strong> ${ssrInterpolate(unref(selectedRecord).reference_no)}</p><p data-v-9664382a><strong data-v-9664382a>Name:</strong> ${ssrInterpolate(unref(selectedRecord).full_name)}</p><div class="modal-body" data-v-9664382a>`);
        if (unref(selectedRecord) && unref(selectedRecord).proof_file_path) {
          _push(`<iframe${ssrRenderAttr("src", proofUrl(unref(selectedRecord).proof_file_path))} frameborder="0" data-v-9664382a></iframe>`);
        } else {
          _push(`<p data-v-9664382a>No proof available.</p>`);
        }
        _push(`</div>`);
        if (unref(selectedRecord) && unref(selectedRecord).proof_file_path) {
          _push(`<a${ssrRenderAttr("href", proofUrl(unref(selectedRecord).proof_file_path))} target="_blank" class="small-btn" data-v-9664382a>Open in new tab</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
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
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9664382a"]]);

export { index as default };
//# sourceMappingURL=index-C_SfmJnF.mjs.map
