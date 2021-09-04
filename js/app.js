// Enabling and Disabling SearchBox
let inputs = document.getElementById("inputs")
let overlay = document.getElementById("overlay")
function InputTrigger() {
  inputs.classList.add('openedInput')
  overlay.style.opacity = "1"
  overlay.style.zIndex = "7"
  overlay.addEventListener("click", () => {
    overlay.style.opacity = "0"
    overlay.style.zIndex = "0"
    inputs.classList.remove('openedInput')
  })
}

// Fetching JSON 
const jsonPath = "./data.json"
const products = document.querySelector(".products")
//1. Using Fetch API
// fetch(jsonPath).then(res => res.json()).then(data => console.log(data))
//2. Async - Need to init function
getShoes(jsonPath)
async function getShoes(url) {
  const res = await fetch(url)
  const data = await res.json()
  // console.log(data.shoeLists[0].name)
  showShoes(data.shoeLists)
  addToCart(data.shoeLists)
}
function showShoes(items) {
  products.innerHTML = " ";
  items.forEach((list) => {
    const { name, images_url, type, price } = list
    let eachProduct = document.createElement('div')
    eachProduct.classList.add('col-md-auto', 'bg-light', 'product')
    eachProduct.innerHTML = `
    <h6 class="text-dark">${type}</h6>
    <p class="lead text-dark mb-0">${name}</p>
    <img width="200px" height="150px"
    src="${images_url}"/>
    <div class="purchase">
    <strong class="text-dark">${price}</strong>
    <button onclick="addToCart()" class="btn btn-outline-secondary addToCart">ADD TO CART</button>
    </div>
    `
    products.appendChild(eachProduct)
  })
  document.getElementById('shopWomen').addEventListener("click", openWomanShoes)
}

//Enabling Woman Page's product view
function openWomanShoes() {
  products.style.display = "flex"
  products.style.zIndex = "3"
  overlay.style.opacity = "1"
  overlay.style.zIndex = "2"
  overlay.addEventListener("click", () => {
    overlay.style.opacity = "0"
    overlay.style.zIndex = "0"
    products.style.display = "none"
  })
}

// Getting product details for the Shopping Cart
let cartContent = document.getElementById('cartContent')
function addToCart(items) {
  // cartContent.innerText = " ";
  console.log(cartContent)
  let selectedProduct = document.createElement('div')
  selectedProduct.classList.add('row', 'col-lg-9', 'col-md-12', 'col-sm-12')
  selectedProduct.innerHTML = `
    <div class="col-md-6 col-sm-9">
						<div class="productInCart d-flex justify-content-around">
							<img
								class="img-fluid"
								src="https://cdn.shopify.com/s/files/1/0267/9232/9325/products/DB2576-001-1_1800x1800.jpg?v=1628154927"
								alt="product"
							/>
							<div>
								<h6>AIR FORCE 1/1 LOW</h6>
								<small class="text-muted">STYLE#: DB2576-001</small>
								<p class="text-dark">$140.00</p>
								<div class="d-flex gap-3 mb-3">
									<div class="colorOptions bg-primary"></div>
									<div class="colorOptions bg-warning"></div>
								</div>
								<p><b> Size 6.0</b></p>
								<div class="d-flex justify-content-between">
									<p><i class="far fa-heart"></i> Save</p>
									<p class="border-bottom">Edit</p>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-3 col-sm-3 text-center">
						<p class="lead">Only 1 in stock</p>
					</div>
					<div class="col-md-3 col-sm-12 d-flex flex-column">
						<button
							type="button"
							class="btn btn-close-icon align-self-center p-0"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
    `
  cartContent.appendChild(selectedProduct)

}