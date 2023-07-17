//before we start working we want to make sure that the html page is done loading and NOT loading
//if it is not done loading
if (document.readyState == 'loading') {
    //listen to when will it load then call the method ready
    //it will wait for the page to load before it call this method
    document.addEventListener('DOMContentLoaded', ready)
} else {

    ready()

}
//this method will make the button works even if the the page is not loaded
function ready() {

    displayInCart()

    var quantityInputs = document.getElementsByClassName('quantity-input')
        // add listeners to all number inputs buttons
    for (let i = 0; i < quantityInputs.length; i++) {
        console.log(i)
        console.log('added')
        quantityInputs[i].addEventListener('change', updateQuantity)
    }

    var removeButtons = document.getElementsByClassName('remove')
    console.log(removeButtons.length)
        // add listeners to all remove buttons
    for (let i = 0; i < removeButtons.length; i++) {
        console.log(i)
        removeButtons[i].addEventListener('click', removeItem)
    }



}
// event Listener always returns an event object
function removeItem(event) {
    //event has "target" property which gives us the specific button that was clicked
    var clickedButton = event.target
    var tempName = clickedButton.parentElement.parentElement.children[1].children[0].children[0].innerText
    deleteItems(tempName)
    clickedButton.parentElement.parentElement.remove();
    //updata total price
    updateTotal()
}

function updateQuantity(event) {
    //event has "target" property which gives us the specific input that was changed
    var num = event.target
        //         input -> form -> quantity -> item -> item-info ->
    var name = num.parentElement.parentElement.parentElement.getElementsByClassName('item-info')[0].getElementsByClassName('table')[0].children[0].innerText
        //if the user input something that is not a number
        //or negative number
    if (isNaN(num.value) || num.value <= 0) {
        num.value = 1
    }
    updateQuantityLocalStorage(num.value, name)
    updateTotal()
}

function displayInCart() {
    var itemsInCart = JSON.parse(window.localStorage.getItem('cart'))
    for (var i = 0; i < itemsInCart.length; i++) {
        var item = document.createElement('div')
        item.classList.add('item')
        var cartContent = `
        <div class="item-image">
        <img src=${itemsInCart[i].image} style="width: 100%;">
    </div>
    <div class="item-info">
        <div class="table">
        <span class="caption"><strong>${itemsInCart[i].name}</strong></span>
            ${itemsInCart[i].description}
        </div>
    </div>
    <div class="quantity">
        <label for="quantity">Quantity</label>
        <input type="number" onchange="{(e)=>updateQuantity()}" class="quantity-input" name="quantity" value="${itemsInCart[i].quantity}" min="1">
    </div>
    <div class="price">
        <span>${itemsInCart[i].price}</span>
    </div>
    <div class="remove-btn">
        <button type="button" class="remove">Remove</button>
    </div>
        `
        item.innerHTML = cartContent
        document.getElementById('cart').append(item)
    }
    updateTotal()
}

function updateTotal() {

    //get the div that contain all cart items
    //this will return an array of all the elements that has the class cart
    //we only have one cart so its at index = 0
    var cart = document.getElementById('cart')
        //cart it self is like an array of items
        //get all the items with the class ="item"
    var items = cart.getElementsByClassName('item')

    //items is also like an array of elements
    var total = 0;
    for (var i = 0; i < items.length; i++) {
        //parseFloat => turn string into float
        //we only have one price so its at index = 0
        //innerText => get text from an element
        //replace the currency with empty string to get pure number
        var price = parseFloat(items[i].getElementsByClassName('price')[0].innerText.replace('SR', ''))

        //querySelector() returns the first Element within the document that matches the specified selector
        //since quantity is an input element i can just get the value
        var quantity = parseFloat(document.querySelector("input[type='number']").value)
        total = total + (price * quantity)
    }
    document.getElementsByClassName('total-price')[0].innerText = total + 'SR'
    document.getElementsByClassName('total-price')[1].innerText = 'Almost Done! your total is: ' + total + 'SR'

}