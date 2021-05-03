// 队列：先进先出
class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(element) {
    this.queue.push(element);
    return this;
  }

  dequeue() {
    return this.queue.shift();
  }
}

const queue = new Queue();
queue.enqueue(1).enqueue(2).enqueue(3).dequeue();
console.log(queue);

// 栈：先进后出
class Stack {
  constructor() {
    this.stack = [];
  }

  put(element) {
    this.stack.push(element);
    return this;
  }

  pop() {
    return this.stack.pop();
  }
}

const stack = new Stack();
stack.put(1).put(2).put(3).pop();
console.log(stack);

// 链表：单向链表，双向链表，循环链表
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  append(element) {
    const node = new Node(element);
    if (!this.head) {
      this.head = node;
    } else {
      let index = 0;
      let current = this.head;
      while (++index < this.length) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
    return this;
  }

  insert(position, element) {
    const node = new Node(element);
    if (!this.head) {
      this.head = node;
    } else {
      let index = 0;
      let previous = null;
      let current = this.head;
      while (index++ < position) {
        previous = current;
        current = current.next;
      }
      previous.next = node;
      node.next = current;
    }
    this.length++;
    return this;
  }
}

const ll = new LinkList();
ll.append(1).append(2).append(3).insert(1, 100);
console.log(JSON.stringify(ll));

// 集合：元素不重复
class Set {
  constructor() {
    this.set = {};
  }

  add(element) {
    if (!this.set.hasOwnProperty(element)) {
      this.set[element] = element;
    }
    return this;
  }
}

const set = new Set();
set.add('a').add('b').add('a').add('c');
console.log(set);

// 哈希表
class Map {
  constructor() {
    this.arr = [];
  }

  calc(key) {
    let total = 0;
    for (let i = 0; i < key.length; i++) {
      total += key[i].charCodeAt();
    }
    return total % 100;
  }

  set(key, value) {
    key = this.calc(key);
    this.arr[key] = value;
    return this;
  }

  get(key) {
    key = this.calc(key);
    return this.arr[key];
  }
}

const map = new Map();
map.set('abc', 100).set('qwe', 200);
console.log(map.get('abc'));
console.log(map.get('qwe'));

// 二叉树
class TreeNode {
  constructor(element) {
    this.element = element;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  add(element) {
    const node = new TreeNode(element);
    if (!this.root) {
      this.root = node;
    } else {
      this.insert(this.root, node);
    }
    return this;
  }

  insert(root, newNode) {
    if (newNode.element < root.element) {
      if (root.left === null) {
        root.left = newNode;
      } else {
        this.insert(root.left, newNode);
      }
    } else {
      if (root.right === null) {
        root.right = newNode;
      } else {
        this.insert(root.right, newNode);
      }
    }
  }
}

const tree = new Tree();
tree.add(100).add(60).add(150).add(50).add(65).add(130).add(180);
console.log(JSON.stringify(tree, null, 2));
