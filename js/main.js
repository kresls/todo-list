const list = "#list",
      listItem = ".list-item",
      form = "#add-item";

function InsertTestingItems() {
  $(list).append(CreateListItem("Köpa pennor"));
  $(list).append(CreateListItem("Gå på promenad"));
  $(list).append(CreateListItem("Svara på frågor på Stack Overflow"));
  $(list).append(CreateListItem("Hjälp till i GitHub-projekt"));
}

function CreateListItem(text) {
  return  "<div class='list-item'>"
          + "<span class='item-number'></span>"
          + "<span class='item-text'>" + text + "</span>"
          + "<button class='btn-move-up'>⋀</button>"
          + "<button class='btn-move-down'>⋁</button>"
          + "<button class='btn-del'>X</button>"
          + "</div>";
}

function UpdateListNumbers() {
  $(list).children().each(function(li) {
    $(this).find(".item-number").text((li + 1) + ".");
  });
}

$(document).ready(function() {
  InsertTestingItems();
  UpdateListNumbers();

  // Form for adding a to-do
  $(form).submit(function(e) {
    e.preventDefault();
    let text = $(form).children("input[type=text]").val();
    if(text.trim() !== "") {
      $(list).append(CreateListItem(text));
      $(form).children("input[type=text]").val("");
      UpdateListNumbers();
    }
  });

  // Use existing element for click event handler since list items are created dynamically
  $(list).on("click", "button", function() {
    if($(this).hasClass("btn-del")) { // When button with class .btn-del is clicked
      $(this).parent().remove();
      UpdateListNumbers();
    }
    else if($(this).hasClass("btn-move-up")) { // When button with class .btn-move-up is clicked
      $(this).parent().insertBefore($(this).parent().prev());
      UpdateListNumbers();
    }
    else if($(this).hasClass("btn-move-down")) { // When button with class .btn-move-down is clicked
      $(this).parent().insertAfter($(this).parent().next());
      UpdateListNumbers();
    }
  });


});