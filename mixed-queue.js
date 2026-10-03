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
  if(!el) return;

  el.innerHTML="";

  if(!queue.length){
    el.innerHTML='<span class="empty">Queue is empty</span>';
    return;
  }

  const lastPriority=lastPriorityIndex();

  queue.forEach((item,index)=>{
    const node=document.createElement("div");
    node.className=`node node--${item.prior===0 ? "priority" : "general"}`;
    node.textContent=item.value;

    if(index===0){
      const marker=document.createElement("span");
      marker.className="marker marker--front";
      marker.textContent="FRONT";
      node.appendChild(marker);
    }

    if(index===queue.length-1){
      const marker=document.createElement("span");
      marker.className="marker marker--rear";
      marker.textContent="REAR";
      node.appendChild(marker);
    }

    if(index===lastPriority){
      const marker=document.createElement("span");
      marker.className="marker marker--last";
      marker.textContent="lastPriority";
      node.appendChild(marker);
    }

    el.appendChild(node);
  });
}

function setMessage(text){
  const el=document.getElementById("message");
  if(!el) return;

  el.textContent=text;
  el.classList.remove("is-updated");
  void el.offsetWidth;
  el.classList.add("is-updated");
}

function setCode(code){
  const panel=document.getElementById("codePanel");
  if(panel) panel.textContent=code;
}

function enqueue(){
  const input=document.getElementById("value");
  const type=document.getElementById("type");

  if(!input || !type) return;

  const raw=input.value.trim();
  const prior=Number(type.value);

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
    const lastPriority=lastPriorityIndex();

    if(lastPriority===-1){
      queue.unshift({value,prior});
      setMessage(
        `No priority nodes existed, so ${value} is inserted at Front and becomes lastPriority. Rear stays where it was.`
      );
    }else{
      const insertedAtEnd=lastPriority===queue.length-1;
      queue.splice(lastPriority+1,0,{value,prior});

      setMessage(
        insertedAtEnd
          ? `${value} is inserted after lastPriority. That position was the physical end, so Rear also moves to ${value}.`
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
  setCode(enqueueCode);
  render();
  input.focus();
}

function dequeue(){
  setCode(dequeueCode);

  if(!queue.length){
    setMessage("The queue is empty. There is nothing to dequeue.");
    return;
  }

  const removed=queue.shift();
  const lastPriority=lastPriorityIndex();

  if(!queue.length){
    setMessage(
      `Removed ${removed.value}. The list is now empty, so Front, Rear, and lastPriority are all NULL.`
    );
  }else if(removed.prior===0 && lastPriority===-1){
    setMessage(
      `Removed priority node ${removed.value}. No priority nodes remain, so lastPriority becomes NULL. Front moves to ${queue[0].value}.`
    );
  }else{
    setMessage(
      `Removed ${removed.value} from Front. Front now points to ${queue[0].value}.`
    );
  }

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

  setCode(enqueueCode);
  setMessage("Example loaded. lastPriority points to 91 while Rear points to 17.");
  render();
}

function resetQueue(){
  queue=[];
  setCode(enqueueCode);
  setMessage("Queue reset. Front, Rear, and lastPriority are NULL.");
  render();

  const input=document.getElementById("value");
  if(input) input.focus();
}

const valueInput=document.getElementById("value");
if(valueInput){
  valueInput.addEventListener("keydown",event=>{
    if(event.key==="Enter") enqueue();
  });
}

setCode(enqueueCode);
render();