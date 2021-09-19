import { CharacterCollection } from './CharacterCollection';
import { NumberCollection } from './NumberCollection';
import {Sorter} from './Sorter';
import {LinkedList} from'./LinkedList';

// const collection = new NumberCollection([100, 5, -3, 4]);
// const charCollection = new CharacterCollection('aayZ');

// const sorterChar = new Sorter(charCollection);
// // sorter.sort();
// sorterChar.sort();
// console.log(sorterChar);

const linkedList = new LinkedList();
linkedList.append(5);
linkedList.append(4);
linkedList.append(45);
linkedList.append(7);
linkedList.append(6);

linkedList.sort();
linkedList.print();