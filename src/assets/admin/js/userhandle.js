const users = document.getElementsByClassName("delete");
Array.from(users).forEach((item) => {
    item.addEventListener("click", () => {
        const idUser = item.getAttribute("data-iduser");
        const name = item.getAttribute("data-name");
        fetch('/api/admin/deleteUser', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idUser }),
            credentials: 'include'
        })
            .then(response => {//get data from api
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }else{
                    item.parentElement.parentElement.remove();
                    alert(`Delete users ${name} successfully!`);
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
