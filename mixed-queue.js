let queue=[];

const enqueueCode=`void enqueue(int key, int prior) {
    newNode = new Node;
    newNode->data = key;
    newNode->next = NULL;

    if (head->next == NULL) {
        head->next = newNode;
        Front = newNode;
        Rear = newNode;

        if (prior == 0)
            lastPriority = newNode;
        else
            lastPriority = NULL;
    }
    else if (prior == 0) {
        if (lastPriority == NULL) {
            newNode->next = head->next;
            head->next = newNode;
            Front = newNode;
            lastPriority = newNode;
        }
        else {
            newNode->next = lastPriority->next;
            lastPriority->next = newNode;
            lastPriority = newNode;

            if (newNode->next == NULL)
                Rear = newNode;
        }
    }
    else {
        Rear->next = newNode;
        Rear = newNode;
    }
}`;

const dequeueCode=`void dequeue() {
    if (Front == NULL)
        return;

    Node *temp = Front;

    if (Front == lastPriority)
        lastPriority = NULL;

    Front = Front->next;
    head->next = Front;

    if (Front == NULL)
        Rear = NULL;

    delete temp;
}`;

function lastPriorityIndex(){
  let index=-1;
  for(let i=0;i<queue.length;i++){
    if(queue[i].prior===0) index=i;
  }
  return index;
}

function render(){
  const el=document.getElementById("mixedQueue");
  el.innerHTML="";

  if(!queue.length){
    el.innerHTML='<span class="empty">Queue is empty</span>';
    return;
  }

  const lp=lastPriorityIndex();

  queue.forEach((item,index)=>{
    const node=document.createElement("div");
    node.className=`node node--${item.prior===0 ? "priority" : "general"}`;
    node.textContent=item.value;

    if(index===0){
      const m=document.createElement("span");
      m.className="marker marker--front";
      m.textContent="FRONT";
      node.appendChild(m);
    }

    if(index===queue.length-1){
      const m=document.createElement("span");
      m.className="marker marker--rear";
      m.textContent="REAR";
      node.appendChild(m);
    }

    if(index===lp){
      const m=document.createElement("span");
      m.className="marker marker--last";
      m.textContent="lastPriority";
      node.appendChild(m);
    }

    el.appendChild(node);
  });
}

function setMessage(text){document.getElementById("message").textContent=text;}

function enqueue(){
  const input=document.getElementById("value");
  const raw=input.value.trim();
  const prior=Number(document.getElementById("type").value);

  if(raw===""){
    setMessage("Enter a node value first.");
    input.focus();
    return;
  }

  const value=Number(raw);

  if(queue.length===0){
    queue.push({value,prior});
    setMessage(
      prior===0
        ? `${value} is the first node. Front, Rear, and lastPriority all point to it.`
        : `${value} is the first general node. Front and Rear point to it, while lastPriority stays NULL.`
    );
  }
  else if(prior===0){
    const lp=lastPriorityIndex();

    if(lp===-1){
      queue.unshift({value,prior});
      setMessage(
        `No priority nodes existed, so ${value} is inserted at Front and becomes lastPriority. Rear stays where it was.`
      );
    }else{
      const insertedAtEnd=lp===queue.length-1;
      queue.splice(lp+1,0,{value,prior});

      setMessage(
        insertedAtEnd
          ? `${value} is inserted after lastPriority. Because that position was the end of the list, Rear also moves to ${value}.`
          : `${value} is inserted after lastPriority and before the general section. Rear does not move because the physical last node did not change.`
      );
    }
  }
  else{
    queue.push({value,prior});
    setMessage(
      `${value} is a general node, so it is appended at the physical end of the list. Rear moves to ${value}.`
    );
  }

  input.value="";
  document.getElementById("codePanel").textContent=enqueueCode;
  render();
}

function dequeue(){
  if(!queue.length){
    setMessage("The queue is empty. There is nothing to dequeue.");
    return;
  }

  const removed=queue.shift();
  const lp=lastPriorityIndex();

  if(!queue.length){
    setMessage(
      `Removed ${removed.value}. The list is now empty, so Front, Rear, and lastPriority are all NULL.`
    );
  }else if(removed.prior===0 && lp===-1){
    setMessage(
      `Removed priority node ${removed.value}. No priority nodes remain, so lastPriority becomes NULL. Front moves to ${queue[0].value}.`
    );
  }else{
    setMessage(
      `Removed ${removed.value} from Front. Front now points to ${queue[0].value}.`
    );
  }

  document.getElementById("codePanel").textContent=dequeueCode;
  render();
}

function loadExample(){
  queue=[
    {value:2,prior:0},
    {value:7,prior:0},
    {value:9,prior:0},
    {value:91,prior:0},
    {value:3,prior:1},
    {value:17,prior:1}
  ];
  setMessage("Example loaded. lastPriority marks 91, while Rear stays on 17.");
  render();
}

function resetQueue(){
  queue=[];
  setMessage("Queue reset. Front, Rear, and lastPriority are NULL.");
  document.getElementById("codePanel").textContent=enqueueCode;
  render();
}

document.getElementById("codePanel").textContent=enqueueCode;
render();