const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      let current = this.rootNode;
      while (true) {
        if (data < current.data) {
          if (current.left === null) {
            current.left = newNode;
            break;
          }
          current = current.left;
        } else {
          if (current.right === null) {
            current.right = newNode;
            break;
          }
          current = current.right;
        }
      }
    }
  }

  has(data) {
    let current = this.rootNode;
    while (current !== null) {
      if (data === current.data) return true;
      current = data < current.data ? current.left : current.right;
    }
    return false;
  }

  find(data) {
    let current = this.rootNode;
    while (current !== null) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) return null;
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        let minNode = node.right;
        while (minNode.left !== null) {
          minNode = minNode.left;
        }
        node.data = minNode.data;
        node.right = removeNode(node.right, minNode.data);
        return node;
      }
    };
    this.rootNode = removeNode(this.rootNode, data);
  }

  min() {
    if (this.rootNode === null) return null;
    let current = this.rootNode;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.rootNode;
    if (current === null) return null;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};