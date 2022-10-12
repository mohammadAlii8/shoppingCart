let productsContainer = document.querySelector("#products");
let cartContainer = document.querySelector(".cart");
let cartHeader = document.querySelector(".cart-header");
let cartItems = document.querySelector(".cart-products");
let totalEl = document.querySelector(".total");

cartHeader.addEventListener("click", () => {
  // cartContainer.style.bottom = "-365px"
  cartContainer.classList.toggle("cart-toggle");
});

function showAllproducts() {
  products.forEach((product) => {
    productsContainer.innerHTML += `
    <div class="product-product">
      <div class="product-img">
         <img src="${product.imgSrc}" alt="product images">
      </div>
     <div class="product-title">${product.name}</div>
   <div class="product-instok">تعداد موجود :${product.instock}</div>
   <div class="product-data">
       <div class="product-price">${product.price}</div>
       <div class="product-cart" onclick="addToCart(${product.id})">
           <i class="fa-solid fa-cart-shopping"></i>
       </div>
   </div>
 </div>
    `;
  });
}
showAllproducts();

let cart = [];

function addToCart(id) {
  // console.log(`product ${id} added to Cart`);

  if (cart.some((item) => item.id === id)) {
    // alert(" محصول در سبد خرید است از آنجا اضافه کنید ");
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    item.numberOfUnits = 1;
    cart.push(item);
    // console.log(cart);
    renderCartItems();
    renderTotal();
  }
}

function renderCartItems() {
  cartItems.innerHTML = "";
  cart.forEach((item) => {
    cartItems.innerHTML += `
  <li class="cart-product">
     <div class="p-name" onclick = "deleteFromCart(${item.id})"> ${item.name} </div>
        <div class="p-price"> ${item.price} </div>
    <div class="p-unit">
          <span class="plus" onclick ="changeNumberOfUnits('plus', ${item.id})">+</span>
          <span class="unit"> ${item.numberOfUnits} </span>
          <span class="minus" onclick ="changeNumberOfUnits('minus', ${item.id})">-</span>
    </div>
  </li>
    `;
  });
}
function changeNumberOfUnits(action, id) {
  // console.log(`${action} and ${id}`);
  cart = cart.map(function (item) {
    let oldNumberOfUnits = item.numberOfUnits;

    if (item.id == id) {
      if (action == "plus" && oldNumberOfUnits < item.instock) {
        oldNumberOfUnits++;
      } else if (action == "minus" && oldNumberOfUnits > 1) {
        oldNumberOfUnits--;
      }
    }
    item.numberOfUnits = oldNumberOfUnits;
    return item;
  });

  renderCartItems();
  renderTotal(); // for Run number in numberOfUnits
}


// for calculate price and items

function renderTotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  totalEl.innerHTML = ` قیمت: (تعداد: ${totalItems})${totalPrice} `;
}
// delete Items in cart

function deleteFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  renderCartItems();
}
