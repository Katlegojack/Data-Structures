const order=[1,2,4,5,3,6,7];

const preorderCode=`void preorder(Node *root) {
    if (root == NULL) return;

    cout << root->data << " ";
    preorder(root->left);
    preorder(root->right);
}`;

let index=0;
let timer=null;

function clearTimer(){
  if(timer){
    clearInterval(timer);
    timer=null;
  }
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
    document.getElementById("message").textContent=
      "Preorder traversal complete: "+order.join(" → ");
    return;
  }

  const value=order[index];
  index++;
  renderState();

  document.getElementById("message").textContent=
    "Visited node "+value+". Current preorder: "+order.slice(0,index).join(" → ");
}

function runTraversal(){
  clearTimer();

  if(index>=order.length){
    resetTraversal();
  }

  timer=setInterval(()=>{
    if(index>=order.length){
      clearTimer();
      document.getElementById("message").textContent=
        "Preorder traversal complete: "+order.join(" → ");
      return;
    }

    nextStep();
  },650);
}

function resetTraversal(){
  clearTimer();
  index=0;
  renderState();
  document.getElementById("message").textContent=
    "Press Next Step or Run Preorder.";
}

document.getElementById("modeLabel").textContent=
  "Preorder · Root → Left → Right";
document.getElementById("codePanel").textContent=preorderCode;
resetTraversal();