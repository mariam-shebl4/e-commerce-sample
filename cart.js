let label = document.getElementById("label");
let shoppingCart = document.getElementById("shoping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];



// TODO calculat the prise of all products quntity & write it in the cart icon in the nav bar
let calculation = () => {
    // console.log("run");
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation();

//!------------------------------
// ?condition
// TODO if the cart empty output massage & if there is an item show it
let generateCartItem = () => { 
    if (basket.length !==0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let { id, item } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            let { img, name, desc, price } = search;
            return `
            
            <div class="cart-item">
                 <i onclick="removeItem(${id})" class="fa-solid fa-xmark close"></i>
                <div class="cart-item-left">
                    <img src="${img}" width="223px" height="223px">
                </div>
                <div class="cart-item-right">
                    <h2>${name}</h2>
                    <p>${desc}</p>
                    <div class="cart-btns">
                        <div class="button">
                            <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                            <div class="quntity" id="${id}">${item}</div>
                            <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                        </div>
                    </div>

                    <b>price: <span>${price}$</span></b><hr>
                    <b>total: ${item * price}$</b>
                </div>
            </div>
            ;`
        }).join(""));
    } else {
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>cart is Empty</h2>
            <a href="index.html">
                Back to Home
            </a>
        `;
    }
};

generateCartItem();

//!------------------------------

// TODO to icrease or decreas and update quantity
// * add
let increment = (id) => {
  let  selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
     
    if (search === undefined) {
      basket.push({
        id:selectedItem.id,
        item : 1,
    });
    } else {
        search.item += 1;
    }
    
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItem();
    update(selectedItem.id);
};
// !end
//!------------------------------

// * decrease
let decrement = (id) => {
        selectedItem = id;
let search = basket.find((x) => x.id ===selectedItem.id);
     if (search === undefined) return;
    else if (search.item === 0)  return;
     else {
        search.item -= 1;
    }

    update(selectedItem.id);  
    basket = basket.filter((x) => x.item !== 0);
    generateCartItem();
    localStorage.setItem("data", JSON.stringify(basket));

};
// !end
//!------------------------------

// * update
let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

// !end
//!------------------------------


// TODO remove prouduct when click on the x button

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItem();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));

};
//!------------------------------

// TODO clear all products from the cart
let clearCart = () => {
    basket = [];
    generateCartItem();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));

}
//!------------------------------

// TODO get the total price of all products

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let { item, id } = x;
            let search = shopItemsData.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
        <h2>Total Bill : ${amount} $</h2>
        <div class="label-btns">
            <button class="checkout">Check out</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>


        </div>

        `;
    } else return;
}

totalAmount();
//!------------------------------
