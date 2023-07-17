var count = 0;
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

    var addToCartButtons = document.getElementsByClassName('add-to-bag')
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener('click', addTocart)
    }
}

let storedItems = []

function addTocart(event) {
    found = false
        //the specific button that fires the event
    var selectedButton = event.target
        //use the button to get the item information
    var selectedItem = selectedButton.parentElement.parentElement.parentElement.getElementsByClassName('display')[0]
    var plantName = selectedItem.getElementsByClassName('plant-name')[0].innerText
    var plantPrice = selectedItem.getElementsByClassName('plant-price')[0].innerText
    var itemImg = selectedItem.getElementsByClassName('item-img')[0].src
    var selectedItemdescription = selectedButton.parentElement.parentElement.parentElement.getElementsByClassName('description')[0].children[0].innerHTML

    if (JSON.parse(window.localStorage.getItem('cart')).length == 0) {
        //store information in an object
        var itemObj = {
            name: plantName,
            price: plantPrice,
            image: itemImg,
            description: selectedItemdescription,
            quantity: 1
        };
        //store each object in an array
        storedItems.push(itemObj)
    } else {
        var temp = JSON.parse(window.localStorage.getItem('cart'))
        for (var i = 0; i < JSON.parse(window.localStorage.getItem('cart')).length; i++) {
            if (temp[i].name === plantName) {
                temp[i].quantity = temp[i].quantity + 1
                found = true
            }
        }
        storedItems = temp
        if (found == false) {
            //store information in an object
            var itemObj = {
                name: plantName,
                price: plantPrice,
                image: itemImg,
                description: selectedItemdescription,
                quantity: 1
            };
            //store each object in an array
            storedItems.push(itemObj)

        }
    }

    // console.log(storedItems)
    // console.log(plantName, plantPrice, itemImg)
    //store the array in local storage
    window.localStorage.setItem('cart', JSON.stringify(storedItems));
}

function deleteItems(name) {
    //get the number of items in the array of item objects
    var count = JSON.parse(window.localStorage.getItem('cart')).length
        //get the array
    var temp = JSON.parse(window.localStorage.getItem('cart'))
        // treverse until you find an item with the same name
    for (var i = 0; i < count; i++) {
        console.log(temp[i].name)
        if (temp[i].name === name) {
            //delete it
            temp.splice(i, 1);

        }
        //set the global variable to local variable
        storedItems = temp
            //update local storage
        window.localStorage.setItem('cart', JSON.stringify(temp));
    }
}

function updateQuantityLocalStorage(num, name) {
    var temp = JSON.parse(window.localStorage.getItem('cart'))
    for (var i = 0; i < JSON.parse(window.localStorage.getItem('cart')).length; i++) {
        if (temp[i].name === name) {
            temp[i].quantity = num
        }
    }
    //set the global variable to local variable
    storedItems = temp
        //update local storage
    window.localStorage.setItem('cart', JSON.stringify(temp));
}