/** DOM mínimo para probar renderizadores con JavaScript estándar fuera del navegador. */
class FakeClassList {
  constructor(){ this.valores=new Set(); }
  toggle(clase,forzar){ if(forzar===false)this.valores.delete(clase);else if(forzar===true)this.valores.add(clase);else this.valores.has(clase)?this.valores.delete(clase):this.valores.add(clase); }
}
export class FakeNode {
  constructor(tag="node",texto=""){this.tagName=tag;this.textContent=texto;this.children=[];this.hidden=false;this.attributes={};this.className="";this.classList=new FakeClassList();}
  append(...nodos){this.children.push(...nodos);}
  replaceChildren(...nodos){this.children=[...nodos];this.textContent="";}
  setAttribute(nombre,valor){this.attributes[nombre]=String(valor);}
}
export function instalarFakeDom(){globalThis.document={createElement:(tag)=>new FakeNode(tag),createTextNode:(texto)=>new FakeNode("#text",texto),createDocumentFragment:()=>new FakeNode("#fragment")};}
export function crearDestinos(){return {principal:new FakeNode("article"),diario:new FakeNode("article"),porToma:new FakeNode("article"),patron:new FakeNode("article"),interpretacion:new FakeNode("article"),senales:new FakeNode("article"),alertas:new FakeNode("article"),timeline:new FakeNode("section")};}
