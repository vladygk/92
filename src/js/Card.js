import classNames from "classnames";
import EventEmitter from "eventemitter3";
import Notification from "./Notification";
export default class Card extends EventEmitter {
  static get events() {
    return {
      ADD_TO_CART: "add_to_cart",
    };
  }

  static get types() {
    return {
      PEPPERONI: "pepperoni",
      MARGHERITA: "margherita",
      HAWAIIAN: "hawaiian",
    };
  }

  constructor({ type, price }) {
    super();

    this._type = type;
    this._price = price;
    
    this.container = document.createElement("div");
    this.container.classList.add("card-container");
    this.container.addEventListener("click",(event)=>{
      const note =new Notification(type,price);
      note.render({type,price});
     
      document.querySelector(".notifications").appendChild(note.container);
      
      const dels = document.querySelectorAll(".delete");

      dels.forEach(x=>x.addEventListener("click",(event)=>{
     event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);

      }))
     
      
    });
    
  }
  
  render() {
    const template = `
<div class="card type-${this._type} ${classNames({
      "is-danger": this._type === Card.types.HAWAIIAN,
    })}">
  <div class="emoji">🍕</div>
  <span class="type">${this._type}</span>
</div>
    `;

    this.container.innerHTML = template;
    this.container.addEventListener("click", () => {
      this.emit(Card.events.ADD_TO_CART, {
        type: this._type,
        price: this._price,
      });
    });
  }
}
