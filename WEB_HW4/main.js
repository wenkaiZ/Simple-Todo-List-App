
var record=new Map();
var index=0;
var id=3;
var nIndex;
record.set(index++,"initial state");
function countIndex()
    {
        
       // console.log(record);  2
    console.log(record)
        index=record.size;
        nIndex=index-1;
        
    }
 
    // add todo list, delete todolist, select todoitem 
    // add ,check : visible ,check hidden, delete: visible hidde
    
       
   function undo()
    {   
      
       var nowState=record.get(nIndex);
       
       //var prevstate=record.get(nIndex-1);
       var item=nowState.split("_")[0];
       if(nowState.indexOf("undo")!=-1)
       {
           return;
       }
       else{
       if(nowState.indexOf("init")!=-1)
        {
            return ;
        }
        else if(nowState.indexOf("add")!=-1)
        {   
           //console.log(item);
            document.getElementById("todo_list").removeChild(document.getElementById(item));
            

        }
        else if(nowState.indexOf("check_visible")!=-1)
        {
            
            document.getElementById(item).children[1].style.visibility="hidden";
        }
        else if(nowState.indexOf("check_hidden")!=-1)
        {
           
            document.getElementById(item).children[1].style.visibility="visible";
        }
        else if(nowState.indexOf("delete_visible")!=-1)
        {      
            
            undoDelete(true,nowState);
        }
        else if(nowState.indexOf("delete_hidden")!=-1)
        {   
           
           undoDelete(false,nowState);
        }
        if(record.get(nIndex).indexOf("redo")!=-1)
        {
           var arr= record.get(nIndex).split("_");
           let str="";
           for(let i=0;i<arr.length-1;i++)
           {
            str+=arr[i]+"_";
           }
           str+="undo";
           console.log(str);
           record.set(nIndex,str);
        }
        else{
        record.set(nIndex,record.get(nIndex)+"_undo");
        }
    nIndex--;//mark the undo action. If new action happens, go back to the largest nIndex.
    }
    
    //console.log(nindex);
}
    function redo()
    {
       
        //var nowstate=record.get(nIndex);
        var nextState;
        var item;
        //if there is no undo, then return nothing.
       if(nIndex+1<record.size)
        {
            nextState=record.get(nIndex+1);//set the pointer to "undo" item.
            item=nextState.split("_")[0];
        }
        else{
            return;
        }
        //if the last item is marked by "redo", then return nothing.
        if(nextState.indexOf("redo")!=-1)
        {
            return;
        }
        else{
        
          if(nextState.indexOf("add")!=-1)
         {   
            
             
            redoAdd(false,nextState);
         }
         else if(nextState.indexOf("check_visible")!=-1)
         {
             
             document.getElementById(item).children[1].style.visibility="visible";
         }
         else if(nextState.indexOf("check_hidden")!=-1)
         {
            
             document.getElementById(item).children[1].style.visibility="hidden";
         }
         else if(nextState.indexOf("delete_visible")!=-1)
         {      
             
             document.getElementById("todo_list").removeChild(document.getElementById(item));
         }
         else if(nextState.indexOf("delete_hidden")!=-1)
         {   
            
            document.getElementById("todo_list").removeChild(document.getElementById(item));
         }
         if(nextState.indexOf("undo")!=-1)//no need, because nIndex can indicate it is "undo".
         {
            var arr=nextState.split("_");
            let str="";
            for(let i=0;i<arr.length-1;i++)
            {
             str+=arr[i]+"_";
            }
            str+="redo";
            record.set(nIndex+1,str);
         }
         
     nIndex++;
     }
    }


 document.onkeydown=function (event)
 {
    
    var e =event||window.event||arguments.callee.caller.arguments[0];
    //keychar = String.fromCharCode(keynum);
    //var e=window.event;
    
    if(e.keyCode===90&&e.ctrlKey)
{
    
    //console.log(record.get(2).indexOf("check"));
    
    undo();
    console.log(record);
   // console.log("ds");
}
else if(e.keyCode===89&&e.ctrlKey)
{   
    console.log("you press ctrl+Y");
    
    redo();
    console.log(record);
}


 }   
//add check and delete icon on li tag
 function AddCheckAndDelete()
{
var lis=document.getElementsByTagName("li");
for(let i=0;i<lis.length;i++)
    {
    var span=document.createElement("span");
    var txt=document.createTextNode("\u00D7");
    span.className="delete";
    span.appendChild(txt);
    lis[i].appendChild(span);

    var span=document.createElement("span");
    var txt=document.createTextNode("\u2713");
    span.className="check";
    span.style.visibility="hidden";
    span.appendChild(txt);
    lis[i].appendChild(span);
    }
}
// fulfil delete action for the delete icon
function delete_action()
{
var closes=document.getElementsByClassName("delete");
for(let i=0;i<closes.length;i++)
    {
    closes[i].onclick=function(event)
        {
        var liParent=this.parentElement;
        //liparent.style.display="none";
        var ulParent=liParent.parentElement;
            //console.log(closes[i].nextSibling);
        if(liParent.children[1].style.visibility==="visible")
       {
       
        record.set(index,liParent.id+"_delete_visible_"+liParent.childNodes[0].nodeValue);
        countIndex();
        //innerText XX
       } 
       else{
        
        record.set(index,liParent.id+"_delete_hidden_"+liParent.childNodes[0].nodeValue);
        countIndex();
       }
        ulParent.removeChild(liParent);   
        event.stopPropagation(); 
        }
    }
}

