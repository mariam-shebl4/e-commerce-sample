let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [] ;

// TODO to post data in html file
let genrateShop =()=>{
    return (shop.innerHTML = shopItemsData.map((x) => {
        let {id, name,price, desc, img} = x; 
        let search = basket.find((x)=> x.id === id) || [];
        return`
        <div class="item" id="product-id-${id}">
                <img src="${img}" alt="" width="223px" height="223px">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                </div>
                <div class="price-qunty">
                    <h3>$ ${price}</h3>
                    <div class="button">
                        <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                        <div  class="quntity" id="${id}">${search.item === undefined? 0: search.item}</div>
                        <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
                    </div>

                </div>
    
            </div>
    `;
}))}

genrateShop()

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
    // console.log(basket);   
    update(selectedItem.id);
};
// !end
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
    // console.log(basket); 
    
    localStorage.setItem("data", JSON.stringify(basket));

};
// !end
// * update
let update = (id) => {
    let search = basket.find((x)=> x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

// !end


// TODO calculat the prise of all products quntity & write it in the cart icon in the nav bar
let calculation = () =>{
    // console.log("run");
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)

}

calculation();