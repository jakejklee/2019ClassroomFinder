(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{59:function(e,t,a){e.exports=a(99)},79:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),l=a(21),s=a.n(l),r=(a(64),a(10)),c=a(11),i=a(13),m=a(12),u=a(14),d=a(8),h=a(105),g=a(37),p=a.n(g);p.a.initializeApp({apiKey:"AIzaSyBMPXUl2PERXrbAUtPujHj04Yllk46xfRg",authDomain:"csis-4495.firebaseapp.com",databaseURL:"https://csis-4495.firebaseio.com",projectId:"csis-4495",storageBucket:"csis-4495.appspot.com",messagingSenderId:"652993270371",appId:"1:652993270371:web:979f7522b83bc351"});var E=p.a,f=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state=void 0,a.componentDidMount=function(){E.auth().onAuthStateChanged(function(e){e&&E.firestore().collection("users").doc(e.uid).onSnapshot(function(e){var t=e.data();t&&(t.isManager?a.props.history.push("/managerMain"):a.props.history.push("/studentMain"))})})},a.userSignin=function(e,t){E.auth().signInWithEmailAndPassword(e,t).then(function(e){console.log(e),e.user&&E.firestore().collection("users").doc(e.user.uid).onSnapshot(function(e){var t=e.data();t&&(t.isManager?a.props.history.push("/managerMain"):a.props.history.push("/studentMain"))})}).catch(function(e){console.log(e)})},a.state={emailAddress:"",password:""},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"handleEmailChange",value:function(e){this.setState({emailAddress:e.target.value})}},{key:"handlePWChange",value:function(e){this.setState({password:e.target.value})}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{id:"mainDiv",style:{width:"100%",textAlign:"center"}},o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h1",null,"Login"),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("div",{id:"formDiv",style:{margin:"auto",width:"50%",border:"1px solid",borderRadius:10,padding:10}},o.a.createElement("form",null,o.a.createElement("h3",{style:{textAlign:"left",marginLeft:"5%"}},"Email"),o.a.createElement("input",{style:{width:"90%"},id:"inputEmail",autoComplete:"off",type:"email",value:this.state.emailAddress,name:"email",placeholder:" example@example.com",required:!0,onChange:function(t){e.handleEmailChange(t)}}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("h3",{style:{textAlign:"left",marginLeft:"5%"}},"Password"),o.a.createElement("input",{style:{width:"90%"},id:"inputPassword",autoComplete:"off",placeholder:" At least 6 characters",type:"password",value:this.state.password,name:"password",required:!0,onChange:function(t){e.handlePWChange(t)}}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement(h.a,{id:"loginBtn",variant:"primary",style:{marginRight:10},onClick:function(){return e.userSignin(e.state.emailAddress,e.state.password)}},"Sign in"),"Or",o.a.createElement(h.a,{style:{marginLeft:"10px"},id:"signupBtn",variant:"success"},o.a.createElement(d.b,{to:"/signup",style:{textDecoration:"none",color:"white"}}," Sign up")),o.a.createElement("br",null),o.a.createElement("br",null))))}}]),t}(o.a.Component),C=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state=void 0,a.state={},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"manageclasses"),o.a.createElement(d.b,{to:"/managerMain"},"managerMain"),o.a.createElement(d.b,{to:"/manageclasses"},"manageclasses"),o.a.createElement(d.b,{to:"/signup"},"signup"),o.a.createElement(d.b,{to:"/studentMain"},"studentMain"),o.a.createElement(d.b,{to:"/"},"Login"))}}]),t}(o.a.Component),b=a(101),y=a(55),v=(a(79),a(104)),S=a(103),w=a(102),D=a(20),O=a.n(D),j=new Date,I=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state=void 0,a.handleChange=function(e){switch(e.target.name){case"term":return void a.setState({classTerm:e.target.value});case"classCode":return void a.setState({classCode:e.target.value});case"subject":return void a.setState({subject:e.target.value});case"title":return void a.setState({title:e.target.value});case"startDate":return void a.setState({startDate:e.target.value});case"endDate":return void a.setState({endDate:e.target.value});case"days":return void a.setState({days:e.target.value});case"time":return void a.setState({time:e.target.value});case"campus":return void a.setState({campus:e.target.value});case"room":return void a.setState({room:e.target.value});case"classInfo":return void a.setState({classInfo:e.target.value})}},a.renderTerm=function(){return console.log(j.getFullYear()),j.getMonth()<=3?o.a.createElement(v.a.Control,{as:"select",name:"term",onChange:function(e){a.handleChange(e)}},o.a.createElement("option",{selected:!0},"Summer 2019"),o.a.createElement("option",null,"Fall 2019"),o.a.createElement("option",null,"Winter 2020")):j.getMonth()<=7&&j.getMonth()>=4?o.a.createElement(v.a.Control,{as:"select",name:"term",onChange:function(e){a.handleChange(e)}},o.a.createElement("option",null,"Summer 2019"),o.a.createElement("option",{selected:!0},"Fall 2019"),o.a.createElement("option",null,"Winter 2020")):j.getMonth()<=11&&j.getMonth()>=8?o.a.createElement(v.a.Control,{as:"select",name:"term",onChange:function(e){a.handleChange(e)}},o.a.createElement("option",null,"Summer 2019"),o.a.createElement("option",null,"Fall 2019"),o.a.createElement("option",{selected:!0},"Winter 2020")):void 0},a.addClass=function(){var e=new Date;console.log(a.props.modalInfo.schoolCode);var t=a.props.modalInfo.schoolCode;if(a.state.addingClasses){var n=a.state.classInfo.split("/"),o=[],l=[];O.a.each(n,function(e){o.push(e.split(","))}),O.a.each(o,function(e){O.a.each(e,function(e){l.push(e.split(":"))})}),console.log(o),console.log(l),O.a.each(a.state.classInfo,function(e){})}else E.firestore().collection("classes").doc(t).collection(a.state.classTerm).add({createdAt:e,classCode:a.state.classCode,subject:a.state.subject,title:a.state.title,startDate:a.state.startDate,endDate:a.state.endDate,day:a.state.days,time:a.state.time,campus:a.state.campus,room:a.state.room}).then(function(e){console.log(e),a.setState({campus:""}),a.setState({classCode:""}),a.setState({subject:""}),a.setState({title:""}),a.setState({startDate:""}),a.setState({endDate:""}),a.setState({days:""}),a.setState({time:""}),a.setState({room:""}),a.props.modalInfo.modalHide()})},a.state={classTerm:"Fall 2019",classCode:"",subject:"",title:"",startDate:"",endDate:"",days:"",time:"",campus:"",room:"",addingClasses:!1,classInfo:void 0},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;console.log(this.props);var t=this.props.modalInfo;return"add"===t.modalType?o.a.createElement(S.a,{show:t.modalOpen,onHide:function(){return t.modalHide()},centered:!0},o.a.createElement(S.a.Header,{closeButton:!0},o.a.createElement(S.a.Title,{id:"contained-modal-title-vcenter",style:{textAlign:"center"}},t.schoolName)),o.a.createElement(S.a.Body,{style:{textAlign:"center"}},o.a.createElement("fieldset",null,o.a.createElement(v.a.Group,null,o.a.createElement(b.a,null,o.a.createElement(y.a,null,o.a.createElement(v.a.Check,{type:"radio",label:"Adding a class",name:"formHorizontalRadios",id:"formHorizontalRadios1",onChange:function(){e.setState({addingClasses:!1})},defaultChecked:!0})),o.a.createElement(y.a,null,o.a.createElement(v.a.Check,{type:"radio",label:"Adding classes",name:"formHorizontalRadios",id:"formHorizontalRadios2",onChange:function(){e.setState({addingClasses:!0})}}))))),this.state.addingClasses?o.a.createElement(v.a.Group,{controlId:"exampleForm.ControlTextarea1"},o.a.createElement(v.a.Label,null,"Enter Class Information"),o.a.createElement(v.a.Control,{as:"textarea",rows:"20",name:"classInfo",value:this.state.classInfo,onChange:function(t){e.handleChange(t)},placeholder:"classCode: 123456,subject: CSIS-1234,title: Database,startDate: 2019-09-03,endDate: 2019-12-20,day: Monday,time: 11:30-14:20,campus: New Westminster,room: N5111 / classCode: 123455,subject: CSIS-1233,title: Web programming,startDate: 2019-09-03,endDate: 2019-12-20,day: Tuesday,time: 11:30-14:20,campus: New Westminster,room: N5111 / classCode: 123454,subject: CSIS-1232,title: Applied Research,startDate: 2019-09-03,endDate: 2019-12-20,day: Wednesday,time: 12:30-15:20,campus: New Westminster,room: N6109"})):o.a.createElement(v.a,{style:{border:"1px solid",padding:20,borderRadius:20,marginTop:20}},o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalSchool"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Term"),o.a.createElement(y.a,{sm:10},this.renderTerm())),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalCode"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Class Code"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"text",placeholder:"Class Code",name:"classCode",value:this.state.classCode,onChange:function(t){e.handleChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalSubject"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Subject"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"text",placeholder:"Subject",name:"subject",value:this.state.subject,onChange:function(t){e.handleChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalTitle"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Title"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"text",placeholder:"Title",name:"title",value:this.state.title,onChange:function(t){e.handleChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalStartDate"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Start Date"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"date",placeholder:"Start date",name:"startDate",value:this.state.startDate,onChange:function(t){e.handleChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalEndDate"},o.a.createElement(v.a.Label,{column:!0,sm:2},"End Date"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"date",placeholder:"End date",name:"endDate",value:this.state.endDate,onChange:function(t){e.handleChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalDays"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Days"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{as:"select",name:"days",onChange:function(t){e.handleChange(t)}},o.a.createElement("option",{selected:!0},"Select"),o.a.createElement("option",null,"Monday"),o.a.createElement("option",null,"Tuesday"),o.a.createElement("option",null,"Wednesday"),o.a.createElement("option",null,"Thursday"),o.a.createElement("option",null,"Friday"),o.a.createElement("option",null,"Saturday"),o.a.createElement("option",null,"Sunday")))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalTime"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Time"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"text",placeholder:"Time",name:"time",value:this.state.time,onChange:function(t){e.handleChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalCampus"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Campus"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"text",placeholder:"Campus",name:"campus",value:this.state.campus,onChange:function(t){e.handleChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalRoom"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Room"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"text",placeholder:"Room",name:"room",value:this.state.room,onChange:function(t){e.handleChange(t)}}))))),o.a.createElement(S.a.Footer,null,o.a.createElement("div",null,O.a.size(this.state.classInfo)>0&&this.state.addingClasses?o.a.createElement(h.a,{onClick:function(){e.addClass()},style:{marginLeft:100}},"Add a class"):this.state.classCode&&this.state.subject&&this.state.title&&this.state.startDate&&this.state.endDate&&this.state.days&&this.state.time&&this.state.campus&&this.state.room?o.a.createElement(h.a,{onClick:function(){e.addClass()},style:{marginLeft:100}},"Add a class"):o.a.createElement(h.a,{type:"submit",disabled:!0,style:{marginLeft:100}}," Add a class")))):"edit"===t.modalType?o.a.createElement("div",null,o.a.createElement(S.a,{show:t.modalOpen,onHide:function(){return t.modalHide()},size:"sm",centered:!0},o.a.createElement(S.a.Header,{closeButton:!0},o.a.createElement(S.a.Title,{id:"contained-modal-title-vcenter",style:{textAlign:"center"}},"Edit a class")),o.a.createElement(S.a.Body,{style:{textAlign:"center"}}),o.a.createElement(S.a.Footer,null))):"remove"===t.modalType?o.a.createElement("div",null,o.a.createElement(S.a,{show:t.modalOpen,onHide:function(){return t.modalHide()},size:"sm",centered:!0},o.a.createElement(S.a.Header,{closeButton:!0},o.a.createElement(S.a.Title,{id:"contained-modal-title-vcenter",style:{textAlign:"center"}},"Remove a class")),o.a.createElement(S.a.Body,{style:{textAlign:"center"}}),o.a.createElement(S.a.Footer,null))):o.a.createElement("div",null,t.modalOpen?o.a.createElement(w.a,{animation:"border"}):null)}}]),t}(o.a.Component),N=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state=void 0,a.componentDidMount=function(){E.auth().onAuthStateChanged(function(e){e?E.firestore().collection("users").doc(e.uid).onSnapshot(function(t){var n=t.data();n&&(n.isManager?n.isConfirmed?(a.setState({isConfirmed:!0}),a.setState({userID:e.uid}),a.setState({userSchoolName:n.schoolName}),E.firestore().collection("classes").onSnapshot(function(e){O.a.each(e.docs,function(e){e.data().name===a.state.userSchoolName&&a.setState({schoolCode:e.id})})})):a.setState({isConfirmed:!1}):a.props.history.push("/studentMain"))}):a.props.history.push("/")})},a.signOut=function(){E.auth().signOut().then(function(e){console.log(e),console.log("Logged out"),a.props.history.push("/")}).catch(function(e){console.log(e)})},a.clickBtn=function(e){a.setState({modalType:e}),a.setState({classModal:!0})},a.state={classModal:!1,editClassModal:!1,modalType:"",isConfirmed:!0,userID:"",userSchoolName:"",schoolCode:""},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t={modalType:this.state.modalType,modalHide:function(){e.setState({classModal:!1})},modalOpen:this.state.classModal,schoolName:this.state.userSchoolName,schoolCode:this.state.schoolCode};return this.state.isConfirmed?o.a.createElement("div",{style:{margin:"auto",width:"70%",textAlign:"center"}},o.a.createElement(b.a,null,o.a.createElement(y.a,null),o.a.createElement(y.a,null,o.a.createElement("h1",null,"Manager Page")),o.a.createElement(y.a,null,o.a.createElement("h6",{id:"signOutBtn",style:{border:"1px solid",width:110,height:40,lineHeight:"35px",marginTop:10,cursor:"pointer",borderRadius:5},onClick:function(){return e.signOut()}},"Sign out"))),o.a.createElement("br",null),o.a.createElement(b.a,{style:{width:"100%",marginBottom:30}},o.a.createElement(y.a,{md:"auto",id:"addBtn",style:{width:300,height:270,margin:"auto",marginRight:0}},o.a.createElement(h.a,{style:{width:"100%",height:"100%",fontWeight:M,fontSize:k},onClick:function(){e.clickBtn("add")}},"Add a class")),o.a.createElement(y.a,{md:"auto",id:"editBtn",style:{width:300,height:270,margin:"auto",marginLeft:0}},o.a.createElement(h.a,{style:{width:"100%",height:"100%",fontWeight:M,fontSize:k},onClick:function(){e.clickBtn("edit")}},"Edit a class"))),o.a.createElement(b.a,{style:{width:"100%"}},o.a.createElement(y.a,{md:"auto",id:"removeBtn",style:{width:300,height:270,margin:"auto",marginRight:0}},o.a.createElement(h.a,{style:{width:"100%",height:"100%",fontWeight:M,fontSize:k},onClick:function(){e.clickBtn("remove")}},"Remove a class")),o.a.createElement(y.a,{md:"auto",id:"studentBtn",style:{width:300,height:270,margin:"auto",marginLeft:0}},o.a.createElement(h.a,{style:{width:"100%",height:"100%",fontWeight:M,fontSize:k}},"Student screen"))),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement(I,{modalInfo:t})):o.a.createElement("div",null,"Your account is not confirmed yet.",o.a.createElement("h6",{id:"signOutBtn",style:{border:"1px solid",width:110,height:40,lineHeight:"35px",marginTop:10,cursor:"pointer",borderRadius:5},onClick:function(){return e.signOut()}},"Sign out"))}}]),t}(o.a.Component),M="bold",k=30,x=N,H=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state=void 0,a.signUp=function(e,t){console.log(e),console.log(t);var n=new Date;E.auth().createUserWithEmailAndPassword(e,t).then(function(e){e.user&&(a.state.studentOrManager?E.firestore().collection("users").doc(e.user.uid).set({createdAt:n,userEmail:e.user.email,firstName:a.state.fName,lastName:a.state.lName,schoolName:a.state.schoolName,isManager:a.state.studentOrManager,isConfirmed:!1}).then(function(){E.firestore().collection("classes").doc().set({name:a.state.schoolName}).then(function(e){console.log(e)})}):E.firestore().collection("users").doc(e.user.uid).set({createdAt:n,userEmail:e.user.email,firstName:a.state.fName,lastName:a.state.lName,schoolName:a.state.schoolName,isManager:a.state.studentOrManager,userID:a.state.studentID})),console.log(e)}).catch(function(e){console.log(e)})},a.state={studentOrManager:!1,userEmail:"",password:"",fName:"",lName:"",schoolName:"",studentID:""},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"handleEmailChange",value:function(e){this.setState({userEmail:e.target.value})}},{key:"handlePWChange",value:function(e){this.setState({password:e.target.value})}},{key:"handleFNameChange",value:function(e){this.setState({fName:e.target.value})}},{key:"handleLNameChange",value:function(e){this.setState({lName:e.target.value})}},{key:"handleSchoolChange",value:function(e){this.setState({schoolName:e.target.value})}},{key:"handleStudentIDChange",value:function(e){this.setState({studentID:e.target.value})}},{key:"render",value:function(){var e=this;return console.log(this.state.schoolName),o.a.createElement("div",{style:{width:700,margin:"auto",textAlign:"center"}},o.a.createElement("h1",null,"New account"),o.a.createElement(v.a,{style:{border:"1px solid",padding:20,borderRadius:20,marginTop:20}},o.a.createElement("fieldset",null,o.a.createElement(v.a.Group,null,o.a.createElement(b.a,null,o.a.createElement(y.a,null,o.a.createElement(v.a.Check,{type:"radio",label:"Student",name:"formHorizontalRadios",id:"formHorizontalRadios1",onChange:function(){e.setState({studentOrManager:!1})},defaultChecked:!0})),o.a.createElement(y.a,null,o.a.createElement(v.a.Check,{type:"radio",label:"Manager",name:"formHorizontalRadios",id:"formHorizontalRadios2",onChange:function(){e.setState({studentOrManager:!0})}}))))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalEmail"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Email"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"email",placeholder:"Email",value:this.state.userEmail,onChange:function(t){e.handleEmailChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalPassword"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Password"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"password",placeholder:"Password",value:this.state.password,onChange:function(t){e.handlePWChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalFName"},o.a.createElement(v.a.Label,{column:!0,sm:2},"First Name"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"text",placeholder:"First Name",value:this.state.fName,onChange:function(t){e.handleFNameChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalLName"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Last Name"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"text",placeholder:"Last Name",value:this.state.lName,onChange:function(t){e.handleLNameChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalSchool"},o.a.createElement(v.a.Label,{column:!0,sm:2},"School"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{as:"select",onChange:function(t){e.handleSchoolChange(t)}},o.a.createElement("option",null,"School"),o.a.createElement("option",null,"Douglas College"),o.a.createElement("option",null,"University of Douglas"),o.a.createElement("option",null,"Douglas Institute of Technology")))),this.state.studentOrManager?null:o.a.createElement(v.a.Group,{as:b.a,controlId:"formHorizontalStudentID"},o.a.createElement(v.a.Label,{column:!0,sm:2},"Student ID"),o.a.createElement(y.a,{sm:10},o.a.createElement(v.a.Control,{type:"text",placeholder:"Student ID",value:this.state.studentID,onChange:function(t){e.handleStudentIDChange(t)}}))),o.a.createElement(v.a.Group,{as:b.a},o.a.createElement(y.a,null,o.a.createElement("div",null,o.a.createElement(h.a,{variant:"success"},o.a.createElement(d.b,{to:"/",style:{color:"white",textDecoration:"none"}},"Sign in page")),this.state.userEmail&&this.state.password?o.a.createElement(h.a,{onClick:function(){e.signUp(e.state.userEmail,e.state.password)},style:{marginLeft:100}},o.a.createElement(d.b,{to:"/",style:{color:"white",textDecoration:"none"}},"Sign up")):o.a.createElement(h.a,{type:"submit",disabled:!0,style:{marginLeft:100}}," Sign up"))))))}}]),t}(o.a.Component),L=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state=void 0,a.componentDidMount=function(){E.auth().onAuthStateChanged(function(e){e?E.firestore().collection("users").doc(e.uid).onSnapshot(function(t){var n=t.data();n&&(a.setState({userID:e.uid}),a.setState({userSchoolName:n.schoolName}),E.firestore().collection("classes").onSnapshot(function(e){O.a.each(e.docs,function(e){e.data().name===a.state.userSchoolName&&a.setState({schoolCode:e.id})})}))}):a.props.history.push("/")})},a.signOut=function(){E.auth().signOut().then(function(e){console.log(e),console.log("Logged out"),a.props.history.push("/")}).catch(function(e){console.log(e)})},a.renderData=function(){var e;return console.log(a.state.schoolCode),a.state.schoolCode&&E.firestore().collection("classes").doc(a.state.schoolCode).collection("Fall 2019").onSnapshot(function(t){console.log(t.docs[0].data()),e=t.docs[0].data().day}),o.a.createElement("div",null,e)},a.state={userID:"",userSchoolName:"",schoolCode:""},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("h6",{id:"signOutBtn",style:{border:"1px solid",width:110,height:40,lineHeight:"35px",marginTop:10,cursor:"pointer",borderRadius:5},onClick:function(){return e.signOut()}},"Sign out"),o.a.createElement("h1",null,"studentMain"),this.renderData(),o.a.createElement("div",{onClick:function(){e.renderData()}},"Get class data"),o.a.createElement(d.b,{to:"/managerMain"},"managerMain"),o.a.createElement(d.b,{to:"/manageclasses"},"manageclasses"),o.a.createElement(d.b,{to:"/signup"},"signup"),o.a.createElement(d.b,{to:"/studentMain"},"studentMain"),o.a.createElement(d.b,{to:"/"},"Login"))}}]),t}(o.a.Component),A=a(23),z=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(d.a,null,o.a.createElement("div",{style:{height:"100vh",overflow:"auto"}},o.a.createElement(A.a,{exact:!0,path:"/",component:f}),o.a.createElement(A.a,{path:"/manageclasses",component:C}),o.a.createElement(A.a,{path:"/managerMain",component:x}),o.a.createElement(A.a,{path:"/signup",component:H}),o.a.createElement(A.a,{path:"/studentMain",component:L})))}}]),t}(o.a.Component),T=function(e){function t(){return Object(r.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(z,null)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[59,1,2]]]);
//# sourceMappingURL=main.bba4b813.chunk.js.map