const traversals={
  preorder:[1,2,4,5,3,6,7],
  inorder:[4,2,5,1,6,3,7],
  postorder:[4,5,2,6,7,3,1]
};

const labels={
  preorder:"Preorder · Root → Left → Right",
  inorder:"Inorder · Left → Root → Right",
  postorder:"Postorder · Left → Right → Root"
};

const code={
  preorder:`void preorder(Node *root) {
    if (root == NULL) return;

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}`,
  inorder:`void inorder(Node *root) {
    if (root == NULL) return;

    inorder(root->left);
    cout << root->data << " ";
    inorder(root->right);
}`,
  postorder:`void postorder(Node *root) {
    if (root == NULL) return;

    postorder(root->left);
    postorder(root->right);
    cout << root->data << " ";
}`
};

let order=[];
let index=0;
let timer=null;

function clearTimer(){
  if(timer){clearInterval(timer);timer=null;}
}

function currentType(){
  return document.getElementById("dfsType").value;
}

function prepare(){
  const type=currentType();
  order=traversals[type].slice();
  index=0;
  document.getElementById("modeLabel").textContent=labels[type];
  document.getElementById("codePanel").textContent=code[type];
  renderState();
}

function renderState(){
  document.querySelectorAll(".tree-node").forEach(node=>{
    node.classList.remove("visited","current");
    const value=Number(node.dataset.node);
    const pos=order.indexOf(value);
    if(pos>=0 && pos<index) node.classList.add("visited");
    if(pos===index-1 && index>0) node.classList.add("current");
  });

  const view=document.getElementById("visitOrder");
  if(index===0){
    view.innerHTML='<span class="empty-text">No nodes visited yet.</span>';
  }else{
    view.innerHTML=order.slice(0,index).map((value,i)=>
      '<span class="visit-chip '+(i===index-1?'current':'')+'">'+value+'</span>'
    ).join("");
  }
}

function nextStep(){
  clearTimer();
  if(index>=order.length){
    document.getElementById("message").textContent="Traversal complete.";
    return;
  }

  const value=order[index];
  index++;
  renderState();
  document.getElementById("message").textContent=
    "Visited node "+value+". Current order: "+order.slice(0,index).join(" → ");
}

function runTraversal(){
  clearTimer();
  if(index>=order.length) resetTraversal();

  timer=setInterval(()=>{
    if(index>=order.length){
      clearTimer();
      document.getElementById("message").textContent=
        "Traversal complete: "+order.join(" → ");
      return;
    }
    nextStep();
  },650);
}

function resetTraversal(){
  clearTimer();
  index=0;
  renderState();
  document.getElementById("message").textContent="Press Next Step or Run Traversal.";
}

document.getElementById("dfsType").addEventListener("change",()=>{
  clearTimer();
  prepare();
  document.getElementById("message").textContent="Traversal changed. Start from the root again.";
});

prepare();