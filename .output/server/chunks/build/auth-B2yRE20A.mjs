import { d as defineNuxtRouteMiddleware, f as useSupabaseUser, n as navigateTo } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const auth = defineNuxtRouteMiddleware(async () => {
  const user = useSupabaseUser();
  if (!user.value) return navigateTo("/admin/login");
});

export { auth as default };
//# sourceMappingURL=auth-B2yRE20A.mjs.map
