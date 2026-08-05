import { test,assert,equal } from "./test-runner.js";
import { FEEDING_RANGES } from "../data/feeding-ranges.js";
import { babyFeedingEngine } from "../engines/baby-feeding-engine.js";
import { clasificarNivelAlerta } from "../engines/alerts-engine.js";
import { crearResultadoVacio,esResultadoValido } from "../utils/result-contract.js";
import { obtenerContenido } from "../content/content-provider.js";
import { entrada,contieneNumeroNoFinito } from "./fixtures.js";

test("rangos científicos cubren cada día una sola vez",()=>{for(let dia=0;dia<=365;dia+=1)equal(FEEDING_RANGES.filter((r)=>dia>=r.desdeDias&&dia<=r.hastaDias).length,1,`Cobertura del día ${dia}`);});
test("intervalos científicos mantienen mínimo menor que máximo",()=>assert(FEEDING_RANGES.every((r)=>{const x=r.diario??r.mlKgDia??r.porToma;return x.minimo<x.maximo;})));
test("contrato rechaza estructuras internas incompletas",()=>assert(!esResultadoValido({...crearResultadoVacio(),interpretacion:{}})));
test("contrato normaliza estructuras internas parciales",()=>assert(Array.isArray(crearResultadoVacio({interpretacion:{estado:"x"}}).interpretacion.clavesExplicacion)));
test("cinco niveles de alerta son alcanzables",()=>equal(new Set([clasificarNivelAlerta({}),clasificarNivelAlerta({orientacion:true}),clasificarNivelAlerta({consultar:true}),clasificarNivelAlerta({valoracionPrioritaria:true}),clasificarNivelAlerta({urgente:true})]).size,5));
test("todas las ramas de interpretación tienen contenido",()=>{for(const alimentacion of ["formula","materna","mixta","extraida"]){const r=babyFeedingEngine(entrada({alimentacion}));assert(obtenerContenido().introducciones[r.interpretacion.claveContenido]);}});
test("prematuridad conserva contrato sin cantidades",()=>{const r=babyFeedingEngine(entrada({nacimiento:"prematuro"}));assert(esResultadoValido(r));equal(r.rangoDiario,null);});
test("límites de edad no producen números no finitos",()=>{for(const edad of [0,1,6,7,29,30,89,90,179,180,209,210,299,300,364,365]){const r=babyFeedingEngine(entrada({edad,unidadEdad:"dias"}));assert(!contieneNumeroNoFinito(r));assert(esResultadoValido(r));}});
test("doce meses seleccionan la etapa final",()=>equal(babyFeedingEngine(entrada({edad:12,unidadEdad:"meses"})).timeline.etapa,"doce_meses"));
