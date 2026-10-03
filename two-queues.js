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
  if(!el) return;

  el.innerHTML="";

  if(!values.length){
    el.innerHTML =
      '<div class="null-state">' +
        '<div class="null-pointer"><span>FRONT</span><span class="down">↓</span><span class="null-word">NULL</span></div>' +
        '<div class="null-pointer"><span>REAR</span><span class="down">↓</span><span class="null-word">NULL</span></div>' +
      '</div>';
    return;
  }

  values.forEach((value,index)=>{
    const node=document.createElement("div");
    node.className=`node node--${cls}`;
    node.textContent=value;

    if(index===0){
      const marker=document.createElement("span");
      marker.className="marker marker--front";
      marker.textContent="FRONT";
      node.appendChild(marker);
    }

    if(index===values.length-1){
      const marker=document.createElement("span");
      marker.className="marker marker--rear";
      marker.textContent="REAR";
      node.appendChild(marker);

      const nullLink=document.createElement("span");
      nullLink.className="null-link";
      nullLink.textContent="NULL";
      node.appendChild(nullLink);
    }

    el.appendChild(node);
  });
}

function render(){
  renderQueue("priorityQueue",priorityQueue,"priority");
  renderQueue("generalQueue",generalQueue,"general");
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

  if(raw===""){
    setMessage("Enter a node value first.");
    input.focus();
    return;
  }

  const value=Number(raw);

  if(type.value==="0"){
    const wasEmpty=priorityQueue.length===0;
    priorityQueue.push(value);

    setMessage(
      wasEmpty
        ? `${value} starts the priority queue. Priority Front and Priority Rear both point to this node.`
        : `${value} is linked after the old Priority Rear. Priority Rear now moves to ${value}.`
    );
  }else{
    const wasEmpty=generalQueue.length===0;
    generalQueue.push(value);

    setMessage(
      wasEmpty
        ? `${value} starts the general queue. General Front and General Rear both point to this node.`
        : `${value} is linked after the old General Rear. General Rear now moves to ${value}.`
    );
  }

  input.value="";
  setCode(enqueueCode);
  render();
  input.focus();
}

function dequeue(){
  setCode(dequeueCode);

  if(priorityQueue.length){
    const removed=priorityQueue.shift();

    setMessage(
      priorityQueue.length
        ? `Priority is not empty, so ${removed} leaves first. Priority Front moves to ${priorityQueue[0]}.`
        : `Removed priority node ${removed}. The priority queue is now empty, so Priority Front and Priority Rear become NULL.`
    );
  }else if(generalQueue.length){
    const removed=generalQueue.shift();

    setMessage(
      generalQueue.length
        ? `Priority is empty, so general node ${removed} leaves. General Front moves to ${generalQueue[0]}.`
        : `Priority is empty, so general node ${removed} leaves. The general queue is now empty, so General Front and General Rear become NULL.`
    );
  }else{
    setMessage("Both queues are empty. There is nothing to dequeue.");
  }

  render();
}

function loadExample(){
  priorityQueue=[2,7,9,91];
  generalQueue=[3,17];
  setCode(enqueueCode);
  setMessage("Example loaded. Dequeue repeatedly to see every priority node leave before the general queue starts moving.");
  render();
}

function resetQueue(){
  priorityQueue=[];
  generalQueue=[];
  setCode(enqueueCode);
  setMessage("Both queues were reset. Priority Front, Priority Rear, General Front, and General Rear are NULL.");
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