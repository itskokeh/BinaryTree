'use strict'

class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor() {
    this.root = null
  }

  buildTree(array) {
    if (!array) return null
    let sortedArr = [...new Set(array)].sort((a, b) => a - b)
    console.log(sortedArr)
    this.root = this.#buildTreeFunction(sortedArr, 0, sortedArr.length - 1)
    return this.root
  }

  insert(value) {
    this.root = this.#insertFunction(this.root, value)
  }

  delete(value) {
    this.root = this.#deleteFunction(this.root, value)
  }

  find(value) {
    return this.#findFunction(this.root, value)
  }

  levelOrderRecur(callback) {
    if (typeof callback !== 'function') {
      throw new Error("A callback function is required");
    }
    let queue = [this.root]
    const traverse = () => {
      if (queue.length === 0) return
      let current = queue.shift()
      callback(current)
      if (current.left) queue.push(current.left)
      if (current.right) queue.push(current.right)
      traverse()
    }
    traverse()
  }

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error("A callback function is required");
    }
    if (!this.root) return
    let queue = [this.root]
    while (queue.length > 0) {
      let current = queue.shift()
      callback(current)
      if (current.left) queue.push(current.left)
      if (current.right) queue.push(current.right)
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
  
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);    // Left subtree
      callback(node);         // Visit node
      traverse(node.right);   // Right subtree
    };
  
    traverse(this.root);
  }
  
  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
  
    const traverse = (node) => {
      if (!node) return;
      callback(node);         // Visit node first
      traverse(node.left);    // Left subtree
      traverse(node.right);   // Right subtree
    };
  
    traverse(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function is required");
    }
  
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);    // Left subtree
      traverse(node.right);   // Right subtree
      callback(node);         // Visit node last
    };
  
    traverse(this.root);
  }  

  height(node) {
    if (!node) return -1; // Base case: height of null is -1
  
    let leftHeight = this.height(node.left);  // Get left subtree height
    let rightHeight = this.height(node.right); // Get right subtree height
  
    return Math.max(leftHeight, rightHeight) + 1; // Max of both + 1 for current node
  }
  
  depth(node, current = this.root, depthCount = 0) {
    if (!node || !current) return -1; // If node or tree is empty, return -1
  
    if (current === node) return depthCount; // Found the node, return depth
  
    if (node.data < current.data) {
      return this.depth(node, current.left, depthCount + 1); // Go left
    } else if (node.data > current.data) {
      return this.depth(node, current.right, depthCount + 1); // Go right
    }
  
    return -1; // Node not found in the tree
  }

  isBalanced(node = this.root) {
    if (!node) return true; // An empty tree is balanced
  
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
  
    let balanceFactor = Math.abs(leftHeight - rightHeight);
  
    if (balanceFactor > 1) return false; // Unbalanced tree
  
    return this.isBalanced(node.left) && this.isBalanced(node.right); // Check recursively
  }

  rebalance() {
    if (this.isBalanced()) return; // No need to rebalance if already balanced
  
    let values = [];
    this.inOrder(node => values.push(node.data)); // Get sorted values from in-order traversal
  
    this.root = this.buildTree(values); // Rebuild tree from sorted values
  }
  

  #buildTreeFunction(array, start, end) {
    if (start > end) return null
    let mid = Math.floor((start + end) / 2)
    let root = new Node(array[mid])

    root.left = this.#buildTreeFunction(array, start, mid - 1)
    root.right = this.#buildTreeFunction(array, mid + 1, end)

    return root
  }

  #insertFunction(root, value) {
    if (root === null) return new Node(value)

    if (root.data === value) return root
    if (value < root.data) {
      root.left = this.#insertFunction(root.left, value)
    } else if (value > root.data) {
      root.right = this.#insertFunction(root.right, value)
    }
    return root
  }

  #deleteFunction(root, value) {
    if (root === null) return null
    if (value < root.data) {
      root.left = this.#deleteFunction(root.left, value)
    } else if (value > root.data) {
      root.right = this.#deleteFunction(root.right, value)
    } else {
      if (!root.left && !root.right) return null
      if (!root.left) return root.right
      if (!root.right) return root.left
      let successor = this.#minValueNode(root.right)
      root.data = successor.data
      root.right = this.#deleteFunction(root.right, successor.data)
    }
    return root
  }

  #findFunction(root, value) {
    if (root === null || root.data === value) return root
    if (value < root.data) return this.#findFunction(root.left, value)
    else return this.#findFunction(root.right, value)
  }

  #minValueNode(node) {
    while (node.left !== null) {
      node = node.left
    }
    return node
  }
}

// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
// let test = new Tree()
// console.log(test.buildTree(arr))
