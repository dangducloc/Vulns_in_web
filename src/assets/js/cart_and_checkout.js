function Total() {
    let amounts_arr = document.getElementsByClassName("amounts");
    let price_arr = document.getElementsByClassName("Price");
    let total = document.getElementById("Total");

    let sum = 0;

    // Convert amounts_arr and price_arr to arrays and iterate
    Array.from(amounts_arr).forEach((element, index) => {
        let amount = parseInt(element.value) || 0; // Default to 0 if value is invalid
        let price = parseInt(price_arr[index].textContent) || 0; // Get price based on index
        sum += (amount * price); // Add amount * price to the total sum
    });

    // Update the total content
    total.textContent = sum;

    console.log(sum);
}

Total();

let arr = document.getElementsByClassName("amounts");
let names = Array.from(document.getElementsByClassName("food_name"));
Array.from(arr).forEach((element, index) => {
    element.addEventListener("change", () => {
        const left = parseInt(element.getAttribute("max"));
        const quantity = element.value;
        const idfood = element.id;
        if (quantity > left) {
            alert(`Please change amount of ${names[index].textContent} to lower than ${left}`);
        } else {
            fetch('/api/cart/updateItem', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity, idfood }),
                credentials: 'include'
            })
                .then(response => {//get data from api
                    if (response.status == 201) {
                        Total();
                        return response.json();
                    } else if (response.status == 401) {
                        window.location = "/login";
                    } else {
                        throw new Error('Network response was not ok');
                    }

                })
                .then(res => {//do something with data
                }).catch((error) => {
                    console.error('Error:', error);
                });
        }
    });
});


let rmItems = document.getElementsByClassName("rmItem");
Array.from(rmItems).forEach((element) => {
    element.addEventListener("click", () => {
        const idfood = parseInt(element.getAttribute("data-idfood"));
        const cartItem = element.parentElement;
        fetch('/api/cart/deleteItem', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idfood }),
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                cartItem.remove();
                let items_amount = parseInt(document.getElementById("items_Amount").textContent);
                document.getElementById("items_Amount").textContent = items_amount - 1;
                Total();
                return response.json();
            }
            throw new Error('Network response was not ok');
        }).catch(error => {
            console.error(`error:${error}`);
        })
    });
});


document.getElementById("checkout").addEventListener("click", () => {

    const payments = document.getElementById("payments");
    const payment = payments.value;
    const address = document.getElementById("address").value;

    fetch("/api/checkOut", {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment, address })
    }).then(response => {
        if (response.ok) {
            let cartItems = document.getElementsByClassName("item_cart");
            Array.from(cartItems).forEach((item) => {
                item.remove(); // Remove each element
            });
            document.getElementById("cart").textContent = "Your cart is empty !!";
            document.getElementById("items_Amount").textContent = 0;
            return response.json();
        }
        throw new Error('Network response was not ok');
    }).catch(err => {
        console.error(`error:${err}`);
    })
});
