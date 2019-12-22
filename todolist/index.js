function addTodolist(e) {
    var addlist = {
    todo: "",   
    done: false
    };
    if (document.getElementById("new").value.length === 0){
        // alert("不能为空");
        return;
    }
    addlist.todo = document.getElementById("new").value;
    todolist.push(addlist);
    saveData(todolist);
    // document.getElementById("new").value = "";
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
            todoString += "<li class='block'>"
                + "<input class='done1' type='checkbox' onchange='update("+i+")'>"
                + "<p class='lst' id='p-"+i+"' οnclick='edit("+i+")'>" + todolist[i].todo + "</p>" 
                + "<a class='del' href='javascript:remove("+i+")'>删除</a>" +
                "</li>";
        }
        // console.log(todolist);
        for(var i=0;i<todolist.length;i++){
            
            if(todolist[i].done==false)
                tcount++;
            else
                dcount++;
        }
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
    else
        todolist[i].done = true;
    saveData(todolist);
    load();
    // alert("hh");
    // edit(i);
}

function change(i)
{
    var todolist = loadData();
    var tochg = document.getElementById("p-"+i);
    
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
        pContent = p.innerHTML,
        inputId;

    function confirm() {
        if (inputId.value.length === 0) {
            p.innerHTML = pContent;
            alert("内容不能为空");
        }
        else {
            update(i, "todo", inputId.value);
        }
    }
    function enter(e) {
        if (e.keyCode==13){
            confirm();
        }
    }

    p.innerHTML = "<input type='text' id='input-"+i+"' value='"+pContent+"'>";
    inputId = document.getElementById('input-'+i);
    inputId.focus();
    inputId.setSelectionRange(0, inputId.value.length);
    inputId.onblur = confirm;
    inputId.onkeypress = enter;     //对按键事件进行监控
}

window.addEventListener("load", load,false);  //页面加载完毕调用load函数
document.getElementById("clearbutton").onclick = clear;
document.getElementById("new").onkeypress = function (event) {
    if(event.keyCode === 13){
        addTodolist();
    }
};
