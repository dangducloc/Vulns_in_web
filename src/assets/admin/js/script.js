const foods = document.getElementsByClassName("food");
Array.from(foods).forEach((item) => {
	item.addEventListener("click", () => {
		window.location = `admin/edit_food/${item.getAttribute("data-idfood")}`;
 	});
});


$(document).ready(function () {
  $(".data-table").each(function (_, table) {
    $(table).DataTable();
  });
});
