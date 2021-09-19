import {Model} from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: {[key: string]: Element} = {};
  constructor(public parent: Element, protected model: T) {
    this.bindModel();
  }

  regionsMap(): {[key: string]: string} {
    return {};
  }

  abstract template(): string;

  eventsMap(): {[key: string]: () => void} {
    return {};
  }

  bindModel() {
    this.model.on('change', () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment) {
    const eventsMap = this.eventsMap();
    for(let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  mapRegions(fragment: DocumentFragment) {
    const regionMap = this.regionsMap();
    for(let key in regionMap) {
      const selector = regionMap[key];
      const element = fragment.querySelector(selector);
      if(element) {
        this.regions[key] = element;
      }
    }

  }

  onRender(): void {}

  render(): void {
   
    if(this.parent) {
      this.parent.innerHTML = '';
      const templateElement = document.createElement('template');
      templateElement.innerHTML = this.template();
      this.bindEvents(templateElement.content);
      this.mapRegions(templateElement.content);
      
      this.onRender(); 
      this.parent.append(templateElement.content);
    }
  }
}