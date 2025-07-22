const comments = document.getElementsByClassName("comment");
Array.from(comments).forEach((item) => {
    item.addEventListener("click", () => {
        window.location = `../admin/comments/${item.getAttribute("data-idfood")}`;
    }); 
});

const deletes = document.getElementsByClassName("delete");
Array.from(deletes).forEach((item) => {
    item.addEventListener("click", () => {
        const idBL= item.getAttribute("data-idcomment");
        fetch('/api/admin/deleteComment', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idBL }),
            credentials: 'include'
        })
            .then(response => {//get data from api
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }else{
                    item.parentElement.parentElement.remove();
                    return response.json();
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }); 
});


$(document).ready(function () {
    $(".data-table").each(function (_, table) {
        $(table).DataTable();
    });
});
