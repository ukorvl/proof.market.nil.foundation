import{a3 as l,a4 as v,a5 as M,a6 as g,a7 as U,a8 as q,a9 as w,r as m,aa as y,j as e,ab as E,c as A,ac as x,ad as L,ae as R,af as j,d as n,F as k,ag as h,ah as b,ai as I,aj as V,ak as F,al as B,am as T,an as $,ao as f,T as C,ap as N,aq as H,ar as K,as as Q,Q as z,W as G,V as W,X as D,i as X,L as Y,at as _}from"./index-0d04c63d.js";import{a as J,b as Z,S as ee}from"./index-a02dfbc6.js";const se={"0.001":"0.001","0.01":"0.01","0.1":"0.1",1:"1"},re=()=>{const s=l(u=>u.userOrdersState.isLoading),t=v(M,g),r=v(U,g),a=v(q,g),o=v(w,g),c=l(u=>u.userOrdersState.isError),d=m.useMemo(()=>{const u=a.map(p=>S(p,y.sell)),P=t.map(p=>S(p,y.buy));return[...u,...P]},[a,t]),i=m.useMemo(()=>{const u=o.map(p=>S(p,y.sell)),P=r.map(p=>S(p,y.buy));return[...u,...P]},[o,r]);return{loadingData:s,isError:c,activeOrdersData:d,historyOrdersData:i}},S=({createdOn:s,matched_time:t,cost:r,eval_time:a,_key:o,status:c},d)=>({init_time:s,timestamp:t,cost:r,eval_time:a,type:d,orderId:o,status:c}),ae=({children:s})=>{const[t,r]=m.useState(!1),[a,o]=m.useState();return e(E.Provider,{value:{processing:t,setProcessing:r,selectedValues:a,setSelectedValues:o},children:s})},te=({disabled:s})=>{const t=A(),{displayUserOrders:r,setDisplayUserOrders:a}=m.useContext(x),{isReadonly:o}=L(),c=l(R),d=m.useCallback(i=>{t(j(i))},[t]);return n(k,{children:[n("div",{className:h.checkboxContainer,children:[e("input",{id:"toggleDisplayUserOrders",type:"checkbox",className:h.checkbox,checked:r,onChange:()=>a(!r),disabled:o}),e("label",{className:h.label,htmlFor:"toggleDisplayUserOrders",children:"Show my orders"})]}),n(b,{children:[e(b.Button,{className:h.changePriceStepButton,disabled:s,children:c}),e(b.Menu,{align:"right",children:Object.keys(se).sort().map(i=>e(b.Item,{onSelect:()=>d(i),active:i===c,children:e("span",{children:i})},i))})]})]})},oe=()=>{const[s,t]=I("displayUserOrdersInOrderbook",!0),r=l(V,g),a=l(F,g),o=l(d=>d.orderBookState.isLoading),c=l(d=>d.orderBookState.hasApiError);return e(B,{children:n(x.Provider,{value:{displayUserOrders:s,setDisplayUserOrders:t},children:[n("div",{className:h.header,children:[e("h4",{children:"Order book"}),e(te,{disabled:o})]}),e("div",{className:h.orderBook,children:ne({data:r,isLoading:o,isError:c,lastOrderData:a})})]})})},ne=({data:s,isLoading:t,isError:r,lastOrderData:a})=>{const{proposals:o,requests:c}=s;switch(!0){case(t&&!o.length&&!c.length):return e(f,{grow:!0});case r:return e("h5",{children:"Error while loading data."});case(!!o.length||!!c.length):return n(k,{children:[e(T,{type:"requests",data:c}),e("div",{className:h.lastDeal,children:a&&n(k,{children:[e("div",{className:h.lastDealTitle,children:"Last deal:"}),a.cost&&e("div",{className:`${a.type}TextColor`,children:`${a.cost.toFixed(4)} ${$}`})]})}),e(T,{type:"proposals",data:o})]});default:return e("h5",{children:"No orders."})}};var O=(s=>(s.active="ACTIVE",s.history="HISTORY",s))(O||{});const ce=({currentTab:s,onSetTab:t})=>e(C,{justified:!0,className:N.nav,children:Object.values(O).map(r=>e(C.Item,{onClick:()=>t(r),active:r===s,children:r},r))}),de=()=>{const[s,t]=m.useState(O.active),r=l(i=>i.statementsState.selectedKey),{isError:a,loadingData:o,activeOrdersData:c,historyOrdersData:d}=re();return n(B,{children:[e("h4",{children:"Manage orders"}),e("div",{className:N.manageOrdersPanel,"data-sb":"manageOrdersPanel",children:n(H,{overlayTitle:"Authorization is required to manage orders",children:[e(ce,{currentTab:s,onSetTab:t}),r!==void 0?ie(s,a,o,s===O.active?c:d):e("h5",{children:"Please, select statement to display orders."})]})})]})},ie=(s,t,r,a)=>{if(t)return e("h5",{children:"Error while loading data."});if(a.length===0)return r?e(f,{grow:!0}):e("h5",{children:"No orders."});switch(s){case O.active:return e(Q,{data:a});case O.history:return e(K,{data:a});default:return e(k,{})}},ue=()=>n(z,{as:"main",fluid:!0,"data-sb":"mainView",children:[e(G,{children:e("title",{children:"Market"})}),n(W,{children:[n(D,{xs:12,md:3,children:[e(J,{}),e(X,{}),e(Y,{})]}),n(ae,{children:[n(D,{xs:12,md:6,children:[e(Z,{}),e(ee,{}),e(oe,{})]}),n(D,{xs:12,md:3,children:[e(_,{}),e(de,{})]})]})]})]});export{ue as default};
