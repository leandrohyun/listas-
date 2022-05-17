/*
No jogo as listas ligadas ordenadas seguirão o mesmo padrão anterior,
 porém nesse caso, a lista será ordenada de acordo com a quantidade 
 de moradores em cada prédio. 
 */
 class LinkedList {
    constructor(equalsFn = defaultEquals) {
      this.equalsFn = equalsFn;
      this.count = 0;
      this.head = undefined;
    }
    }
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
  };
  
 function defaultCompare(a, b) {
    if (a === b) {
      return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
  }
  
  function defaultEquals(a, b) {
    return a === b;
  }

 class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn);
    this.equalsFn = equalsFn;
    this.compareFn = compareFn;
  }
  push(element) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }
  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super.insert(element, index === 0 ? index : 0);
    }
    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element, pos);
  }
  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
  isEmpty() {
    return this.count === 0;
  }
  size() {
    return this.count;
  }
}


const list = new SortedLinkedList();

//push
list.push(12);
list.push(30);
list.push(23);
list.push(10);
list.push(27);
console.log(list);

//Insert

list.insert (200, 1);
console.log(list);
