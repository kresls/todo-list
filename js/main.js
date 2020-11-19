const list = "#list",
      listItem = ".list-item",
      form = "#add-item";

// Helper function to create a list item
// Returns a string with html code
function CreateListItem(str) {
  return  "<div class='list-item'>"
          + "<span class='item-number'></span>"
          + "<span class='item-text'>" + str + "</span>"
          + "<button class='btn-move-up' title='Move the item one step up'>⋀</button>"
          + "<button class='btn-move-down' title='Move the item one step down'>⋁</button>"
          + "<button class='btn-del' title='Remove the item'>X</button>"
          + "</div>";
}

// Helper function to keep list numbered
function UpdateListNumbers() {
  $(list).children().each(function(li) {
    $(this).find(".item-number").text((li + 1) + ".");
  });
}

function MoveItemUp(item) {
  item.insertBefore(item.prev());
}

function MoveItemDown(item) {
  item.insertAfter(item.next());
}

$(document).ready(function() {

  // Form for adding a to-do
  $(form).submit(function(e) {
    e.preventDefault();
    let input = $(form).children("input[type=text]").val();
    if(input.trim() !== "") {
      $(list).append(CreateListItem(input));
      $(form).children("input[type=text]").val("");
      UpdateListNumbers();
    }
  });

  // Use existing element for click event handlers since list items are created dynamically
  $(list).on("click", "button", function() {
    if($(this).hasClass("btn-del")) { // When button with class .btn-del is clicked
      $(this).parent().remove();
      UpdateListNumbers();
    }
    else if($(this).hasClass("btn-move-up")) { // When button with class .btn-move-up is clicked
      MoveItemUp($(this).parent());
      UpdateListNumbers();
    }
    else if($(this).hasClass("btn-move-down")) { // When button with class .btn-move-down is clicked
      MoveItemDown($(this).parent())
      UpdateListNumbers();
    }
  });

  // Use Sortable Widget on the list
  // Call UpdateListNumbers() when an item has been dropped
  $(list).sortable({
    update: function(e, ui) {
      UpdateListNumbers();
    }
  });

  $("#btn-toggle-info").click(function() {
    $(".info").toggleClass("show");
  });

});