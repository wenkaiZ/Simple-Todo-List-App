
var record=new Map();
var index=0;
var id=3;
var nindex;
record.set(index,"inital state");
index++;
function countindex()
    {
        
       // console.log(record);  2
    for(let i=0;i<record.size;i++)
    {   
      
        if(record.get(i).indexOf("check")!=-1)
        {   //
           // console.log(record.get(i));
            if((record.get(i-1).split(" ")[0]===record.get(i).split(" ")[0])
            &&(nindex!==record.size-1)&&(record.get(i-1).split(" ")[1]
            !==record.get(i).split(" ")[1]))
            {
                
                record.delete(i);
                //console.log(record);
            }
            
        }   
    }
    console.log(record)
        index=record.size;
        nindex=index-1;
        
    }
 
    // add todo list, delete todolist, select todoitem 
    // add ,check : visible ,check hidden, delete: visible hidde
    
       
   function undo()
    {   
      
       var nowstate=record.get(nindex);
       
       var prevstate=record.get(nindex-1);
       var item=nowstate.split(" ")[0];
       if(nowstate.indexOf("undo")!=-1)
       {
           return;
       }
       else{
       if(nowstate.indexOf("init")!=-1)
        {
            return ;
        }
        else if(nowstate.indexOf("add")!=-1)
        {   
           //console.log(item);
            document.getElementById("todo_list").removeChild(document.getElementById(item));
            

        }
        else if(nowstate.indexOf("check visible")!=-1)
        {
            
            document.getElementById(item).children[1].style.visibility="hidden";
        }
        else if(nowstate.indexOf("check hidden")!=-1)
        {
           
            document.getElementById(item).children[1].style.visibility="visible";
        }
        else if(nowstate.indexOf("delete visible")!=-1)
        {      
            
            undoDelete(true,nowstate);
        }
        else if(nowstate.indexOf("delete hidden")!=-1)
        {   
           
           undoDelete(false,nowstate);
        }
        if(record.get(nindex).indexOf("redo")!=-1)
        {
           var arr= record.get(nindex).split(" ");
           let str="";
           for(let i=0;i<arr.length-1;i++)
           {
            str+=arr[i]+" ";
           }
           str+="undo";
           record.set(nindex,str);
        }
        else{
        record.set(nindex,record.get(nindex)+" undo");
        }
    nindex--;
    }
    
    //console.log(nindex);
}
    function redo()
    {
       
        var nowstate=record.get(nindex);
        var nextstate;
        var item;
       if(nindex+1<record.size)
        {
            nextstate=record.get(nindex+1);
            item=nextstate.split(" ")[0];
        }
        else{
            return;
        }
        
        if(nextstate.indexOf("redo")!=-1)
        {
            return;
        }
        else{
        
          if(nextstate.indexOf("add")!=-1)
         {   
            
             
             undoDelete(false,nextstate);
         }
         else if(nextstate.indexOf("check visible")!=-1)
         {
             
             document.getElementById(item).children[1].style.visibility="visible";
         }
         else if(nextstate.indexOf("check hidden")!=-1)
         {
            
             document.getElementById(item).children[1].style.visibility="hidden";
         }
         else if(nextstate.indexOf("delete visible")!=-1)
         {      
             
             document.getElementById("todo_list").removeChild(document.getElementById(item));
         }
         else if(nextstate.indexOf("delete hidden")!=-1)
         {   
            
            document.getElementById("todo_list").removeChild(document.getElementById(item));
         }
         if(nextstate.indexOf("undo")!=-1)
         {
            var arr=nextstate.split(" ");
            let str="";
            for(let i=0;i<arr.length-1;i++)
            {
             str+=arr[i]+" ";
            }
            str+="redo";
            record.set(nindex+1,str);
         }
         else{
         record.set(nindex+1,record.get(nindex+1)+" redo");
         }
     nindex++;
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
    console.log("you press crtl+Y");
    
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
// fullfill delete action for the delete icon
function delete_action()
{
var closes=document.getElementsByClassName("delete");
for(let i=0;i<closes.length;i++)
    {
    closes[i].onclick=function()
        {
        var liparent=this.parentElement;
        //liparent.style.display="none";
        var ulparent=liparent.parentElement;
            //console.log(closes[i].nextSibling);
        if(liparent.children[1].style.visibility==="visible")
       {
       
        record.set(index,liparent.id+" delete visible "+liparent.childNodes[0].nodeValue);
        countindex();
        //innerText XX
       } 
       else{
        
        record.set(index,liparent.id+" delete hidden "+liparent.childNodes[0].nodeValue);
        countindex();
       }
        ulparent.removeChild(liparent);    
        }
    }
}

// fullfill the action of select on the li tag
function check_action()
{
    var lis=document.getElementsByTagName("li");

for(let i=0;i<lis.length;i++)
{   
    
    lis[i].onclick=function(){
        
        if(lis[i]===undefined)
        {
          return;
        } // console.log(lis[i].children[1].style.visibility);
       
       else{
        if(lis[i].getElementsByClassName("check")[0].style.visibility==="hidden")
            {   
                
                this.getElementsByClassName("check")[0].style.visibility="visible";
                
                record.set(index,this.id+" check visible");
                countindex();
               
            }
            else if(lis[i].getElementsByClassName("check")[0].style.visibility==="visible")
            {
                this.getElementsByClassName("check")[0].style.visibility="hidden";
               
                record.set(index,this.id+" check hidden");
                console.log(record);
                countindex();
            }
            
       }
    }

}
}


//add a new to do item for the to do item list
function Addaction()
{
    var inputtxt=document.getElementById("input_txt").value;
    if(inputtxt.trim()=="")
    {alert("Please input value first!"); return;}
   
   var newto_do= document.getElementById("todo_list");
   var li=document.createElement("li");
   li.innerHTML=inputtxt;
   li.setAttribute("id","todo_item"+id);
   document.getElementById("input_txt").value="";
   
   newto_do.appendChild(li);

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
      
    
    record.set(index,"todo_item"+id+" add ");
    countindex();
    id++;
  
}


function undoDelete(flag,nowstate)
{   
    let now=nowstate;
    var newto_do= document.getElementById("todo_list");
    var li=document.createElement("li");
   //console.log(nowstate);
   li.innerHTML=nowstate.split(" ")[3];
   //console.log(nowstate.split(" ")[0]);
   li.setAttribute("id",nowstate.split(" ")[0]);
   document.getElementById("input_txt").value="";

   
   let delete_index=nowstate.split(" ")[0].split("m")[1]; // delete node id 
   //console.log(delete_index);
   //console.log(delete_index);
   if(document.getElementsByTagName("li").length===0)
   {    
       
       newto_do.appendChild(li);
   }
   else{
       var lis= document.getElementsByTagName("li");
        //  1 2 3 4 5 6  7 8 
        //  1 2  5 6 7 8
        // 1 2 3 4 
        // 1 2 3
       var insert_index=lis[0];
       
       if(delete_index>lis[lis.length-1].id.split(" ")[0].split("m")[1])
        {           
            
               document.getElementById("todo_list").insertBefore(li,lis[lis.length-1].nextSibling);          
        }

       for(let i=0;i<lis.length;i++)
       {    
           var item_id=lis[i].id.split(" ")[0].split("m")[1];
           
           if((delete_index-item_id)<0)
           {    
              
                   document.getElementById("todo_list").insertBefore(li,lis[i]);
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
    var closes=document.getElementsByClassName("delete");
    check_action();
    delete_action();
}
// now  prev next 

