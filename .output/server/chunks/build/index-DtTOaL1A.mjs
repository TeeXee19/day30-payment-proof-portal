import { defineComponent, ref, reactive, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './server.mjs';
import 'vue-router';

const _imports_0 = publicAssetsURL("/artist.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useSupabaseClient();
    const loading = ref(false);
    const success = ref("");
    const error = ref("");
    const form = reactive({ full_name: "", phone: "", email: "", payment_date: "", confirm: false });
    const file = ref(null);
    const filePreviewUrl = ref(null);
    ref({});
    const lastReference = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="hero"><div class="container topbar"><div class="brand"><div class="logo">MDB</div><div><h1>MATT DE BARITONE</h1><p>VOCAL SERIES</p></div></div><a class="help" href="mailto:info@mattdebaritone.com">Need Help? Contact Us</a></div><div class="container hero-grid"><div><div class="eyebrow">DAY 30 VOCAL SERIES FINALE</div><h2>PAYMENT PROOF <span>SUBMISSION</span></h2><p>Thank you for your interest in the Day 30 Vocal Series Finale. Complete the form below and upload your proof of payment to confirm your participation.</p><div class="feature-row"><div class="feature"><div class="icon">👥</div><div><b>Connect</b><small>With vocal professionals</small></div></div><div class="feature"><div class="icon">📖</div><div><b>Learn</b><small>Advanced vocal techniques</small></div></div><div class="feature"><div class="icon">🎙️</div><div><b>Inspire</b><small>The next generation</small></div></div></div></div><div class="hero-art"><div class="choir"></div><img class=""${ssrRenderAttr("src", _imports_0)} alt="Matt De Baritone"></div></div></section><main class="container"><div class="main-grid"><section class="card"><div class="card-title"><div class="badge">📋</div><div><h3>SUBMISSION FORM</h3><p>Please fill in your details and upload your payment proof.</p></div></div>`);
      if (unref(success)) {
        _push(`<div class="alert success">${ssrInterpolate(unref(success))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(lastReference)) {
        _push(`<div style="${ssrRenderStyle({ "margin-top": "8px" })}"><button class="btn">Download Slip</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="alert error">${ssrInterpolate(unref(error))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<form><div class="form-grid"><div class="field"><label>Full Name <span>*</span></label><input${ssrRenderAttr("value", unref(form).full_name)} placeholder="Enter your full name"></div><div class="field"><label>Phone Number <span>*</span></label><input${ssrRenderAttr("value", unref(form).phone)} placeholder="080xxxxxxxx"></div><div class="field"><label>Email Address <span>*</span></label><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="Enter your email address"></div><div class="field"><label>Payment Date <span>*</span></label><input${ssrRenderAttr("value", unref(form).payment_date)} type="date"></div><div class="field full"><label>Proof of Payment <span>*</span></label><div class="drop"><p><b>Click to upload or drag and drop</b><br><small>JPG, PNG, PDF. Max 2MB</small></p><input type="file" accept="image/*,.pdf">`);
      if (unref(file)) {
        _push(`<div style="${ssrRenderStyle({ "margin-top": "8px" })}"><strong>Selected:</strong> ${ssrInterpolate(unref(file).name)} <small>(${ssrInterpolate((unref(file).size / 1024).toFixed(1))} KB)</small>`);
        if (unref(filePreviewUrl)) {
          _push(`<div style="${ssrRenderStyle({ "margin-top": "8px" })}"><img${ssrRenderAttr("src", unref(filePreviewUrl))} style="${ssrRenderStyle({ "max-width": "180px", "border": "1px solid rgba(0,0,0,0.08)", "padding": "6px", "border-radius": "6px" })}"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><label class="check"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).confirm) ? ssrLooseContain(unref(form).confirm, null) : unref(form).confirm) ? " checked" : ""} type="checkbox"> I confirm that the information provided is accurate.</label><button class="btn"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "SUBMITTING..." : "SUBMIT PAYMENT PROOF")}</button></form></section><aside class="card"><div class="card-title"><div class="badge">ℹ️</div><div><h3>ABOUT THIS SERIES</h3></div></div><p>The Day 30 Vocal Series Finale is a virtual masterclass designed to connect, educate and inspire vocal students and music enthusiasts across the country.</p><div class="about-item"><div class="about-icon">🎙️</div><div><b>Develop Your Voice</b><p>Learn techniques to unlock your full vocal potential.</p></div></div><div class="about-item"><div class="about-icon">📈</div><div><b>Improve Performance</b><p>Gain practical tips to enhance your stage and studio performance.</p></div></div><div class="about-item"><div class="about-icon">📖</div><div><b>Learn Music Pedagogy</b><p>Understand the art and science of teaching music effectively.</p></div></div><div class="about-item"><div class="about-icon">👥</div><div><b>Interact with Professionals</b><p>Engage with seasoned vocal coaches and music professionals.</p></div></div><div class="secure"><b>🔒 Your information is secure</b><p>We take your privacy and data security seriously.</p></div></aside></div><section class="card steps"><div class="card-title"><div class="badge">✓</div><h3>WHAT HAPPENS NEXT?</h3></div><div class="steps-row"><div class="step"><div class="num">1</div><div><b>Submit Form</b><p>Fill in your details and upload your payment proof.</p></div></div><div class="step"><div class="num">2</div><div><b>Review</b><p>Our team will review your submission.</p></div></div><div class="step"><div class="num">3</div><div><b>Confirmation</b><p>You would be notified once your payment is verified.</p></div></div><div class="step"><div class="num">4</div><div><b>You’re In!</b><p>Get ready to participate in the Day 30 Vocal Series Finale.</p></div></div></div></section></main><footer class="footer">© 2025 Matt De Baritone. All Rights Reserved.</footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DtTOaL1A.mjs.map
