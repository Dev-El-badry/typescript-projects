import { Sorter } from "./Sorter";

class Cluster {
  next!: Cluster | null;

  constructor(public data: number) {}
}

export class LinkedList  extends Sorter {
  head!: Cluster;
  constructor() {
    super();
  }

  append(value: number): void {
    const node = new Cluster(value);

    if(!this.head) {
      this.head = node;
      return;
    }

    let tail = this.head;
    while(tail.next) {
      tail = tail.next;
    } 
    tail.next = node;
  }

  get length(): number {
    if(!this.head) {
      return 0;
    }
    
    let node = this.head;
    let length = 1;
    while(node.next) {
      length ++;
      node = node.next;
    }

    return length;
  }

  compare(leftIndex: number, rightIndex: number): boolean {
    return this.at(leftIndex).data > this.at(rightIndex).data;
  }

  swap(leftIndex: number, rightIndex: number): void {
    let leftNode = this.at(leftIndex);
    let rightNode = this.at(rightIndex);
    const leftHand = leftNode.data;

    leftNode.data = rightNode.data;
    rightNode.data = leftHand;
  }

  at(index: number): Cluster {
    if(!this.head) {
      throw new Error('not there index in bounds');
    }
    let counter = 0;
    let tail: Cluster | null = this.head;

    while(tail) {
      if(counter === index) {
        return tail;
      }

      counter ++;
      tail = tail.next;
    }
    
    throw new Error('not there index in bounds');
  }

  print(): void {
    if(!this.head) {
      return;
    }

    let tail: Cluster | null = this.head;
    while(tail) {
      console.log(tail.data);
      tail = tail.next;
    }
  }
}