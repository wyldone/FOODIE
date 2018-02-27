$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var recipesId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?recipes_id=") !== -1) {
    recipesId = url.split("=")[1];
    getRecipesData(recipesId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var nameInput = $("#meal_name");
  var ingredientsInput = $("#ingredients");
  var directionsInput = $("#directions");
  var cmsForm = $("#cms");

  $(submitBtn).on("click", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!nameInput.val().trim() || !ingredientsInput.val().trim() || !directionsInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newRecipes = {
      name: nameInput.val().trim(),
      ingredients: ingredientsInput.val().trim(),
      directions: directionsInput.val().trim()
    };

    console.log(newRecipes);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newRecipes.id = recipesId;
      updateRecipes(newRecipes);
    }
    else {
      submitRecipes(newRecipes);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitRecipes(Recipes) {

    $.post("/api/recipes", Recipes, function() {
      window.location.href = "/";
    });
  }

  // Gets post data for a post if we're editing
  function getRecipesData(id) {
    $.get("/api/recipes/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        nameInput.val(data.name);
        ingredientsInput.val(data.ingredients);
        directionsInput.val(data.directions);

        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateRecipes(post) {
    $.ajax({
      method: "PUT",
      url: "/api/recipes",
      data: recipes
    })
    .then(function() {
      window.location.href = "/foodie";
    });
  }
});



  