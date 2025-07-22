const type_btn = document.getElementsByClassName("type_btn");

Array.from(type_btn).forEach(btn => {
    btn.addEventListener("click", () => {
        const type = btn.textContent;
        if (type != "All Type") {
            Array.from(document.getElementsByClassName("food")).forEach((item) => {
                item.style.display = "none";
            });
            Array.from(document.getElementsByClassName(type)).forEach((item) => {
                item.style.display = "block";
            });
        } else {
            Array.from(document.getElementsByClassName("food")).forEach((item) => {
                item.style.display = "block";
            });
        }

    });
});


fetch("/api/getCakes")
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok');
    })
    .then(res => {
        const search = document.getElementById("search");
        search.addEventListener("input", () => {
            let value = search.value;
            let id_arr = res.filter(item => {
                // Check if the searchString is found in any of the relevant properties
                return (
                    item.Food.includes(value) ||
                    item.info_Detail.includes(value)||
                    item.Type.includes(value)
                );
            }).map(item => item.IDFood);
            Array.from(document.getElementsByClassName("food")).forEach((item) => {
                item.style.display = "none";
            });
            id_arr.forEach(id =>{
                document.getElementById(`${id}`).style.display = "block";
            });
        });
    })
