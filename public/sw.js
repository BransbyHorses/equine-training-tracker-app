if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const d=e=>n(e,c),r={module:{uri:c},exports:t,require:d};s[c]=Promise.all(i.map((e=>r[e]||d(e)))).then((e=>(a(...e),t)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/GtYAbfMfZCEdsUWfKIxmq/_buildManifest.js",revision:"3a0a626564af43dda0b79d7462629a27"},{url:"/_next/static/GtYAbfMfZCEdsUWfKIxmq/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/GtYAbfMfZCEdsUWfKIxmq/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/116-d1e38b30511887e9.js",revision:"d1e38b30511887e9"},{url:"/_next/static/chunks/462-614a08468174bed7.js",revision:"614a08468174bed7"},{url:"/_next/static/chunks/51-911d8c0641690ab9.js",revision:"911d8c0641690ab9"},{url:"/_next/static/chunks/544-ad5768db596400d7.js",revision:"ad5768db596400d7"},{url:"/_next/static/chunks/658-acfcce9bd0f1e2dd.js",revision:"acfcce9bd0f1e2dd"},{url:"/_next/static/chunks/733-05ca49f4c9467c54.js",revision:"05ca49f4c9467c54"},{url:"/_next/static/chunks/886-190dd7ab0d916e6a.js",revision:"190dd7ab0d916e6a"},{url:"/_next/static/chunks/894.884bc9854a9cfe85.js",revision:"884bc9854a9cfe85"},{url:"/_next/static/chunks/framework-4556c45dd113b893.js",revision:"4556c45dd113b893"},{url:"/_next/static/chunks/main-de115f8c0724216f.js",revision:"de115f8c0724216f"},{url:"/_next/static/chunks/pages/_app-61ae0b6a91840e61.js",revision:"61ae0b6a91840e61"},{url:"/_next/static/chunks/pages/_error-815e492bede44f3e.js",revision:"815e492bede44f3e"},{url:"/_next/static/chunks/pages/admin-ea2b4a8833b4c180.js",revision:"ea2b4a8833b4c180"},{url:"/_next/static/chunks/pages/admin/categories-5591e36855e888de.js",revision:"5591e36855e888de"},{url:"/_next/static/chunks/pages/admin/categories/%5Bid%5D-eba502eb540cf98e.js",revision:"eba502eb540cf98e"},{url:"/_next/static/chunks/pages/admin/categories/add-category-1659a1a7d2469c3e.js",revision:"1659a1a7d2469c3e"},{url:"/_next/static/chunks/pages/admin/disruptions-5d2fefdec85c8cb4.js",revision:"5d2fefdec85c8cb4"},{url:"/_next/static/chunks/pages/admin/disruptions/%5Bid%5D-e10b6dd3dc779719.js",revision:"e10b6dd3dc779719"},{url:"/_next/static/chunks/pages/admin/disruptions/add-disruption-58f099291093fb3e.js",revision:"58f099291093fb3e"},{url:"/_next/static/chunks/pages/admin/environments-e4384cb6aa21badf.js",revision:"e4384cb6aa21badf"},{url:"/_next/static/chunks/pages/admin/environments/%5Bid%5D-246d29d935dfd4ce.js",revision:"246d29d935dfd4ce"},{url:"/_next/static/chunks/pages/admin/environments/add-environment-9e5027ada4c4c60f.js",revision:"9e5027ada4c4c60f"},{url:"/_next/static/chunks/pages/admin/equines-357c44748b835928.js",revision:"357c44748b835928"},{url:"/_next/static/chunks/pages/admin/equines/%5Bid%5D-8c6cf8f3bc3f4db0.js",revision:"8c6cf8f3bc3f4db0"},{url:"/_next/static/chunks/pages/admin/equines/add-equine-fd4fb3f2cef8309b.js",revision:"fd4fb3f2cef8309b"},{url:"/_next/static/chunks/pages/admin/learner-types-c9440de7bbefa362.js",revision:"c9440de7bbefa362"},{url:"/_next/static/chunks/pages/admin/learner-types/%5Bid%5D-7e30eac7b255850e.js",revision:"7e30eac7b255850e"},{url:"/_next/static/chunks/pages/admin/learner-types/add-learner-type-d3c78d2d8349bcd7.js",revision:"d3c78d2d8349bcd7"},{url:"/_next/static/chunks/pages/admin/skills-c4659a845fd16ddc.js",revision:"c4659a845fd16ddc"},{url:"/_next/static/chunks/pages/admin/skills/%5Bid%5D-be83a5061d08fdb5.js",revision:"be83a5061d08fdb5"},{url:"/_next/static/chunks/pages/admin/skills/add-skill-f440dc0444ff1310.js",revision:"f440dc0444ff1310"},{url:"/_next/static/chunks/pages/admin/training-methods-8f93786cc453922f.js",revision:"8f93786cc453922f"},{url:"/_next/static/chunks/pages/admin/training-methods/%5Bid%5D-7f97f1a25568fc43.js",revision:"7f97f1a25568fc43"},{url:"/_next/static/chunks/pages/admin/training-methods/add-training-method-b86cb97002b33251.js",revision:"b86cb97002b33251"},{url:"/_next/static/chunks/pages/admin/training-programmes-6486840f21e4ee07.js",revision:"6486840f21e4ee07"},{url:"/_next/static/chunks/pages/admin/training-programmes/%5Bid%5D-748186495ffae696.js",revision:"748186495ffae696"},{url:"/_next/static/chunks/pages/admin/training-programmes/add-programme-4fd300344db91fa9.js",revision:"4fd300344db91fa9"},{url:"/_next/static/chunks/pages/admin/yards-b0a7fb3620eb251f.js",revision:"b0a7fb3620eb251f"},{url:"/_next/static/chunks/pages/admin/yards/%5Bid%5D-06ccd211c4e6a105.js",revision:"06ccd211c4e6a105"},{url:"/_next/static/chunks/pages/admin/yards/add-yard-df145f20447f1cf1.js",revision:"df145f20447f1cf1"},{url:"/_next/static/chunks/pages/equines/%5BequineId%5D-079b0aab4fada117.js",revision:"079b0aab4fada117"},{url:"/_next/static/chunks/pages/equines/%5BequineId%5D/training-history-95ca3c2c4610f246.js",revision:"95ca3c2c4610f246"},{url:"/_next/static/chunks/pages/index-e8fd800916a42f6c.js",revision:"e8fd800916a42f6c"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-862aef110bb432d1.js",revision:"862aef110bb432d1"},{url:"/_next/static/css/728ee9e6b98bb3f8.css",revision:"728ee9e6b98bb3f8"},{url:"/_next/static/media/bransbyLogo.49e0f65c.svg",revision:"c89b6ff6a12f096ed7f45d3a777118b3"},{url:"/css/main.css",revision:"04148cc003636559d62d7b60aca8e215"},{url:"/favicon.ico",revision:"4ff59fef4ad8bd2547e3db47bac48f20"},{url:"/icons/icon-128x128.png",revision:"d626cfe7c65e6e5403bcbb9d13aa5053"},{url:"/icons/icon-144x144.png",revision:"e53a506b62999dc7a4f8b7222f8c5add"},{url:"/icons/icon-152x152.png",revision:"18b3958440703a9ecd3c246a0f3f7c72"},{url:"/icons/icon-16x16.png",revision:"83703514f19796ee15151e450984416d"},{url:"/icons/icon-192x192.png",revision:"27dc12f66697a47b6a8b3ee25ba96257"},{url:"/icons/icon-32x32.png",revision:"25e2c6ee34840568012b32e4314278df"},{url:"/icons/icon-384x384.png",revision:"a40324a3fde2b0b26eeffd4f08bf8be8"},{url:"/icons/icon-512x512.png",revision:"93d6e8e15cfa78dfee55446f607d9a28"},{url:"/icons/icon-72x72.png",revision:"f2ffc41b3482888f3ae614e0dd2f6980"},{url:"/icons/icon-96x96.png",revision:"fba02a40f7ba6fc65be8a2f245480f6d"},{url:"/manifest.json",revision:"c96057f6fe080d95b52920d55437ade9"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
