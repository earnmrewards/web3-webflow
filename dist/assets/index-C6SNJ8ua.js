const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-VIO7TVAO.js","plugin-staging-1.1.1.js","plugin-staging-1.1.1.css"])))=>i.map(i=>d[i]);
import{_ as pe}from"../plugin-staging-1.1.1.js";const me=Symbol(),ee=Object.getPrototypeOf,J=new WeakMap,he=e=>e&&(J.has(e)?J.get(e):ee(e)===Object.prototype||ee(e)===Array.prototype),ge=e=>he(e)&&e[me]||null,te=(e,t=!0)=>{J.set(e,t)};var z={VITE_BASE_URL:"https://cdn.jsdelivr.net/gh/earnmrewards/web3-webflow@feat/alchemy-connect/dist/",VITE_ALCHEMY_API_KEY:"pWRIWfoUE9MIS3G2W_4Ai74lPInS3Sy8",VITE_API_BASE_URL:"https://staging-toolkit.earnm.com/api/v1",VITE_API_KEY:"e0ad36b68e29b92017ca749514a4e4c1",VITE_API_SECRET:"a0e719be9650994faa7194b04aff2e8ede01cbd659806aff583ba7b2475d71ef",VITE_SMART_NODES_CONTRACT_ADDRESS:"0x17FAe73F734D77Cc1015b21D0e437a23932C05fa",VITE_ENVIRONMENT:"development",VITE_SMART_NODES_API:"https://smartnodesapi.earnm.com/api/v1",VITE_SMART_NODES_PARTNER_API:"https://staging-api.earnm.com/api/v1",VITE_WALLET_CONNECT_PROJECT_ID:"b20d22fd579280c2056a8496a5a18ddb",BASE_URL:"https://cdn.jsdelivr.net/gh/earnmrewards/web3-webflow@feat/alchemy-connect/dist/",MODE:"development",DEV:!1,PROD:!0,SSR:!1};const Y=e=>typeof e=="object"&&e!==null,A=new WeakMap,x=new WeakSet,ve=(e=Object.is,t=(o,g)=>new Proxy(o,g),s=o=>Y(o)&&!x.has(o)&&(Array.isArray(o)||!(Symbol.iterator in o))&&!(o instanceof WeakMap)&&!(o instanceof WeakSet)&&!(o instanceof Error)&&!(o instanceof Number)&&!(o instanceof Date)&&!(o instanceof String)&&!(o instanceof RegExp)&&!(o instanceof ArrayBuffer),n=o=>{switch(o.status){case"fulfilled":return o.value;case"rejected":throw o.reason;default:throw o}},l=new WeakMap,c=(o,g,y=n)=>{const I=l.get(o);if((I==null?void 0:I[0])===g)return I[1];const _=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o));return te(_,!0),l.set(o,[g,_]),Reflect.ownKeys(o).forEach(D=>{if(Object.getOwnPropertyDescriptor(_,D))return;const O=Reflect.get(o,D),P={value:O,enumerable:!0,configurable:!0};if(x.has(O))te(O,!1);else if(O instanceof Promise)delete P.value,P.get=()=>y(O);else if(A.has(O)){const[v,H]=A.get(O);P.value=c(v,H(),y)}Object.defineProperty(_,D,P)}),Object.preventExtensions(_)},d=new WeakMap,u=[1,1],C=o=>{if(!Y(o))throw new Error("object required");const g=d.get(o);if(g)return g;let y=u[0];const I=new Set,_=(i,a=++u[0])=>{y!==a&&(y=a,I.forEach(r=>r(i,a)))};let D=u[1];const O=(i=++u[1])=>(D!==i&&!I.size&&(D=i,v.forEach(([a])=>{const r=a[1](i);r>y&&(y=r)})),y),P=i=>(a,r)=>{const h=[...a];h[1]=[i,...h[1]],_(h,r)},v=new Map,H=(i,a)=>{if((z?"development":void 0)!=="production"&&v.has(i))throw new Error("prop listener already exists");if(I.size){const r=a[3](P(i));v.set(i,[a,r])}else v.set(i,[a])},Z=i=>{var a;const r=v.get(i);r&&(v.delete(i),(a=r[1])==null||a.call(r))},fe=i=>(I.add(i),I.size===1&&v.forEach(([r,h],j)=>{if((z?"development":void 0)!=="production"&&h)throw new Error("remove already exists");const N=r[3](P(j));v.set(j,[r,N])}),()=>{I.delete(i),I.size===0&&v.forEach(([r,h],j)=>{h&&(h(),v.set(j,[r]))})}),F=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o)),k=t(F,{deleteProperty(i,a){const r=Reflect.get(i,a);Z(a);const h=Reflect.deleteProperty(i,a);return h&&_(["delete",[a],r]),h},set(i,a,r,h){const j=Reflect.has(i,a),N=Reflect.get(i,a,h);if(j&&(e(N,r)||d.has(r)&&e(N,d.get(r))))return!0;Z(a),Y(r)&&(r=ge(r)||r);let V=r;if(r instanceof Promise)r.then(W=>{r.status="fulfilled",r.value=W,_(["resolve",[a],W])}).catch(W=>{r.status="rejected",r.reason=W,_(["reject",[a],W])});else{!A.has(r)&&s(r)&&(V=C(r));const W=!x.has(V)&&A.get(V);W&&H(a,W)}return Reflect.set(i,a,V,h),_(["set",[a],r,N]),!0}});d.set(o,k);const ue=[F,O,c,fe];return A.set(k,ue),Reflect.ownKeys(o).forEach(i=>{const a=Object.getOwnPropertyDescriptor(o,i);"value"in a&&(k[i]=o[i],delete a.value,delete a.writable),Object.defineProperty(F,i,a)}),k})=>[C,A,x,e,t,s,n,l,c,d,u],[Ie]=ve();function L(e={}){return Ie(e)}function T(e,t,s){const n=A.get(e);(z?"development":void 0)!=="production"&&!n&&console.warn("Please use proxy object");let l;const c=[],d=n[3];let u=!1;const o=d(g=>{c.push(g),l||(l=Promise.resolve().then(()=>{l=void 0,u&&t(c.splice(0))}))});return u=!0,()=>{u=!1,o()}}function _e(e,t){const s=A.get(e);(z?"development":void 0)!=="production"&&!s&&console.warn("Please use proxy object");const[n,l,c]=s;return c(n,l(),t)}const f=L({history:["ConnectWallet"],view:"ConnectWallet",data:void 0}),de={state:f,subscribe(e){return T(f,()=>e(f))},push(e,t){e!==f.view&&(f.view=e,t&&(f.data=t),f.history.push(e))},reset(e){f.view=e,f.history=[e]},replace(e){f.history.length>1&&(f.history[f.history.length-1]=e,f.view=e)},goBack(){if(f.history.length>1){f.history.pop();const[e]=f.history.slice(-1);f.view=e}},setData(e){f.data=e}},m={WALLETCONNECT_DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",WCM_VERSION:"WCM_VERSION",RECOMMENDED_WALLET_AMOUNT:9,isMobile(){return typeof window<"u"?!!(window.matchMedia("(pointer:coarse)").matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},isAndroid(){return m.isMobile()&&navigator.userAgent.toLowerCase().includes("android")},isIos(){const e=navigator.userAgent.toLowerCase();return m.isMobile()&&(e.includes("iphone")||e.includes("ipad"))},isHttpUrl(e){return e.startsWith("http://")||e.startsWith("https://")},isArray(e){return Array.isArray(e)&&e.length>0},isTelegram(){return typeof window<"u"&&(!!window.TelegramWebviewProxy||!!window.Telegram||!!window.TelegramWebviewProxyProto)},formatNativeUrl(e,t,s){if(m.isHttpUrl(e))return this.formatUniversalUrl(e,t,s);let n=e;n.includes("://")||(n=e.replaceAll("/","").replaceAll(":",""),n=`${n}://`),n.endsWith("/")||(n=`${n}/`),this.setWalletConnectDeepLink(n,s);const l=encodeURIComponent(t);return`${n}wc?uri=${l}`},formatUniversalUrl(e,t,s){if(!m.isHttpUrl(e))return this.formatNativeUrl(e,t,s);let n=e;if(n.startsWith("https://t.me")){const c=Buffer.from(t).toString("base64").replace(/[=]/g,"");n.endsWith("/")&&(n=n.slice(0,-1)),this.setWalletConnectDeepLink(n,s);const d=new URL(n);return d.searchParams.set("startapp",c),d.toString()}n.endsWith("/")||(n=`${n}/`),this.setWalletConnectDeepLink(n,s);const l=encodeURIComponent(t);return`${n}wc?uri=${l}`},async wait(e){return new Promise(t=>{setTimeout(t,e)})},openHref(e,t){const s=this.isTelegram()?"_blank":t;window.open(e,s,"noreferrer noopener")},setWalletConnectDeepLink(e,t){try{localStorage.setItem(m.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},setWalletConnectAndroidDeepLink(e){try{const[t]=e.split("?");localStorage.setItem(m.WALLETCONNECT_DEEPLINK_CHOICE,JSON.stringify({href:t,name:"Android"}))}catch{console.info("Unable to set WalletConnect android deep link")}},removeWalletConnectDeepLink(){try{localStorage.removeItem(m.WALLETCONNECT_DEEPLINK_CHOICE)}catch{console.info("Unable to remove WalletConnect deep link")}},setModalVersionInStorage(){try{typeof localStorage<"u"&&localStorage.setItem(m.WCM_VERSION,"2.7.0")}catch{console.info("Unable to set Web3Modal version in storage")}},getWalletRouterData(){var e;const t=(e=de.state.data)==null?void 0:e.Wallet;if(!t)throw new Error('Missing "Wallet" view data');return t}},be=typeof location<"u"&&(location.hostname.includes("localhost")||location.protocol.includes("https")),p=L({enabled:be,userSessionId:"",events:[],connectedWalletId:void 0}),ye={state:p,subscribe(e){return T(p.events,()=>e(_e(p.events[p.events.length-1])))},initialize(){p.enabled&&typeof(crypto==null?void 0:crypto.randomUUID)<"u"&&(p.userSessionId=crypto.randomUUID())},setConnectedWalletId(e){p.connectedWalletId=e},click(e){if(p.enabled){const t={type:"CLICK",name:e.name,userSessionId:p.userSessionId,timestamp:Date.now(),data:e};p.events.push(t)}},track(e){if(p.enabled){const t={type:"TRACK",name:e.name,userSessionId:p.userSessionId,timestamp:Date.now(),data:e};p.events.push(t)}},view(e){if(p.enabled){const t={type:"VIEW",name:e.name,userSessionId:p.userSessionId,timestamp:Date.now(),data:e};p.events.push(t)}}},E=L({chains:void 0,walletConnectUri:void 0,isAuth:!1,isCustomDesktop:!1,isCustomMobile:!1,isDataLoaded:!1,isUiLoaded:!1}),b={state:E,subscribe(e){return T(E,()=>e(E))},setChains(e){E.chains=e},setWalletConnectUri(e){E.walletConnectUri=e},setIsCustomDesktop(e){E.isCustomDesktop=e},setIsCustomMobile(e){E.isCustomMobile=e},setIsDataLoaded(e){E.isDataLoaded=e},setIsUiLoaded(e){E.isUiLoaded=e},setIsAuth(e){E.isAuth=e}},B=L({projectId:"",mobileWallets:void 0,desktopWallets:void 0,walletImages:void 0,chains:void 0,enableAuthMode:!1,enableExplorer:!0,explorerExcludedWalletIds:void 0,explorerRecommendedWalletIds:void 0,termsOfServiceUrl:void 0,privacyPolicyUrl:void 0}),R={state:B,subscribe(e){return T(B,()=>e(B))},setConfig(e){var t,s;ye.initialize(),b.setChains(e.chains),b.setIsAuth(!!e.enableAuthMode),b.setIsCustomMobile(!!((t=e.mobileWallets)!=null&&t.length)),b.setIsCustomDesktop(!!((s=e.desktopWallets)!=null&&s.length)),m.setModalVersionInStorage(),Object.assign(B,e)}};var Ee=Object.defineProperty,se=Object.getOwnPropertySymbols,we=Object.prototype.hasOwnProperty,Oe=Object.prototype.propertyIsEnumerable,ne=(e,t,s)=>t in e?Ee(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Ce=(e,t)=>{for(var s in t||(t={}))we.call(t,s)&&ne(e,s,t[s]);if(se)for(var s of se(t))Oe.call(t,s)&&ne(e,s,t[s]);return e};const G="https://explorer-api.walletconnect.com",Q="wcm",X="js-2.7.0";async function K(e,t){const s=Ce({sdkType:Q,sdkVersion:X},t),n=new URL(e,G);return n.searchParams.append("projectId",R.state.projectId),Object.entries(s).forEach(([c,d])=>{d&&n.searchParams.append(c,String(d))}),(await fetch(n)).json()}const S={async getDesktopListings(e){return K("/w3m/v1/getDesktopListings",e)},async getMobileListings(e){return K("/w3m/v1/getMobileListings",e)},async getInjectedListings(e){return K("/w3m/v1/getInjectedListings",e)},async getAllListings(e){return K("/w3m/v1/getAllListings",e)},getWalletImageUrl(e){return`${G}/w3m/v1/getWalletImage/${e}?projectId=${R.state.projectId}&sdkType=${Q}&sdkVersion=${X}`},getAssetImageUrl(e){return`${G}/w3m/v1/getAssetImage/${e}?projectId=${R.state.projectId}&sdkType=${Q}&sdkVersion=${X}`}};var We=Object.defineProperty,oe=Object.getOwnPropertySymbols,Ae=Object.prototype.hasOwnProperty,Le=Object.prototype.propertyIsEnumerable,re=(e,t,s)=>t in e?We(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,Pe=(e,t)=>{for(var s in t||(t={}))Ae.call(t,s)&&re(e,s,t[s]);if(oe)for(var s of oe(t))Le.call(t,s)&&re(e,s,t[s]);return e};const ae=m.isMobile(),w=L({wallets:{listings:[],total:0,page:1},search:{listings:[],total:0,page:1},recomendedWallets:[]}),$e={state:w,async getRecomendedWallets(){const{explorerRecommendedWalletIds:e,explorerExcludedWalletIds:t}=R.state;if(e==="NONE"||t==="ALL"&&!e)return w.recomendedWallets;if(m.isArray(e)){const n={recommendedIds:e.join(",")},{listings:l}=await S.getAllListings(n),c=Object.values(l);c.sort((d,u)=>{const C=e.indexOf(d.id),o=e.indexOf(u.id);return C-o}),w.recomendedWallets=c}else{const{chains:s,isAuth:n}=b.state,l=s==null?void 0:s.join(","),c=m.isArray(t),d={page:1,sdks:n?"auth_v1":void 0,entries:m.RECOMMENDED_WALLET_AMOUNT,chains:l,version:2,excludedIds:c?t.join(","):void 0},{listings:u}=ae?await S.getMobileListings(d):await S.getDesktopListings(d);w.recomendedWallets=Object.values(u)}return w.recomendedWallets},async getWallets(e){const t=Pe({},e),{explorerRecommendedWalletIds:s,explorerExcludedWalletIds:n}=R.state,{recomendedWallets:l}=w;if(n==="ALL")return w.wallets;l.length?t.excludedIds=l.map(y=>y.id).join(","):m.isArray(s)&&(t.excludedIds=s.join(",")),m.isArray(n)&&(t.excludedIds=[t.excludedIds,n].filter(Boolean).join(",")),b.state.isAuth&&(t.sdks="auth_v1");const{page:c,search:d}=e,{listings:u,total:C}=ae?await S.getMobileListings(t):await S.getDesktopListings(t),o=Object.values(u),g=d?"search":"wallets";return w[g]={listings:[...w[g].listings,...o],total:C,page:c??1},{listings:o,total:C}},getWalletImageUrl(e){return S.getWalletImageUrl(e)},getAssetImageUrl(e){return S.getAssetImageUrl(e)},resetSearch(){w.search={listings:[],total:0,page:1}}},U=L({open:!1}),q={state:U,subscribe(e){return T(U,()=>e(U))},async open(e){return new Promise(t=>{const{isUiLoaded:s,isDataLoaded:n}=b.state;if(m.removeWalletConnectDeepLink(),b.setWalletConnectUri(e==null?void 0:e.uri),b.setChains(e==null?void 0:e.chains),de.reset("ConnectWallet"),s&&n)U.open=!0,t();else{const l=setInterval(()=>{const c=b.state;c.isUiLoaded&&c.isDataLoaded&&(clearInterval(l),U.open=!0,t())},200)}})},close(){U.open=!1}};var Se=Object.defineProperty,ie=Object.getOwnPropertySymbols,Me=Object.prototype.hasOwnProperty,Te=Object.prototype.propertyIsEnumerable,le=(e,t,s)=>t in e?Se(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,De=(e,t)=>{for(var s in t||(t={}))Me.call(t,s)&&le(e,s,t[s]);if(ie)for(var s of ie(t))Te.call(t,s)&&le(e,s,t[s]);return e};function je(){return typeof matchMedia<"u"&&matchMedia("(prefers-color-scheme: dark)").matches}const $=L({themeMode:je()?"dark":"light"}),ce={state:$,subscribe(e){return T($,()=>e($))},setThemeConfig(e){const{themeMode:t,themeVariables:s}=e;t&&($.themeMode=t),s&&($.themeVariables=De({},s))}},M=L({open:!1,message:"",variant:"success"}),ke={state:M,subscribe(e){return T(M,()=>e(M))},openToast(e,t){M.open=!0,M.message=e,M.variant=t},closeToast(){M.open=!1}};class Ue{constructor(t){this.openModal=q.open,this.closeModal=q.close,this.subscribeModal=q.subscribe,this.setTheme=ce.setThemeConfig,ce.setThemeConfig(t),R.setConfig(t),this.initUi()}async initUi(){if(typeof window<"u"){await pe(()=>import("./index-VIO7TVAO.js"),__vite__mapDeps([0,1,2]));const t=document.createElement("wcm-modal");document.body.insertAdjacentElement("beforeend",t),b.setIsUiLoaded(!0)}}}const Ve=Object.freeze(Object.defineProperty({__proto__:null,WalletConnectModal:Ue},Symbol.toStringTag,{value:"Module"}));export{m as C,$e as E,q as M,b as O,de as R,ce as T,ke as a,ye as b,R as c,Ve as i};
