function addTodolist(e) {
    var addlist = {
    todo: "",   
    done: false
    };
    if (document.getElementById("new").value.length === 0){
        // alert("不能为空");
        return;
    }
    var _input = document.getElementById("new");
    addlist.todo = document.getElementById("new").value;
    todolist.push(addlist);
    saveData(todolist);
    _input.reset();
    load();
    document.getElementById("new").focus();
}

function load(){
    var todo = document.getElementById("todolist"),
        todocount = document.getElementById("todocount"),
        donecount = document.getElementById("donecount"),
        todoString = "";
    var tcount = 0;
    var dcount = 0;
    document.getElementById("new").focus();
    todolist = loadData();
    if (todolist != null){
        
        for (var i=0;i<todolist.length;i++){
            // alert(1);
            if(todolist[i].done==false){
                todoString += "<li class='block'>"
                + "<input class='done1' type='checkbox' onchange='update("+i+")'>"
                + "<p class='lst' id='p-"+i+"' onclick='edit("+i+")'>"+ todolist[i].todo + "</p>" 
                + "<a class='del' href='javascript:remove("+i+")'>删除</a>" +
                "</li>";
                tcount++;
            }
            else{
                todoString += "<li class='block'>"
                + "<input class='done1' type='checkbox' checked onchange='update("+i+")'>"
                + "<p class='lst' style='text-decoration:line-through;color: rgba(13, 25, 65, 0.74);' id='p-"+i+"' onclick='edit("+i+")'>"+ todolist[i].todo + "</p>" 
                + "<a class='del' href='javascript:remove("+i+")'>删除</a>" +
                "</li>";
                dcount++;
            }
            
        }
        // console.log(todolist);
        // for(var i=0;i<todolist.length;i++){
            
        //     if(todolist[i].done==false)
        //         tcount++;
        //     else
        //     {
        //         dcount++;
        //     }      
        // }
        todo.innerHTML = todoString;
        todocount.innerHTML = tcount;
        donecount.innerHTML = dcount;
    }
    else {
        todo.innerHTML = "";
        todocount.innerHTML = 0;
        donecount.innerHTML = 0;
    }
}

function update(i) {
    var todolist = loadData();
    if(todolist[i].done)
        todolist[i].done =false;
    else{
        todolist[i].done = true;
        // change(i);
    }
        
    saveData(todolist);
    load();
    // alert("hh");
    // edit(i);
    
}

function change(i)
{
    var todolist = loadData();
    var tochg = document.getElementById("p-"+i);
    tochg.innerHTML = "<p class='lst' style = 'text-decoration:line-through;'  id='p-"+i+"' onclick='edit("+i+")'>"+ todolist[i].todo + "</p>";
    // var style = document.createElement('style');
    // style.type = 'text/css';
    // style.stylesheet.cssText = 'text-decoration:line-through;';
    // tochg.appendChild(style);
}

function remove(i) {
    var todolist = loadData();
    todolist.splice(i, 1);
    saveData(todolist);
    load();
}

function saveData(data) {
    localStorage.setItem("mytodolist", JSON.stringify(data));
}

function loadData() {
    var storage = localStorage.getItem("mytodolist");
    if(storage !=null){
        return JSON.parse(storage);
    }
    else { return []; }
}

function clear() {
    localStorage.clear();
    load();
}

function edit(i) {
    var p = document.getElementById('p-' + i),
        title = p.innerHTML,
        inputId;

    function enter(e) {
        if (e.keyCode==13){
            confirm();
        }
    }
    p.innerHTML="<input required id='input-"+i+"' value='"+title+"' />";
    inputId = document.getElementById('input-'+i);
    inputId.focus();
    inputId.setSelectionRange(0, inputId.value.length);
    inputId.onblur = function (){
		if(inputId.value.length == 0){
			p.innerHTML = title;
			alert("不能为空！");
		}
		else{
			updateedt(i,inputId.value);
		}
	};
}

function updateedt(i,value){
	var data = loadData();
	var todo = data.splice(i,1)[0];
	todo.todo = value;
	data.splice(i,0,todo);
	saveData(data);
	load();
}

function timelimit(a){
    if (a<10) {
        a="0"+a;
    }
    return a;
}

function renderTime() {
    let now = new Date();
    let year = now.getFullYear();
    let mon = now.getMonth()+1;
    let date = now.getDate();
    let time = now.getTime();
    let hours = now.getHours();
    let mins = now.getMinutes();
    let sed = now.getSeconds();
    // console.log(year,mon,date,hours,mins,sed);//打印
    hours = timelimit(hours);
    mins = timelimit(mins);
    sed = timelimit(sed);
    let ctime = year+"年 "+mon+"月 "+date+"日 "+"<br>"+hours+":"+mins+":"+sed;
    document.getElementById("time").innerHTML = ctime;
}

renderTime();
setInterval(renderTime,1000);
window.addEventListener("load", load,false);  //页面加载完毕调用load函数
document.getElementById("clearbutton").onclick = clear;
document.getElementById("new").onkeypress = function (event) {
    if(event.keyCode === 13){
        addTodolist();
    }
};
