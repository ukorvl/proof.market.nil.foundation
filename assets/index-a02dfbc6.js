import{o as T,j as e,T as i,Y as c,I as f,d as l,au as C,a3 as p,K as g,a6 as _,r as v,an as N,al as S,av as o,aw as u,ax as w,G as k,ai as b,ay as I,az as $,F as A,Z as F,$ as O,aA as R,_ as j,ao as x}from"./index-0d04c63d.js";const P=({chartType:t,onSelectChartType:a,disabled:n})=>{const s=T();return e(i,{tabs:!0,vertical:s==="sm",children:Object.values(c).map(r=>e(i.Item,{active:r===t,onClick:()=>a(r),disabled:n,children:r},r))})},V=({disabled:t,dataRange:a,setDataRange:n})=>e(i,{children:Object.values(f).map(s=>e(i.Item,{active:a===s,onClick:()=>n(s),disabled:t,children:s},s))}),E=({disabled:t,isFullscreen:a,setFullScreen:n,displayVolumes:s,setDisplayVolumes:r,children:d})=>l(i,{children:[d,e(i.Item,{disabled:t,active:s,onClick:()=>r(!s),children:e(C,{iconName:"fa-solid fa-chart-simple",srOnlyText:"Toggles volumes display",title:"Display volumes"})}),e(i.Item,{disabled:t,active:a,onClick:()=>n(!a),children:e(C,{iconName:`fa-solid fa-${a?"compress":"expand"}`,srOnlyText:"Toggles fullscreen view",title:"Fullscreen view"})})]}),G=()=>{const t=p(g),a=p(s=>s.statementsState.statementsStats.find(r=>r._key===(t==null?void 0:t._key)),_),n=v.useMemo(()=>{if(!t)return"";const{name:s}=t;return`${s.toUpperCase()} / ${N}`},[t]);return l(S,{className:o.panel,children:[l("div",{className:o.container,children:[t&&e("div",{className:o.name,children:n}),l("div",{children:[e("div",{className:`text-muted ${o.title}`,children:"Average cost"}),e("div",{children:u(a==null?void 0:a.avg_cost)})]}),l("div",{children:[e("div",{className:`text-muted ${o.title}`,children:"Average generation time"}),e("div",{children:u(a==null?void 0:a.avg_eval_time)})]}),l("div",{children:[e("div",{className:`text-muted ${o.title}`,children:"Completed"}),e("div",{children:u(a==null?void 0:a.completed,0)})]})]}),e(w,{})]})},M=()=>{const t=p(g),[a,n]=v.useState(c.proofCostChart),[s,r]=v.useState(!1),d=k(),[m,y]=b("statementDashboardDataRange",f.hour),[h,D]=b("statementDashboardDisplayVolumes",!1);return e(S,{children:l("div",{className:"statementDashboard",children:[e(P,{chartType:a,onSelectChartType:n,disabled:!t}),l(I,{showFullScreen:s,className:"fullScreenChartContainer",children:[s&&e(G,{}),l("div",{className:"statementDashboard__toolbar",children:[e(V,{disabled:!t,dataRange:m,setDataRange:y}),e(E,{disabled:!t,isFullscreen:s,setFullScreen:r,displayVolumes:h,setDisplayVolumes:D,children:e($,{disabled:!t,chartType:a,chartDataRange:m,displayVolumes:h})})]}),e(L,{chartType:a,dataRange:m,displayVolumes:h,height:s?d-283:454})]})]})})},L=({chartType:t,...a})=>{switch(t){case c.proofCostChart:return e(O,{...a});case c.proofGetTimeChart:return e(F,{...a});default:return e(A,{})}},U=R(()=>j(()=>import("./StatementsList-d21a6e4f.js"),["assets/StatementsList-d21a6e4f.js","assets/index-0d04c63d.js","assets/index-6f330458.css","assets/layers-manager-92d0e881.js","assets/StatementsList-3796812e.css"]),{fallback:e(x,{grow:!0})});export{M as S,U as a,G as b};
