'use strict'

import { Tree } from "./binarytree.js"
import { generateArray } from "./binarytree.js"

let array = generateArray(30, 100)
let tree = new Tree()

tree.buildTree(array)
console.log('Tree is balanced', tree.isBalanced())
console.log('Level-Order Traversal', tree.levelOrder(node => console.log(node.data)))
console.log('Pre-Order Traversal', tree.preOrder(node => console.log(node.data)))
console.log('In-Order Traversal', tree.inOrder(node => console.log(node.data)))
console.log('Post-Order Traversal', tree.postOrder(node => console.log(node.data)))
console.log('Unbalancing the tree', [150, 200, 250].forEach(num => tree.insert(num)))
console.log('Is Tree Balanced?', tree.isBalanced())
console.log('Rebalancing tree', tree.rebalance())
console.log('Is tree Balanced?', tree.isBalanced())
console.log('Level-Order Traversal', tree.levelOrder(node => console.log(node.data)))
console.log('Pre-Order Traversal', tree.preOrder(node => console.log(node.data)))
console.log('In-Order Traversal', tree.inOrder(node => console.log(node.data)))
console.log('Post-Order Traversal', tree.postOrder(node => console.log(node.data)))