// fulfil the action of select on the li tag
function check_action()
{
    var lis=document.getElementsByTagName("li");

for(let i=0;i<lis.length;i++)
{   
    
    lis[i].onclick=function(){
        
        if(this===undefined)
        {
          return;
        } // console.log(lis[i].children[1].style.visibility);
       
       else{
        if(this.getElementsByClassName("check")[0].style.visibility==="hidden")
            {   
                
                this.getElementsByClassName("check")[0].style.visibility="visible";
                
                record.set(index,this.id+"_check_visible_"+this.childNodes[0].nodeValue);
                countIndex();
               
            }
            else if(this.getElementsByClassName("check")[0].style.visibility==="visible")
            {
                this.getElementsByClassName("check")[0].style.visibility="hidden";
               
                record.set(index,this.id+"_check_hidden_"+this.childNodes[0].nodeValue);
                console.log(record);
                countIndex();
            }
            
       }
    }

}
}


//add a new to do item for the to do item list
function addAction()
{
    var inputTxt=document.getElementById("input_txt").value;
    if(inputTxt.trim()=="")
    {alert("Please input value first!"); return;}
   
   var newTo_do= document.getElementById("todo_list");
   var li=document.createElement("li");
   li.innerHTML=inputTxt;
   li.setAttribute("id","todo item"+id);
   document.getElementById("input_txt").value="";
   
   newTo_do.appendChild(li);

   var span=document.createElement("span");
    var txt=document.createTextNode("\u00D7");
    span.className="delete";
    span.appendChild(txt);
    li.appendChild(span);

    var span=document.createElement("span");
    var txt=document.createTextNode("\u2713");
    span.className="check";
    span.style.visibility="hidden";
    span.appendChild(txt);
    li.appendChild(span);
    var closes=document.getElementsByClassName("delete");
    check_action();
    delete_action();
      
    
    record.set(index,"todo item"+id+"_add_"+inputTxt);
    countIndex();
    id++;
  
}


function undoDelete(flag,nowState)
{   
    //let now=nowstate;
    var newTo_do= document.getElementById("todo_list");
    var li=document.createElement("li");
   //console.log(nowstate);
   li.innerHTML=nowState.split("_")[3];//store the content of this todo_list
   //console.log(nowstate.split(" ")[0]);
   li.setAttribute("id",nowState.split("_")[0]);
   document.getElementById("input_txt").value="";

   
   let delete_index=nowState.split("_")[0].split("m")[1];//store the delete node's id
   //console.log(delete_index);
   //console.log(delete_index);
   if(document.getElementsByTagName("li").length===0)
   {    
       
       newTo_do.appendChild(li);
   }
   else{
       var lis= document.getElementsByTagName("li");
        //  1 2 3 4 5 6  7 8 
        //  1 2  5 6 7 8
        // 1 2 3 4 
        // 1 2 3
       var insert_index=lis[0];
       
       if(delete_index>lis[lis.length-1].id.split("_")[0].split("m")[1])
        {           
            
               document.getElementById("todo_list").insertBefore(li,lis[lis.length-1].nextSibling);//insert into the last, like insertAfter
        }

       for(let i=0;i<lis.length;i++)
       {    
           var item_id=lis[i].id.split("_")[0].split("m")[1];
           
           if((delete_index-item_id)<0)
           {    
              
                   document.getElementById("todo_list").insertBefore(li,lis[i]);//insert in sequence
                   console.log("B");
                   break;
               
           }
           
           

       }
       
       
   }
   // is last node or any node left?
   

    var span=document.createElement("span");
    var txt=document.createTextNode("\u00D7");
    span.className="delete";
    span.appendChild(txt);
    li.appendChild(span);

    var span=document.createElement("span");
    var txt=document.createTextNode("\u2713");
    span.className="check";
    if(flag===true)
    span.style.visibility="visible";
    else{
        span.style.visibility="hidden";
    }
    span.appendChild(txt);
    li.appendChild(span);
    //var closes=document.getElementsByClassName("delete");
    check_action();
    delete_action();
}
// now  prev next 

function redoAdd(flag,nowstate)
{   
    //let now=nowstate;
    var newTo_do= document.getElementById("todo_list");
    var li=document.createElement("li");
   //console.log(nowstate);
   li.innerHTML=nowstate.split("_")[2];//store the content of this todo_list
   //console.log(nowstate.split(" ")[0]);
   li.setAttribute("id",nowstate.split("_")[0]);
   document.getElementById("input_txt").value="";

   
   let delete_index=nowstate.split("_")[0].split("m")[1];//store the delete node's id
   //console.log(delete_index);
   //console.log(delete_index);
   if(document.getElementsByTagName("li").length===0)
   {    
       
       newTo_do.appendChild(li);
   }
   else{
       var lis= document.getElementsByTagName("li");
       
       var insert_index=lis[0];
       
       if(delete_index>lis[lis.length-1].id.split("_")[0].split("m")[1])
        {           
            
               document.getElementById("todo_list").insertBefore(li,lis[lis.length-1].nextSibling);//insert into the last, like insertAfter
        }

       for(let i=0;i<lis.length;i++)
       {    
           var item_id=lis[i].id.split("_")[0].split("m")[1];
           
           if((delete_index-item_id)<0)
           {    
              
                   document.getElementById("todo_list").insertBefore(li,lis[i]);//insert in sequence
                   console.log("check insert before");
                   break;
               
           }
           
           

       }
       
       
   }

   

   var span=document.createElement("span");
    var txt=document.createTextNode("\u00D7");
    span.className="delete";
    span.appendChild(txt);
    li.appendChild(span);

    var span=document.createElement("span");
    var txt=document.createTextNode("\u2713");
    span.className="check";
    if(flag===true)
    span.style.visibility="visible";
    else{
        span.style.visibility="hidden";
    }
    span.appendChild(txt);
    li.appendChild(span);
    //var closes=document.getElementsByClassName("delete");
    check_action();
    delete_action();
}