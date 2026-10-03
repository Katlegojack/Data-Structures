let priorityQueue=[];
let generalQueue=[];

const enqueueCode=`void enqueue(int key, int prior) {
    Node *newNode = new Node;
    newNode->data = key;
    newNode->next = NULL;

    if (prior == 0) {
        if (priorityFront == NULL) {
            priorityFront = newNode;
            priorityRear = newNode;
        } else {
            priorityRear->next = newNode;
            priorityRear = newNode;
        }
    } else {
        if (generalFront == NULL) {
            generalFront = newNode;
            generalRear = newNode;
        } else {
            generalRear->next = newNode;
            generalRear = newNode;
        }
    }
}`;

const dequeueCode=`void dequeue() {
    if (priorityFront != NULL) {
        Node *temp = priorityFront;
        priorityFront = priorityFront->next;

        if (priorityFront == NULL)
            priorityRear = NULL;

        delete temp;
    }
    else if (generalFront != NULL) {
        Node *temp = generalFront;
        generalFront = generalFront->next;

        if (generalFront == NULL)
            generalRear = NULL;

        delete temp;
    }
}`;

function renderQueue(id,values,cls){
  const el=document.getElementById(id);
  el.innerHTML="";
  if(!values.length){
    el.innerHTML='<span class="empty">Queue is empty</span>';
    return;
  }
  values.forEach((value,index)=>{
    const node=document.createElement("div");
    node.className=`node node--${cls}`;
    node.textContent=value;

    if(index===0){
      const m=document.createElement("span");
      m.className="marker marker--front";
      m.textContent="FRONT";
      node.appendChild(m);
    }
    if(index===values.length-1){
      const m=document.createElement("span");
      m.className="marker marker--rear";
      m.textContent="REAR";
      node.appendChild(m);
    }
    el.appendChild(node);
  });
}

function render(){
  renderQueue("priorityQueue",priorityQueue,"priority");
  renderQueue("generalQueue",generalQueue,"general");
}

function setMessage(text){document.getElementById("message").textContent=text;}

function enqueue(){
  const input=document.getElementById("value");
  const raw=input.value.trim();
  const type=document.getElementById("type").value;

  if(raw===""){
    setMessage("Enter a node value first.");
    input.focus();
    return;
  }

  const value=Number(raw);

  if(type==="0"){
    const wasEmpty=priorityQueue.length===0;
    priorityQueue.push(value);
    setMessage(
      wasEmpty
        ? `${value} starts the priority queue, so Priority Front and Priority Rear both point to it.`
        : `${value} is linked after the old Priority Rear. Priority Rear now points to ${value}.`
    );
  }else{
    const wasEmpty=generalQueue.length===0;
    generalQueue.push(value);
    setMessage(
      wasEmpty
        ? `${value} starts the general queue, so General Front and General Rear both point to it.`
        : `${value} is linked after the old General Rear. General Rear now points to ${value}.`
    );
  }

  input.value="";
  document.getElementById("codePanel").textContent=enqueueCode;
  render();
}

function dequeue(){
  if(priorityQueue.length){
    const removed=priorityQueue.shift();
    setMessage(
      priorityQueue.length
        ? `Priority is not empty, so ${removed} leaves first. Priority Front moves to ${priorityQueue[0]}.`
        : `Removed priority node ${removed}. The priority queue is now empty, so both priority pointers become NULL.`
    );
  }else if(generalQueue.length){
    const removed=generalQueue.shift();
    setMessage(
      generalQueue.length
        ? `Priority is empty, so general node ${removed} leaves. General Front moves to ${generalQueue[0]}.`
        : `Priority was empty, so general node ${removed} leaves. The general queue is now empty.`
    );
  }else{
    setMessage("Both queues are empty. There is nothing to dequeue.");
  }

  document.getElementById("codePanel").textContent=dequeueCode;
  render();
}

function loadExample(){
  priorityQueue=[2,7,9,91];
  generalQueue=[3,17];
  setMessage("Example loaded. Dequeue to see why all priority nodes leave before the general queue starts moving.");
  render();
}

function resetQueue(){
  priorityQueue=[];
  generalQueue=[];
  setMessage("Both queues were reset. All four queue pointers are NULL.");
  document.getElementById("codePanel").textContent=enqueueCode;
  render();
}

document.getElementById("codePanel").textContent=enqueueCode;
render();