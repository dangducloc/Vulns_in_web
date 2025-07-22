const pathname = window.location.pathname;
const pathSegments = pathname.split('/');
const idfood =parseInt(pathSegments[pathSegments.length - 1]);
//Post comment

document.getElementById("postcomment").addEventListener("click", () => {

    const commentText = document.getElementById("comment").value;

    const today = new Date();
    const currentDate = today.toISOString().split('T')[0];

    const userName = document.getElementById("user_name").textContent.trim();

    
    fetch('/api/comments/postComment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentText, idfood }),
        credentials: 'include'
    })
        .then(response => {//get data from api
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(res => {//do something with data
            if (res.success) {
                document.getElementById("comment").value = '';
                const commentHtml = `
    <li class="list-group-item">
        <i class="date">${currentDate}</i>
        <p><strong class="px-4">${userName}:</strong> ${commentText}</p>
    </li>`;

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = commentHtml;

                const commentList = document.getElementById('commentList');
                commentList.prepend(tempDiv.firstElementChild);

            } else {
                console.error('Failed to post comment:', res.message);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

//Add Cart

document.getElementById("addcart").addEventListener("click",() => {

    fetch('/api/cart/addItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idfood }),
        credentials: 'include'
    })
        .then(response => {//get data from api
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert("Item added to cart successfully!");
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

});

 // Select all elements with the class 'date'
 const dateElements = document.querySelectorAll('.date');

 // Loop through each element
 dateElements.forEach(element => {
     const dateString = element.textContent; // Get the current date text
     const datePart = dateString.split('T')[0];

     // Update the content of the element with the formatted date
     element.textContent = datePart;
 });
