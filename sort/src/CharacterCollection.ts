import { Sorter } from "./Sorter";

export class CharacterCollection extends Sorter {
  constructor(public data: string) {
    super();
  }
  get length(): number {
    return this.data.length;
  }

  compare(leftIndex: number, rightIndex: number) {
    return this.data[leftIndex].toLowerCase() > this.data[rightIndex]?.toLocaleLowerCase();
  }

  swap(leftIndex: number, rightIndex: number) {
    const charArr = this.data.split('');
    const leftHand = charArr[leftIndex];
    charArr[leftIndex] = charArr[rightIndex];
    charArr[rightIndex] = leftHand;

    this.data = charArr.join('');
  }
}