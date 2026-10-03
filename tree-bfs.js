const tree={
  1:[2,3],
  2:[4,5],
  3:[6,7],
  4:[],
  5:[],
  6:[],
  7:[]
};

const bfsCode=`void bfs(Node *root) {
    if (root == NULL) return;

    queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        Node *current = q.front();
        q.pop();

        cout << current->data << " ";

        if (current->left != NULL)
            q.push(current->left);

        if (current->right != NULL)
            q.push(current->right);
    }
}`;

let queue=[];
let visited=[];
let current=null;
let timer=null;

function clearTimer(){
  if(timer){clearInterval(timer);timer=null;}
}

function render(){
  document.querySelectorAll(".tree-node").forEach(node=>{
    const value=Number(node.dataset.node);
    node.classList.toggle("visited",visited.includes(value));
    node.classList.toggle("current",value===current);
  });

  const orderView=document.getElementById("visitOrder");
  orderView.innerHTML=visited.length
    ? visited.map((value,i)=>'<span class="visit-chip '+(i===visited.length-1?'current':'')+'">'+value+'</span>').join("")
    : '<span class="empty-text">No nodes visited yet.</span>';

  const queueView=document.getElementById("queueView");
  queueView.innerHTML=queue.length
    ? queue.map(value=>'<span class="queue-item">'+value+'</span>').join("")
    : '<span class="queue-empty">Queue is empty</span>';
}

function nextStep(){
  clearTimer();

  if(queue.length===0){
    current=null;
    render();
    document.getElementById("message").textContent=
      visited.length===7 ? "BFS complete: "+visited.join(" → ") : "The queue is empty.";
    return;
  }

  current=queue.shift();
  visited.push(current);

  const children=tree[current];
  children.forEach(child=>queue.push(child));

  render();

  const childText=children.length
    ? " Enqueued children: "+children.join(", ")+"."
    : " This node has no children.";

  document.getElementById("message").textContent=
    "Visited "+current+"."+childText+" Queue: "+(queue.length?queue.join(" → "):"empty");
}

function runTraversal(){
  clearTimer();
  if(visited.length===7) resetTraversal();

  timer=setInterval(()=>{
    if(queue.length===0){
      clearTimer();
      current=null;
      render();
      document.getElementById("message").textContent="BFS complete: "+visited.join(" → ");
      return;
    }
    nextStep();
  },650);
}

function resetTraversal(){
  clearTimer();
  queue=[1];
  visited=[];
  current=null;
  render();
  document.getElementById("message").textContent="The queue starts with the root node 1.";
}

document.getElementById("codePanel").textContent=bfsCode;
resetTraversal();