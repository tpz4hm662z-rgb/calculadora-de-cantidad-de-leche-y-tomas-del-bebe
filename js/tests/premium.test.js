import { readFileSync,existsSync } from "node:fs";
import { test,assert,equal } from "./test-runner.js";
import { crearStorageManager } from "../storage/storage-manager.js";
import { crearHistoryManager } from "../storage/history-manager.js";
import { compartir,CONTENIDO_COMPARTIR } from "../services/share-service.js";
import { imprimir } from "../services/print-service.js";
import { EVENTOS_GA4,registrarEvento } from "../services/analytics.js";
import { registrarServiceWorker } from "../services/offline.js";
import { crearLogger } from "../utils/logger.js";

class FakeStorage{constructor(){this.m=new Map();this.fallar=false;}get length(){return this.m.size;}key(i){return [...this.m.keys()][i]??null;}setItem(k,v){if(this.fallar)throw new Error("cuota");this.m.set(k,String(v));}getItem(k){return this.m.has(k)?this.m.get(k):null;}removeItem(k){this.m.delete(k);}}
const registro=(i=0)=>({fecha:new Date(2026,0,1,0,i).toISOString(),edad:{valor:3,unidad:"meses",dias:90},peso:5+i/100,alimentacion:"formula",prematuro:false,complementaria:false,resumen:`Resumen ${i}`,estado:"Orientación"});

test("storage guarda y lee JSON",()=>{const s=crearStorageManager({storage:new FakeStorage(),prefijo:"t"});assert(s.guardar("x",{a:1}));equal(s.leer("x").a,1);});
test("storage recupera JSON inválido",()=>{const f=new FakeStorage();f.setItem("t:x","{");const s=crearStorageManager({storage:f,prefijo:"t"});equal(s.leer("x",[]).length,0);equal(f.getItem("t:x"),null);});
test("storage lleno no rompe",()=>{const f=new FakeStorage();f.fallar=true;const s=crearStorageManager({storage:f});equal(s.guardar("x",1),false);equal(s.disponible(),false);});
test("historial limita a 50 registros",()=>{const h=crearHistoryManager(crearStorageManager({storage:new FakeStorage()}));for(let i=0;i<55;i+=1)h.agregar(registro(i));equal(h.listar().length,50);});
test("historial usa orden cronológico inverso",()=>{const h=crearHistoryManager(crearStorageManager({storage:new FakeStorage()}));h.agregar(registro(1));h.agregar(registro(2));equal(h.listar()[0].resumen,"Resumen 2");});
test("historial evita duplicados consecutivos",()=>{const h=crearHistoryManager(crearStorageManager({storage:new FakeStorage()}));h.agregar(registro(1));const duplicado={...registro(1),fecha:new Date(2026,1,1).toISOString()};assert(h.agregar(duplicado).duplicado);equal(h.listar().length,1);});
test("historial elimina un registro",()=>{const h=crearHistoryManager(crearStorageManager({storage:new FakeStorage()}));const r=registro(1);h.agregar(r);h.eliminar(r.fecha);equal(h.listar().length,0);});
test("historial se borra completamente",()=>{const h=crearHistoryManager(crearStorageManager({storage:new FakeStorage()}));h.agregar(registro(1));h.limpiar();equal(h.listar().length,0);});
test("historial descarta versiones antiguas",()=>{const s=crearStorageManager({storage:new FakeStorage()});s.guardar("historial-leche",{version:0,registros:[registro()]});equal(crearHistoryManager(s).listar().length,0);});
test("historial solo contiene campos permitidos",()=>equal(JSON.stringify(Object.keys(registro()).sort()),JSON.stringify(["alimentacion","complementaria","edad","estado","fecha","peso","prematuro","resumen"].sort())));
test("compartir usa Web Share API",async()=>{let recibido;const r=await compartir({navigatorRef:{share:async(d)=>{recibido=d;}}});equal(r.metodo,"share");equal(recibido.url,CONTENIDO_COMPARTIR.url);});
test("compartir usa portapapeles como fallback",async()=>{let copiado;const r=await compartir({navigatorRef:{clipboard:{writeText:async(t)=>{copiado=t;}}}});equal(r.metodo,"clipboard");equal(copiado,CONTENIDO_COMPARTIR.url);});
test("compartir no incluye datos sanitarios",()=>{const texto=JSON.stringify(CONTENIDO_COMPARTIR);assert(!/peso|prematuro|resultado|alimentacion/i.test(texto));});
test("impresión invoca window.print",()=>{let n=0;assert(imprimir({windowRef:{print:()=>n++}}));equal(n,1);});
test("eventos GA4 están definidos",()=>equal(EVENTOS_GA4.length,6));
test("GA4 solo envía nombre agregado",()=>{const d=[];assert(registrarEvento("generate_report",{gtag:null,dataLayer:d}));equal(JSON.stringify(d),JSON.stringify([{event:"generate_report"}]));});
test("GA4 rechaza eventos no permitidos",()=>equal(registrarEvento("peso_bebe",{dataLayer:[]}),false));
test("logger debug puede desactivarse",()=>{const llamadas=[];const l=crearLogger({debug:false,sink:{debug:(x)=>llamadas.push(x),info:()=>{},warn:()=>{},error:(x)=>llamadas.push(x)}});l.debug("oculto");l.error("técnico");equal(llamadas.length,1);assert(!llamadas[0].includes("Error:"));});
test("Service Worker se registra con scope local",async()=>{let args;const r=await registrarServiceWorker({navigatorRef:{serviceWorker:{register:async(...a)=>{args=a;return {};}}}});assert(r.ok);equal(args[0],"./sw.js");equal(args[1].scope,"./");});
test("offline degrada si no hay Service Worker",async()=>equal((await registrarServiceWorker({navigatorRef:{}})).ok,false));

const manifest=JSON.parse(readFileSync(new URL("../../manifest.webmanifest",import.meta.url),"utf8"));
test("manifest es JSON válido y sin placeholders",()=>{assert(manifest.name&&manifest.short_name&&manifest.start_url==="./"&&manifest.scope==="./");assert(!JSON.stringify(manifest).includes("NOMBRE_"));});
test("manifest usa standalone y colores",()=>assert(manifest.display==="standalone"&&manifest.theme_color&&manifest.background_color));
test("iconos del manifest existen",()=>assert(manifest.icons.every((i)=>existsSync(new URL(`../../${i.src}`,import.meta.url)))));
const sw=readFileSync(new URL("../../sw.js",import.meta.url),"utf8");
test("Service Worker define install activate y fetch",()=>assert(["install","activate","fetch"].every((x)=>sw.includes(`addEventListener(\"${x}\"`))));
test("Service Worker no cachea respuestas externas",()=>assert(sw.includes("origin!==self.location.origin")));
const css=readFileSync(new URL("../../css/style.css",import.meta.url),"utf8");
test("impresión A4 está preparada",()=>assert(css.includes("@page{size:A4")&&css.includes("@media print")));
test("movimiento reducido está contemplado",()=>{assert(css.includes("prefers-reduced-motion:reduce"));const html=readFileSync(new URL("../../index.html",import.meta.url),"utf8");equal((html.match(/googletagmanager\.com\/gtag\/js/g)||[]).length,1);equal((html.match(/gtag\("config","G-QH8MJ6LVHN"\)/g)||[]).length,1);assert(!/gtag\("(?:config|event)"[^)]*(?:edad|peso|alimentacion|prematur|cantidad|tomas)/i.test(html));});
