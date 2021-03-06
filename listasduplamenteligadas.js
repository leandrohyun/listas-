/*
No cities skylines as listas ligadas serão utilizadas para gerenciar
 os prédios em uma avenida entre dois cruzamentos já que por ter duas 
 entradas e saídas nesse local da avenida a contagem da lista pode começar 
 por qualquer lado.
 */
function defaultEquals(a, b) {
    return a === b;
  }
  
class Node {
    constructor(element, next) {
      this.element = element;
      this.next = next;
    }
  }
  
class DoublyNode extends Node {
    constructor(element, next, prev) {
      super(element, next);
      this.prev = prev;
    }
  }
class LinkedList {
    constructor(equalsFn = defaultEquals) {
      this.equalsFn = equalsFn;
      this.count = 0;
      this.head = undefined;
    }
}
class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
      super(equalsFn);
      this.tail = undefined;
    }
    push(element) {
      const node = new DoublyNode(element);
      if (this.head == null) {
        this.head = node;
        this.tail = node; // NEW
      } else {
        // attach to the tail node // NEW
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }
      this.count++;
    }
    insert(element, index) {
      if (index >= 0 && index <= this.count) {
        const node = new DoublyNode(element);
        let current = this.head;
        if (index === 0) {
          if (this.head == null) { // NEW
            this.head = node;
            this.tail = node; // NEW
          } else {
            node.next = this.head;
            this.head.prev = node; // NEW
            this.head = node;
          }
        } else if (index === this.count) { // last item NEW
          current = this.tail;
          current.next = node;
          node.prev = current;
          this.tail = node;
        } else {
          const previous = this.getElementAt(index - 1);
          current = previous.next;
          node.next = current;
          previous.next = node;
          current.prev = node; // NEW
          node.prev = previous; // NEW
        }
        this.count++;
        return true;
      }
      return false;
    }
    removeAt(index) {
      if (index >= 0 && index < this.count) {
        let current = this.head;
        if (index === 0) {
          this.head = this.head.next;
          // if there is only one item, then we update tail as well //NEW
          if (this.count === 1) {
            // {2}
            this.tail = undefined;
          } else {
            this.head.prev = undefined;
          }
        } else if (index === this.count - 1) {
          // last item //NEW
          current = this.tail;
          this.tail = current.prev;
          this.tail.next = undefined;
        } else {
          current = this.getElementAt(index);
          const previous = current.prev;
          // link previous with current's next - skip it to remove
          previous.next = current.next;
          current.next.prev = previous; // NEW
        }
        this.count--;
        return current.element;
      }
      return undefined;
    }
    indexOf(element) {
      let current = this.head;
      let index = 0;
      while (current != null) {
        if (this.equalsFn(element, current.element)) {
          return index;
        }
        index++;
        current = current.next;
      }
      return -1;
    }

    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
          let node = this.head;
          for (let i = 0; i < index && node != null; i++) {
            node = node.next;
          }
          return node;
        }
        return undefined;
      }
    getHead() {
      return this.head;
    }
    getTail() {
      return this.tail;
    }
    clear() {
      super.clear();
      this.tail = undefined;
    }
    toString() {
      if (this.head == null) {
        return '';
      }
      let objString = `${this.head.element}`;
      let current = this.head.next;
      while (current != null) {
        objString = `${objString},${current.element}`;
        current = current.next;
      }
      return objString;
    }
    inverseToString() {
      if (this.tail == null) {
        return '';
      }
      let objString = `${this.tail.element}`;
      let previous = this.tail.prev;
      while (previous != null) {
        objString = `${objString},${previous.element}`;
        previous = previous.prev;
      }
      return objString;
    }
  }

  const list = new DoublyLinkedList();
  list.push("Hospital");
  list.push("Estação de Metrô");
  list.push("Prefeitura");
  list.push("Prédio Residencial");
  console.log(list);

  list.insert("Delegacia", 2);
  console.log(list);

  list.removeAt (1);
  console.log(list);

  console.log(list.indexOf ("Prefeitura"));
  
