(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{65:function(e,t,r){e.exports=r.p+"static/media/magic-logo.bbd998c7.png"},88:function(e,t,r){"use strict";r.d(t,"a",(function(){return y}));var n=r(30),a=r.n(n),i=r(18),o=r.n(i),s=r(0),c=r(87),d=r(3),u=r(50),l=r(44),b=r(8),g=r(89),h=r(49),j=r(66),p=r(64),m=r.n(p).a.create({baseURL:"https://api.scryfall.com"}),x=r(65),f=r.n(x),O=r(7);function y(){var e=Object(s.useState)(""),t=a()(e,2),r=t[0],n=t[1],i=Object(s.useState)(""),d=a()(i,2),p=d[0],x=d[1],y=Object(s.useState)(!1),C=a()(y,2),D=C[0],k=C[1];return Object(O.jsxs)(j.a,{style:w.container,behavior:"ios"===Platform.OS?"padding":"height",children:[Object(O.jsxs)(b.a,{style:w.imageContainer,children:[Object(O.jsx)(h.a,{source:f.a,style:w.image}),Object(O.jsx)(g.a,{style:w.input,value:r,onChangeText:n,placeholder:"Digite o nome da carta..."}),Object(O.jsxs)(b.a,{style:w.groupButtons,children:[Object(O.jsx)(u.a,{style:w.button,onPress:function(){return function(e){var t,n,a;return o.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:if(r.trim()){i.next=2;break}return i.abrupt("return");case 2:return i.next=4,o.a.awrap(m.get("/cards/search?q="+e+"%20lang:pt"));case 4:if(t=i.sent,n=t.data,a=n.data[0],x(a),a){i.next=11;break}return x({text:"Sem tradu\xe7\xe3o pt-BR",imageUrl:null}),i.abrupt("return");case 11:case"end":return i.stop()}}),null,null,null,Promise)}(r)},children:Object(O.jsx)(l.a,{children:"Buscar"})}),Object(O.jsx)(u.a,{style:w.button,onPress:function(){k(!D)},children:Object(O.jsx)(l.a,{children:D?"Ver Texto":"Ver Imagem"})})]})]}),D?Object(O.jsx)(h.a,{source:{uri:p.image_uris.normal},style:w.cardImage}):Object(O.jsx)(b.a,{style:w.card,children:Object(O.jsx)(l.a,{children:p.printed_text})}),Object(O.jsx)(c.a,{style:"auto"})]})}var w=d.a.create({container:{flex:1,padding:20,backgroundColor:"#eee",alignItems:"center",justifyContent:"center"},imageContainer:{alignItems:"center",justifyContent:"center",marginBottom:20,width:"100%",backgroundColor:"#eee"},input:{height:40,marginTop:50,width:"80%",margin:12,borderWidth:1,padding:10},button:{alignItems:"center",backgroundColor:"#DDDDDD",padding:10,width:125,borderRadius:10,marginLeft:10},card:{minHeight:"25%",width:"80%",borderColor:"#000",padding:10,borderWidth:2,borderBottomLeftRadius:20,borderBottomRightRadius:20},image:{padding:10,width:"100%",height:120},cardImage:{width:223,height:310,borderColor:"#000",borderWidth:2,borderRadius:10},groupButtons:{flexDirection:"row"}})},90:function(e,t,r){e.exports=r(135)}},[[90,1,2]]]);
//# sourceMappingURL=app.853e5975.chunk.js.map