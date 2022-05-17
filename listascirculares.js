/*
No jogo existe uma ferramenta chamada “zoneamento”, onde é possível destinar certo 
local para determinadas construções, sendo ela residencial, comercial e industrial
podendo ser de alta ou baixa demanda.
As listas circulares serão usadas para armazenar os prédios de um quarteirão que seja
do mesmo zoneamento.
*/
class Node {
    constructor(element, next) {
      this.element = element;
      this.next = next;
    }
  }
  function defaultEquals(a, b) {
    return a === b;
  }

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn;
    this.count = 0;
    this.head = undefined;
  }
}
class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
      super(equalsFn);
    }

    isEmpty() {
      return this.count === 0;
    }
    size() {
      return this.count;
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
    push(element) {
      const node = new Node(element);
      let current;
      if (this.head == null) {
        this.head = node;
      } else {
        current = this.getElementAt(this.size() - 1);
        current.next = node;
      }
      // set node.next to head - to have circular list
      node.next = this.head;
      this.count++;
    }
    insert(element, index) {
      if (index >= 0 && index <= this.count) {
        const node = new Node(element);
        let current = this.head;
        if (index === 0) {
          if (this.head == null) {
            // if no node  in list
            this.head = node;
            node.next = this.head;
          } else {
            node.next = current;
            current = this.getElementAt(this.size());
            // update last element
            this.head = node;
            current.next = this.head;
          }
        } else {
          const previous = this.getElementAt(index - 1);
          node.next = previous.next;
          previous.next = node;
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
          if (this.size() === 1) {
            this.head = undefined;
          } else {
            const removed = this.head;
            current = this.getElementAt(this.size() - 1);
            this.head = this.head.next;
            current.next = this.head;
            current = removed;
          }
        } else {
          // no need to update last element for circular list
          const previous = this.getElementAt(index - 1);
          current = previous.next;
          previous.next = current.next;
        }
        this.count--;
        return current.element;
      }
      return undefined;
    }
  }


//push
  const list = new CircularLinkedList();
    list.push("Prédio 1");
    list.push("Prédio 2");
    list.push("Prédio 3");
    list.push("Prédio 4");
    list.push("Prédio 5");
    console.log (list);

//Insert

    list.insert ("Delegacia", 1);
    console.log (list);

//RemoveAt
    list.removeAt (2);
    console.log (list);
