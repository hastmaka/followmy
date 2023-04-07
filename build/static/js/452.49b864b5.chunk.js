"use strict";(self.webpackChunkporfolio=self.webpackChunkporfolio||[]).push([[452],{2067:function(e,t,n){n.d(t,{Z:function(){return j}});var i=n(3433),r=n(4165),o=n(5861),s=n(4942),a=n(1413),d=n(5987),c=n(5936),u=n(6795),l=n(2947),f=n(2007),p=n.n(f),x=function(e){for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];if(!["date","id","dollarsPerHour"].includes(t)&&(null===n||""===n||isNaN(n)))return{key:t,value:n}}return!0};x.prototype={obj:p().object.isRequired};var w=n(296),v=n(2791),h=(n(788),n(9211),n(3329)),b=n(6711),Z=n(68),g=n(1286),m=n(184),y=["user","rows","columns","rowModesModel","setRowModesModel"],A=["isNew"],R={borderRadius:"4px",border:"1px solid lightgrey"};function j(e){var t=e.user,n=e.rows,f=e.columns,p=e.rowModesModel,j=e.setRowModesModel,M=(0,d.Z)(e,y),C=(0,v.useCallback)((function(e){window.displayNotification({type:e.type,content:e.content}),console.log(e)}),[]),N=(0,v.useCallback)((function(e){j((0,a.Z)((0,a.Z)({},p),{},(0,s.Z)({},e,{mode:c.se.Edit})))}),[p]),k=(0,v.useCallback)((function(e){j((0,a.Z)((0,a.Z)({},p),{},(0,s.Z)({},e,{mode:c.se.View}))),M.setIsAddActive(!1)}),[p]),E=(0,v.useCallback)((function(e){j((0,a.Z)((0,a.Z)({},p),{},(0,s.Z)({},e,{mode:c.se.View,ignoreModifications:!0}))),n.find((function(t){return t.id===e})).isNew&&M.setRows((function(t){return t.filter((function(t){return t.id!==e}))})),M.setIsAddActive(!1)}),[p]),q=(0,v.useCallback)(function(){var e=(0,o.Z)((0,r.Z)().mark((function e(n,i){var o;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,t){var i=x(n);if(!0!==i)return t({type:"error",content:"".concat(i.key," can't be ").concat(i.value)});e()}));case 2:if(JSON.stringify(n)!==JSON.stringify(i)){e.next=7;break}return window.displayNotification({type:"warning",content:"Row not saved, cells are empty or no data was changed"}),e.abrupt("return",i);case 7:if(!n.isNew){e.next=14;break}return n.isNew,o=(0,d.Z)(n,A),window.dispatch(w.D.createNewRecordInUserTable({newR:(0,a.Z)({},o),collection:t.select})),window.displayNotification({type:"success",content:"Row saved successfully!!"}),e.abrupt("return",o);case 14:return window.dispatch(w.D.updateUserTable({newRow:n,collection:t.select})),window.displayNotification({type:"success",content:"Row edited successfully!!"}),e.abrupt("return",n);case 17:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),[]),D=(0,v.useMemo)((function(){return[].concat((0,i.Z)(f),[{field:"action",headerName:"Action",align:"center",type:"actions",sortable:!1,getActions:function(e){var t,n=(null===(t=p[e.id])||void 0===t?void 0:t.mode)===c.se.Edit;return n?[(0,m.jsx)(u.u,{icon:(0,m.jsx)(h.Z,{sx:{fill:"green"}}),label:"Save",onClick:function(t){M.setIsAddActive(!1),k(e.id)}}),(0,m.jsx)(u.u,{icon:(0,m.jsx)(b.Z,{sx:{fill:"red"}}),label:"Cancel",className:"textPrimary",onClick:function(t){M.setIsAddActive(!1),E(e.id)},color:"inherit"})]:[(0,m.jsx)(Z.Z,{title:"Edit",children:(0,m.jsx)(u.u,{icon:(0,m.jsx)(g.Z,{sx:{fill:"white"}}),label:"Edit",disabled:!0===n||M.isAddActive,onClick:function(t){M.setIsAddActive(!0),N(e.id)}})})]}}])}),[p,k,E,N,M.isAddActive]);return(0,m.jsx)(l._,(0,a.Z)({sx:R,rows:n,columns:D,getRowId:function(e){return e.id},pageSize:10,rowsPerPageOptions:[10,20],editMode:"row",onRowEditStart:function(e,t){return t.defaultMuiPrevented=!0},onRowEditStop:function(e,t){return t.defaultMuiPrevented=!0},experimentalFeatures:{newEditingApi:!0},onRowModesModelChange:function(e){return j(e)},rowModesModel:p,processRowUpdate:q,onProcessRowUpdateError:C},M))}j.prototype={user:p().object.isRequired,rows:p().array.isRequired,columns:p().array.isRequired,rowModesModel:p().object.isRequired,setRowModesModel:p().func.isRequired,rest:p().object}},788:function(e,t,n){n.d(t,{A:function(){return d}});var i=n(4415),r=n(926),o=n(2007),s=n.n(o),a=n(184),d=function(e){var t=e.id,n=e.value,o=e.options,s=e.api,d=e.daysAlreadyAdded,c=e.isNew;return(0,a.jsx)(i.Z,{fullWidth:!0,value:n,onChange:function(e){if(!d.length&&c)return s.setEditCellValue({id:t,field:"date",value:e.target.value});d.length>=1&&(d.includes(e.target.value)?window.displayNotification({type:"warning",content:"This day already exist"}):s.setEditCellValue({id:t,field:"date",value:e.target.value}))},renderValue:function(e){return e},children:o.map((function(e){return(0,a.jsx)(r.Z,{value:e,children:e},e)}))})};d.prototype={id:s().number.isRequired,value:s().string.isRequired,options:s().array.isRequired,api:s().object.isRequired}},140:function(e,t,n){n.d(t,{Z:function(){return C}});var i=n(4165),r=n(4942),o=n(1413),s=n(3433),a=n(5861),d=n(9439),c=n(2791),u=n(9434),l=n(2007),f=n.n(l),p=n(3767),x=n(68),w=n(3400),v=n(7630),h=n(2419),b=n(5936),Z=n(9211),g=n(4696),m=n(2804),y=n(4654),A=function(e){var t={};return e.forEach((function(e){switch(e.field){case"date":t[e.field]="";break;case"action":break;default:t[e.field]=0}})),t},R=function(e){return e.replace(/[.,_]/g," ").replace(/\w\S*/g,(function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()}))},j=n(184),M=(0,v.ZP)(p.Z)((function(e){var t=e.theme;return{height:"60px",border:"1px solid ".concat(t.palette.tableBorder),backgroundColor:t.palette.indigoDye,borderRadius:"4px 4px 0 0",flexDirection:"row",alignItems:"center",padding:"0 10px",justifyContent:"space-between"}}));function C(e){var t=e.setRows,n=e.isAddActive,l=e.setIsAddActive,f=e.setRowModesModel,v=e.user,C=e.columns,N=(0,u.v9)((function(e){return e.admin})).month,k=(0,c.useState)((0,g.getActualMonthAndYear)()),E=(0,d.Z)(k,2),q=E[0],D=E[1],I=function(){var e=(0,a.Z)((0,i.Z)().mark((function e(){var n;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:l(!0),n=(0,g.createId)(20),t((function(e){return[].concat((0,s.Z)(e),[(0,o.Z)((0,o.Z)({id:n},A(C)),{},{isNew:!0})])})),f((function(e){return(0,o.Z)((0,o.Z)({},e),{},(0,r.Z)({},n,{mode:b.se.Edit,fieldToFocus:"date"}))}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,j.jsxs)(M,{children:[(0,j.jsx)(Z.Z,{text:R(v.select),sx:{color:"white"}}),(0,j.jsxs)(p.Z,{direction:"row",gap:"10px",alignItems:"center",children:[(0,j.jsxs)(p.Z,{direction:"row",gap:"10px",alignItems:"center",children:[(0,j.jsx)(Z.Z,{text:"Select Month"}),(0,j.jsx)(m.Z,{disabled:n,option:(0,s.Z)(N),value:q,onChange:function(e){D(e.target.value),window.dispatch((0,y.getUserTableData)({uid:v.uid,collection:v.select,monthAndYear:e.target.value}))},from:"toolbar"})]}),(0,j.jsx)(x.Z,{title:"Add",placement:"bottom",children:(0,j.jsx)("span",{children:(0,j.jsx)(w.Z,{disabled:n,onClick:I,children:(0,j.jsx)(h.Z,{sx:function(e){var t=e.palette;return{fill:n?t.tableBorder:t.tableColor}}})})})})]})]})}C.prototype={setRows:f().func.isRequired,isAddActive:f().bool.isRequired,setIsAddActive:f().func.isRequired,setRowModesModel:f().func.isRequired,user:f().object.isRequired,columns:f().array.isRequired}},452:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var i=n(9439),r=n(9434),o=n(2791),s=n(3767),a=n(4554),d=n(7630),c=n(2067),u=n(4696),l=n(788),f=n(442),p=n(3833),x=n(9211),w=n(184);(0,d.ZP)(s.Z)((function(e){e.theme;return{}}));function v(){var e,t=(0,r.v9)((function(e){return e.admin})).user,n=(0,o.useState)({deposit:0,expenses:0}),a=(0,i.Z)(n,2),d=a[0],c=a[1];(0,o.useEffect)((function(){var e,n=null===t||void 0===t||null===(e=t.tableData)||void 0===e?void 0:e.data.reduce((function(e,t){var n=t.deposit,i=t.expenses;return e.deposit+=n,e.expenses+=i,e}),{deposit:0,expenses:0}),i=n.deposit,r=n.expenses;c({deposit:i,expenses:r})}),[t.tableData.data]);var u=d.deposit,l=d.expenses;return(0,w.jsxs)(f.L,{children:[(0,w.jsxs)(s.Z,{direction:"row",alignItems:"center",p:"0 0 0 20px",gap:"20px",children:[(0,w.jsx)(x.Z,{text:"Earn:\xa0$".concat(u.toFixed(2)),sx:{color:"#e9c46a"}}),(0,w.jsx)(x.Z,{text:"Expenses:\xa0$".concat(l.toFixed(2)),sx:{color:"#e63946"}}),(0,w.jsx)(x.Z,{text:"Total:\xa0$".concat((u-l).toFixed(2)),sx:{color:"#2a9d8f"}}),(0,w.jsx)(x.Z,{text:"Days:\xa0".concat(null===t||void 0===t||null===(e=t.tableData)||void 0===e?void 0:e.data.length),sx:{color:"#2a9d99"}})]}),(0,w.jsx)(p.x,{})]})}var h=n(7809),b=n(140),Z=(0,d.ZP)(s.Z)((function(e){e.theme;return{margin:"10px",height:"calc(100vh - 80px)"}}));function g(){var e=(0,r.v9)((function(e){return e.admin})).user,t=(0,o.useState)([]),n=(0,i.Z)(t,2),s=n[0],d=n[1],f=(0,o.useMemo)((function(){return(0,u.monthDays)(e.tableData.id)}),[e.tableData.id]),p=(0,o.useState)({}),x=(0,i.Z)(p,2),g=x[0],m=x[1],y=(0,o.useState)(!1),A=(0,i.Z)(y,2),R=A[0],j=A[1];(0,o.useEffect)((function(t){d(e.tableData.data)}),[e.tableData.id,e.tableData.data]);var M=[{field:"date",headerName:"date",type:"singleSelect",flex:1,minWidth:180,editable:!0,align:"center",headerAlign:"center",renderEditCell:function(t){return(0,w.jsx)(l.A,{daysAlreadyAdded:e.tableData.data.map((function(e){return e.date})),isNew:t.row.isNew,options:f,value:t.value,api:t.api,id:t.id})}},{field:"deposit",headerName:"deposit",type:"number",flex:1,editable:!0,align:"center",headerAlign:"center"},{field:"expenses",headerName:"expenses",type:"number",flex:1,editable:!0,align:"center",headerAlign:"center"}];return(0,w.jsx)(Z,{children:(0,w.jsx)(a.Z,{sx:{height:"100%",width:"100%"},children:(0,w.jsx)(c.Z,{user:e,rows:s,setRows:d,columns:M,daysToRender:f,setIsAddActive:j,isAddActive:R,setRowModesModel:m,rowModesModel:g,components:{Toolbar:b.Z,Footer:v},componentsProps:{toolbar:{setRows:d,isAddActive:R,setIsAddActive:j,setRowModesModel:m,user:e,columns:M}},sx:function(e){var t=e.palette;return(0,h.ui)(t)}})})})}}}]);
//# sourceMappingURL=452.49b864b5.chunk.js.map