(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{150:function(e,t,n){e.exports=n(181)},181:function(e,t,n){"use strict";n.r(t);var r=n(188),a=n(0),o=n.n(a),s=n(6),i=n(4),c=n(15),u=n.n(c),l=n(5),d=n.n(l),f=n(91),b=n(14),p=n(24),h=n(149),j=n(187),m=n(37),x=n.n(m),O=n(90),w=n(44),g=n(10),v=n(7),y=n.n(v),B=n(34),R=s.a.create({inputField:{color:"#fff",height:40,flex:1,fontSize:16},inputContainer:{borderColor:"#fff",backgroundColor:"#5CB3EA",borderWidth:1,borderRadius:12,padding:10,height:40,maxWidth:400,marginBottom:20,marginTop:5},subHeading:{color:"#fff",fontSize:15,fontWeight:"400"},title:{color:"#fff",fontSize:30,fontWeight:"600",marginTop:10,marginBottom:10},delete:{marginLeft:10},itemContainer:{backgroundColor:"#5CB3EA",borderRadius:12,flexDirection:"row",justifyContent:"space-between",alignItems:"center",flex:1,paddingHorizontal:10,paddingVertical:5,minHeight:35},item:{color:"#fff",width:"90%",fontSize:16},listContainer:{flexDirection:"row",flex:1,backgroundColor:"#1298ED",marginTop:10,maxWidth:350}}),S=n(3),I=function(e){var t=e.onAddItem,n=e.placeholder,r=Object(a.useState)(""),o=u()(r,2),s=o[0],c=o[1],l=Object(a.useRef)(),d=function(e){t(e),c("")};return Object(S.jsxs)(i.a,{style:L.container,children:[Object(S.jsx)(B.a,{style:R.inputField,value:s,onChangeText:function(e){return c(e)},placeholder:n||"new item",placeholderTextColor:"#fff",ref:l,returnKeyType:"done",onSubmitEditing:function(){d(s),l.current.focus()},blurOnSubmit:!1}),Object(S.jsx)(p.a,{onPress:function(){return d(s)},children:Object(S.jsx)(i.a,{style:L.button,children:Object(S.jsx)(j.a,{name:"keyboard-arrow-up",size:18,color:"black"})})})]})};I.propTypes={placeholder:y.a.string,onAddItem:y.a.func.isRequired};var C=I,L=s.a.create({container:{borderColor:"#fff",backgroundColor:"#5CB3EA",borderWidth:1,marginTop:20,borderRadius:12,flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:10,maxWidth:400},button:{height:20,width:20,borderRadius:5,backgroundColor:"#fff",alignItems:"center",justifyContent:"center"}}),P=function(e){var t=e.item,n=e.onSwitchItemStatus,r=e.onDeleteItem,a=e.showLowOnly;return(!a||a&&t.isLow)&&Object(S.jsxs)(i.a,{style:R.listContainer,children:[Object(S.jsx)(i.a,{style:q.indexContainer,children:Object(S.jsxs)(p.a,{onPress:n,children:[t.isLow&&Object(S.jsx)(j.a,{name:"warning",size:20,color:"white"}),!t.isLow&&Object(S.jsx)(j.a,{name:"check",size:20,color:"white"})]})}),Object(S.jsxs)(i.a,{style:R.itemContainer,children:[Object(S.jsx)(b.a,{style:R.item,children:t.name}),Object(S.jsx)(p.a,{onPress:r,children:Object(S.jsx)(j.a,{style:R.delete,name:"delete",size:20,color:"white"})})]})]})},k=P;P.propTypes={item:y.a.object.isRequired,onSwitchItemStatus:y.a.func.isRequired,onDeleteItem:y.a.func.isRequired,showLowOnly:y.a.bool};var q=s.a.create({indexContainer:{backgroundColor:"#5CB3EA",borderRadius:12,marginRight:10,alignItems:"center",justifyContent:"center",width:35,height:35}}),T=function(e){var t=e.name,n=e.items,r=e.showLowOnly,o=e.onRenameList,s=e.onAddItem,c=e.onDeleteList,l=e.onDeleteItem,d=e.onSwitchItemStatus,f=e.onMoveListDown,h=e.onMoveListUp,m=Object(a.useState)(t),x=u()(m,2),O=x[0],w=x[1],g=Object(a.useState)(!1),v=u()(g,2),y=v[0],I=v[1];return 0==n.filter((function(e){return!r||r&&e.isLow})).length&&r?null:Object(S.jsxs)(i.a,{style:E.container,children:[Object(S.jsxs)(i.a,{style:E.titleContainer,children:[!y&&Object(S.jsxs)(i.a,{style:E.titleContainer,children:[Object(S.jsx)(p.a,{style:{visibility:r?"hidden":"visible"},onPress:h,testID:"move-up",children:Object(S.jsx)(j.a,{name:"arrow-upward",size:24,color:"#5CB3EA"})}),Object(S.jsx)(p.a,{style:{visibility:r?"hidden":"visible"},onPress:f,children:Object(S.jsx)(j.a,{name:"arrow-downward",size:24,color:"#5CB3EA"})}),Object(S.jsx)(p.a,{testID:"list-name",style:{marginLeft:10},onPress:function(){return I(!0)},children:Object(S.jsx)(b.a,{style:E.heading,children:t})})]}),y&&Object(S.jsx)(B.a,{style:R.inputField,value:O,autoFocus:!0,onChangeText:function(e){return w(e)},placeholder:"list name",placeholderTextColor:"#fff",returnKeyType:"done",testID:"list-name-input"}),!r&&!y&&Object(S.jsx)(p.a,{onPress:c,children:Object(S.jsx)(j.a,{style:R.delete,name:"delete",size:20,color:"white"})}),y&&Object(S.jsx)(p.a,{onPress:function(){return function(e){I(!1),e!==t&&o(e)}(O)},style:{paddingLeft:10},children:Object(S.jsx)(b.a,{style:R.subHeading,children:"done"})})]}),n.map((function(e,t){return Object(S.jsx)(i.a,{children:Object(S.jsx)(k,{index:t,item:e,showLowOnly:r,onDeleteItem:function(){return l(t)},onSwitchItemStatus:function(){return d(t)}})},t)})),!r&&Object(S.jsx)(C,{onAddItem:s})]})},D=T;T.propTypes={name:y.a.string.isRequired,items:y.a.array.isRequired,showLowOnly:y.a.bool.isRequired,onDeleteList:y.a.func.isRequired,onAddItem:y.a.func.isRequired,onDeleteItem:y.a.func.isRequired,onRenameList:y.a.func.isRequired,onMoveListDown:y.a.func.isRequired,onMoveListUp:y.a.func.isRequired,onSwitchItemStatus:y.a.func.isRequired};var E=s.a.create({container:{flex:1,margin:15,maxWidth:350},titleContainer:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},heading:{color:"#fff",fontSize:20,fontWeight:"500"}}),A=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return{name:e,isLow:t}},z=function(e){var t=e.lists,n=e.showLowOnly,r=e.onSwitchLowOnly,a=e.onUpdateLists,o=function(){return"web"!=g.a.OS&&w.a.dismiss()},s=function(e){if(0===e){var n=x()(t).slice(1,t.length).concat(t[0]);a(n)}else{var r=x()(t).slice(0,e-1).concat(t[e]).concat(x()(t)[e-1]).concat(t.slice(e+1,t.length));a(r)}};return Object(S.jsxs)(i.a,{style:{paddingBottom:150},children:[Object(S.jsx)(i.a,{children:Object(S.jsx)(b.a,{style:R.subHeading,children:"show only low stock items"})}),Object(S.jsx)(O.a,{style:H.switch,onValueChange:r,value:n}),t.map((function(e,r){var c=e.name,u=e.items;return Object(S.jsx)(i.a,{children:Object(S.jsx)(D,{index:r,name:c,items:u,showLowOnly:n,onDeleteList:function(){return function(e){var n=t.filter((function(t,n){return n!=e}));a(n)}(r)},onAddItem:function(e){return function(e,n){if(""!=n){var r=x()(t);r[e].items=[].concat(x()(r[e].items),[A(n)]),o(),a(r)}}(r,e)},onDeleteItem:function(e){return function(e,n){var r=x()(t);r[e].items=r[e].items.filter((function(e,t){return t!=n})),a(r)}(r,e)},onSwitchItemStatus:function(e){return function(e,n){var r=x()(t);r[e].items[n].isLow=!r[e].items[n].isLow,a(r)}(r,e)},onRenameList:function(e){return function(e,n){var r=x()(t);r[e].name=n,a(r)}(r,e)},onMoveListUp:function(){return s(r)},onMoveListDown:function(){return function(e){if(e===t.length-1){var n=t.slice(t.length-1,t.length).concat(t.slice(0,t.length-1));a(n)}else s(e+1)}(r)}})},r)})),!n&&Object(S.jsx)(C,{onAddItem:function(e){return function(e){if(""!=e){var n=x()(t);n.push(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return{name:e,items:t}}(e)),o(),a(n)}}(e)},placeholder:"new list"})]})};z.propTypes={lists:y.a.array.isRequired,showLowOnly:y.a.bool.isRequired,onSwitchLowOnly:y.a.func.isRequired,onUpdateLists:y.a.func.isRequired};var H=s.a.create({switch:{margin:10}}),N=z,W=o.a.createContext(),M=function(){return o.a.useContext(W)},F=function(e){var t=e.id,n=Object(a.useState)(null),r=u()(n,2),o=r[0],s=r[1],c=M(),l=c.loadBoardName,d=c.setBoardIdCtx;return Object(a.useEffect)((function(){l(t,s,(function(e){return console.log(e)}))}),[]),o&&Object(S.jsx)(i.a,{style:R.listContainer,children:Object(S.jsx)(i.a,{style:R.itemContainer,children:Object(S.jsx)(b.a,{style:R.item,onPress:function(){return d(t)},children:o})})})};F.propTypes={id:y.a.string.isRequired};var U=F,V=function(e){var t=e.onPress,n=e.text,r=e.disabled;return Object(S.jsx)(p.a,{onPress:t,disabled:r,children:Object(S.jsx)(i.a,{style:J.indexContainer,children:Object(S.jsx)(b.a,{style:J.text,children:n})})})};V.propTypes={onPress:y.a.func.isRequired,text:y.a.string.isRequired,disabled:y.a.bool};var J=s.a.create({indexContainer:{backgroundColor:"#fff",borderRadius:12,alignItems:"center",justifyContent:"center",padding:8,paddingRight:10,paddingLeft:10,margin:5},text:{color:"#1298ED",fontSize:18,fontWeight:"400"}}),K=V,G=function(e){var t=e.onComplete,n=e.buttonText,r=e.initialValue,o=e.placeholder,s=Object(a.useState)(r||""),c=u()(s,2),l=c[0],d=c[1];return Object(S.jsxs)(i.a,{children:[Object(S.jsx)(i.a,{style:R.inputContainer,children:Object(S.jsx)(B.a,{style:R.inputField,value:l,onChangeText:function(e){return d(e)},placeholder:o||"",placeholderTextColor:"#fff",returnKeyType:"done"})}),Object(S.jsx)(K,{onPress:function(){return t(l)},text:n,disabled:""===l})]})};G.propTypes={initialValue:y.a.string,placeholder:y.a.string,onComplete:y.a.func.isRequired,buttonText:y.a.string.isRequired};var X=G,Q=function(e){var t=e.createBoard,n=M().boardIds;return Object(S.jsxs)(i.a,{children:[Object(S.jsx)(X,{onComplete:t,buttonText:"create new board",placeholder:"new board"}),n&&Object(S.jsxs)(i.a,{style:{marginTop:30},children:[Object(S.jsx)(b.a,{style:R.title,children:"select from my boards"}),n.map((function(e,t){return Object(S.jsx)(U,{id:e},t)}))]})]})};Q.propTypes={createBoard:y.a.func.isRequired};var Z=Q,_=function(e){var t=e.showMenu,n=e.showLogout,r=e.showBoardButtons,a=e.logout,o=e.switchBoard,s=e.showRenameBoard,c=e.toggleRenameBoard,u=e.deleteBoard,l=e.toggleShareBoard,d=e.showShareBoard;return t&&Object(S.jsxs)(i.a,{children:[n&&Object(S.jsx)(K,{onPress:a,text:"log out"}),r&&Object(S.jsxs)(i.a,{children:[Object(S.jsx)(K,{onPress:o,text:"switch board"}),Object(S.jsx)(K,{onPress:u,text:"delete board"}),Object(S.jsx)(K,{onPress:c,text:s?"done renaming":"rename board"}),Object(S.jsx)(K,{onPress:l,text:d?"done sharing":"share board"})]})]})};_.propTypes={showMenu:y.a.bool.isRequired,showLogout:y.a.bool.isRequired,showBoardButtons:y.a.bool.isRequired,logout:y.a.func.isRequired,switchBoard:y.a.func.isRequired,showRenameBoard:y.a.bool.isRequired,toggleRenameBoard:y.a.func.isRequired,deleteBoard:y.a.func.isRequired,toggleShareBoard:y.a.func.isRequired,showShareBoard:y.a.bool.isRequired};var Y=_,$=function(e){var t=e.user,n=e.boardId,r=e.boardName,o=e.lists,s=e.loadBoard,c=e.loadHome,l=e.loadBoards,m=e.emailSignInLink,x=e.renameBoard,O=e.createBoard,w=e.resetBoard,g=e.shareBoard,v=e.updateLists,y=e.deleteBoard,B=e.logout,I=Object(a.useRef)(),C=Object(a.useState)(""),L=u()(C,2),P=L[0],k=L[1],q=Object(a.useState)(!1),T=u()(q,2),D=T[0],E=T[1],A=Object(a.useState)(!1),z=u()(A,2),H=z[0],W=z[1],M=Object(a.useState)(!1),F=u()(M,2),U=F[0],V=F[1],J=Object(a.useState)(!1),K=u()(J,2),G=K[0],Q=K[1],_=Object(a.useState)(!1),$=u()(_,2),te=$[0],ne=$[1];Object(a.useEffect)((function(){c(ae,oe)}),[]),Object(a.useEffect)((function(){t&&l()}),[t]),Object(a.useEffect)((function(){n&&(oe(),V(!1),s(ae))}),[n]);var re=function(){return d.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:w(),k(""),E(!1),W(!1),Q(!1),V(!1),ne(!1);case 7:case"end":return e.stop()}}),null,null,null,Promise)},ae=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"something went wrong";console.log(e),W(!1),k(t)},oe=function(){k(""),W(!1)};return Object(S.jsxs)(i.a,{style:ee.container,keyboardDismissMode:"interactive",children:[Object(S.jsxs)(i.a,{style:ee.topBar,children:[Object(S.jsxs)(i.a,{children:[t&&Object(S.jsx)((function(){return Object(S.jsx)(p.a,{onPress:function(){return V(!U)},children:Object(S.jsx)(j.a,{name:"menu",size:40,color:"white",style:{marginBottom:U?20:0}})})}),{}),Object(S.jsx)(Y,{showMenu:U,showLogout:null!==t,showBoardButtons:null!==n,logout:function(){return d.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:W(!0),B(re,ae);case 2:case"end":return e.stop()}}),null,null,null,Promise)},switchBoard:re,toggleRenameBoard:function(){return d.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:ne(!te),Q(!1),k("");case 3:case"end":return e.stop()}}),null,null,null,Promise)},showRenameBoard:te,deleteBoard:function(){return d.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",y(re,ae));case 1:case"end":return e.stop()}}),null,null,null,Promise)},toggleShareBoard:function(){Q(!G),ne(!1),k("")},showShareBoard:G})]}),Object(S.jsx)(b.a,{style:R.title,children:r||"mickey's shopping list"})]}),Object(S.jsx)((function(){return""!==P&&Object(S.jsx)(i.a,{style:ee.error,children:Object(S.jsx)(b.a,{style:R.subHeading,children:P})})}),{}),H&&Object(S.jsx)(f.a,{animating:H}),Object(S.jsxs)(h.a,{ref:I,showsVerticalScrollIndicator:!1,extraHeight:150,keyboardShouldPersistTaps:"handled",children:[o&&!G&&!te&&Object(S.jsx)(N,{lists:o,showLowOnly:D,onSwitchLowOnly:function(){return E(!D)},onUpdateLists:function(e){return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.awrap(v(e));case 2:I.current.update();case 3:case"end":return t.stop()}}),null,null,null,Promise)}}),!H&&t&&!n&&Object(S.jsx)(Z,{createBoard:function(e){return O(e,ae)}})]}),!H&&!t&&Object(S.jsx)(X,{onComplete:function(e){m(e,(function(){return k("email sent")}),ae)},buttonText:"sign in with email",initialValue:"mickeydbarcia@gmail.com",placeholder:"mickey@mickey.com"}),G&&Object(S.jsx)(X,{onComplete:function(e){return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:g(e,(function(){return k("user added")}),ae);case 1:case"end":return t.stop()}}),null,null,null,Promise)},buttonText:"add email to board",placeholder:"mickey@mickey.com"}),te&&Object(S.jsx)(X,{onComplete:function(e,t){return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",x(e,t));case 1:case"end":return n.stop()}}),null,null,null,Promise)},buttonText:"rename board",initialValue:r})]})},ee=s.a.create({container:{padding:20,paddingTop:50,maxWidth:400},error:{marginBottom:10}});$.propTypes={user:y.a.object,boardId:y.a.string,boardName:y.a.string,lists:y.a.array,loadBoard:y.a.func.isRequired,loadHome:y.a.func.isRequired,loadBoards:y.a.func.isRequired,emailSignInLink:y.a.func.isRequired,renameBoard:y.a.func.isRequired,createBoard:y.a.func.isRequired,resetBoard:y.a.func.isRequired,shareBoard:y.a.func.isRequired,updateLists:y.a.func.isRequired,deleteBoard:y.a.func.isRequired,logout:y.a.func.isRequired};var te=$,ne=function(){var e=M(),t=e.user,n=e.boardId,r=e.boardName,a=e.lists,o=e.loadBoard,s=e.loadHome,i=e.loadBoards,c=e.emailSignInLink,u=e.renameBoard,l=e.createBoard,d=e.resetBoard,f=e.shareBoard,b=e.updateLists,p=e.deleteBoard,h=e.logout;return Object(S.jsx)(te,{user:t,boardId:n,boardName:r,lists:a,loadBoard:o,loadHome:s,loadBoards:i,emailSignInLink:c,renameBoard:u,createBoard:l,resetBoard:d,shareBoard:f,updateLists:b,deleteBoard:p,logout:h})},re=n(48),ae=n(79),oe=n(147),se=n(21),ie=n(45),ce=n(110),ue=Object(oe.a)({apiKey:"AIzaSyDhW83x6Ly2G1pAeUbZXMb4wCSWXSCJGiQ",authDomain:"shoppinglist-e84b8.firebaseapp.com",projectId:"shoppinglist-e84b8",storageBucket:"shoppinglist-e84b8.appspot.com",messagingSenderId:"971048186595",appId:"1:971048186595:web:c86bc2d850eccea42e8bd6",databaseUrl:"https://shoppinglist-e84b8-default-rtdb.firebaseio.com/"}),le=Object(se.a)(ue);Object(ce.initializeAuth)(ue,{persistence:Object(ce.getReactNativePersistence)(re.a)});var de={url:"https://mickeybarcia.github.io/ShoppingList/",handleCodeInApp:!0,iOS:{bundleId:"com.mickey.shoppinglisttracker"},dynamicLinkDomain:"shoppinglisttrackerapp.page.link"},fe=function(e,t){var n;return d.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return n=Object(se.d)(le,"boards/"+e+"/lists"),r.next=3,d.a.awrap(Object(se.e)(n,JSON.stringify(t)));case 3:case"end":return r.stop()}}),null,null,null,Promise)},be=function(e,t){var n,r;return d.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return n=Object(se.c)(Object(se.d)(le,"boards")),r=n.key,a.next=4,d.a.awrap(Object(se.e)(n,{name:e,lists:JSON.stringify([])}));case 4:return a.next=6,d.a.awrap(pe(t,r,e));case 6:return a.abrupt("return",r);case 7:case"end":return a.stop()}}),null,null,null,Promise)},pe=function(e,t){return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d.a.awrap(Object(se.e)(Object(se.d)(le,"boards/"+t+"/users/"+e.replace(".","%2e")),!0));case 2:return n.next=4,d.a.awrap(Object(se.e)(Object(se.d)(le,"users/"+e.replace(".","%2e")+"/boards/"+t),!0));case 4:case"end":return n.stop()}}),null,null,null,Promise)},he=function(e,t){return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d.a.awrap(Object(se.e)(Object(se.d)(le,"users/"+t.replace(".","%2e")+"/boards/"+e),!1));case 2:case"end":return n.stop()}}),null,null,null,Promise)},je=function(e,t){return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,d.a.awrap(Object(se.e)(Object(se.d)(le,"boards/"+e+"/name"),t));case 2:case"end":return n.stop()}}),null,null,null,Promise)},me=function(e){var t;return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t=Object(ie.a)(),n.next=3,d.a.awrap(Object(ie.c)(t,e,de));case 3:case"end":return n.stop()}}),null,null,null,Promise)},xe=function(e){var t=Object(ie.a)();return Object(ie.b)(t,e)},Oe=function(e,t){var n;return d.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return n=Object(ie.a)(),r.next=3,d.a.awrap(Object(ie.d)(n,e,t));case 3:case"end":return r.stop()}}),null,null,null,Promise)},we=function(){var e;return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e=Object(ie.a)(),t.next=3,d.a.awrap(Object(ie.e)(e));case 3:case"end":return t.stop()}}),null,null,null,Promise)},ge=function(e){Object(ie.a)().onAuthStateChanged((function(t){return e(t)}))},ve=function(e,t,n){var r=Object(se.d)(le,"boards/"+e);Object(se.b)(r,(function(e){return t(e.exists()?e.val():null)}),n)},ye=function(e,t,n){var r;return d.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:r=Object(se.d)(le,"users/"+e.replace(".","%2e")+"/boards"),Object(se.b)(r,(function(e){return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",e.exists()&&t(e.val()));case 1:case"end":return n.stop()}}),null,null,null,Promise)}),n);case 2:case"end":return a.stop()}}),null,null,null,Promise)},Be=function(e,t,n){var r=Object(se.d)(le,"boards/"+e+"/name");Object(se.b)(r,(function(e){return e.exists()&&t(e.val())}),n)},Re=function(e){var t=e.children,n=Object(a.useState)(null),r=u()(n,2),o=r[0],s=r[1],i=Object(a.useState)(null),c=u()(i,2),l=c[0],f=c[1],b=Object(a.useState)(null),p=u()(b,2),h=p[0],j=p[1],m=Object(a.useState)([]),x=u()(m,2),O=x[0],w=x[1],v=Object(a.useState)(),y=u()(v,2),B=y[0],R=y[1],I=function(e,t,n){var r;return d.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(!xe(e)){a.next=20;break}return a.next=3,d.a.awrap(re.a.getItem("emailForSignIn"));case 3:if(r=a.sent){a.next=6;break}return a.abrupt("return",t(Error("email mismatch")));case 6:return a.next=8,d.a.awrap(re.a.removeItem("emailForSignIn"));case 8:return a.prev=8,a.next=11,d.a.awrap(Oe(r,e));case 11:n(),ge((function(e){return e&&s(e)})),a.next=18;break;case 15:a.prev=15,a.t0=a.catch(8),t(a.t0);case 18:a.next=22;break;case 20:ge((function(e){return e&&s(e)})),n();case 22:case"end":return a.stop()}}),null,null,[[8,15]],Promise)},C={user:o,boardId:l,boardName:h,boardIds:O,lists:B,logout:function(e,t){return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,d.a.awrap(we());case 3:s(null),e(),n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),t(n.t0);case 10:case"end":return n.stop()}}),null,null,[[0,7]],Promise)},createBoard:function(e,t){var n;return d.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,d.a.awrap(be(e,o.email));case 3:n=r.sent,f(n),r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),t(r.t0);case 10:case"end":return r.stop()}}),null,null,[[0,7]],Promise)},resetBoard:function(){return d.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.awrap(re.a.removeItem("boardId"));case 2:f(null),j(null),R(null);case 5:case"end":return e.stop()}}),null,null,null,Promise)},loadBoard:function(e){return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.awrap(re.a.setItem("boardId",l));case 2:return t.next=4,d.a.awrap(ve(l,(function(e){if(e){var t=e.name,n=e.lists;h||j(t),R(JSON.parse(n))}}),(function(t){return"PERMISSION_DENIED"!==t.code&&e(t)})));case 4:case"end":return t.stop()}}),null,null,null,Promise)},loadHome:function(e,t){var n;return d.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:if("web"!==g.a.OS){r.next=4;break}I(window.location.href,e,t),r.next=7;break;case 4:return ae.a.getInitialURL().then((function(n){I("",e,t)})),n=ae.a.addEventListener("url",(function(n){return I(n.url,e,t)})),r.abrupt("return",(function(){n()}));case 7:case"end":return r.stop()}}),null,null,null,Promise)},renameBoard:function(e,t){return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,d.a.awrap(je(l,e));case 3:j(e),n.next=9;break;case 6:n.prev=6,n.t0=n.catch(0),t();case 9:case"end":return n.stop()}}),null,null,[[0,6]],Promise)},loadBoards:function(){var e;return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.awrap(re.a.getItem("boardId"));case 2:(e=t.sent)&&f(e),ye(o.email,(function(e){var t=Object.entries(e).filter((function(e){return u()(e,2)[1]})).map((function(e){return u()(e,1)[0]}));w(t)}),(function(e){return console.log(e)}));case 5:case"end":return t.stop()}}),null,null,null,Promise)},shareBoard:function(e,t,n){return d.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,d.a.awrap(pe(e,l));case 3:t(),r.next=9;break;case 6:r.prev=6,r.t0=r.catch(0),n(r.t0);case 9:case"end":return r.stop()}}),null,null,[[0,6]],Promise)},updateLists:function(e){return d.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",fe(l,e));case 1:case"end":return t.stop()}}),null,null,null,Promise)},deleteBoard:function(e,t){return d.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,d.a.awrap(he(l,o.email));case 3:e(),n.next=9;break;case 6:n.prev=6,n.t0=n.catch(0),t();case 9:case"end":return n.stop()}}),null,null,[[0,6]],Promise)},emailSignInLink:function(e,t,n){return d.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,d.a.awrap(re.a.setItem("emailForSignIn",e));case 2:return r.prev=2,r.next=5,d.a.awrap(me(e));case 5:t(),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(2),n(r.t0);case 11:case"end":return r.stop()}}),null,null,[[2,8]],Promise)},loadBoardName:function(e,t,n){return d.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",Be(e,t,n));case 1:case"end":return r.stop()}}),null,null,null,Promise)},setBoardIdCtx:function(e){return f(e)}};return Object(S.jsx)(W.Provider,{value:C,children:t})},Se=n(27),Ie=n.n(Se),Ce=n(28),Le=n.n(Ce),Pe=n(31),ke=n.n(Pe),qe=n(32),Te=n.n(qe),De=n(18),Ee=n.n(De);function Ae(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Ee()(e);if(t){var a=Ee()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Te()(this,n)}}var ze=function(e){ke()(n,e);var t=Ae(n);function n(){var e;Ie()(this,n);for(var r=arguments.length,a=new Array(r),o=0;o<r;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={hasError:!1},e}return Le()(n,[{key:"componentDidCatch",value:function(e){console.error(e)}},{key:"render",value:function(){return this.state.hasError?Object(S.jsx)("p",{children:"woops..."}):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return console.log(e),{hasError:!0}}}]),n}(o.a.Component);var He=s.a.create({container:{flex:1,backgroundColor:"#1298ED"}});Object(r.a)((function(){return Object(S.jsx)(i.a,{style:He.container,children:Object(S.jsx)(Re,{children:Object(S.jsx)(ze,{children:Object(S.jsx)(ne,{})})})})}))}},[[150,1,2]]]);
//# sourceMappingURL=app.97431aab.chunk.js.map