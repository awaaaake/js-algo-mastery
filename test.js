class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right=null;
    }
}

function inorderTraversal(node, result = []) {//중위
    if(!node) return;
    inorderTraversal(node.left, result);
    result.push(node.value);
    inorderTraversal(node.right, result);
    return result;
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(6);
root.right.right = new TreeNode(5);

console.log('중위순회 :', inorderTraversal(root))