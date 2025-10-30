$(document).ready(function () {

  const apiURL = "https://usmanlive.com/wp-json/api/stories";
  const $storiesList = $("#storiesList");
  const $alert = $("#alert");
  const $loading = $("#loading");
  const $form = $("#createForm");
  const $createBtn = $("#createBtn");
  const $clearBtn = $("#clearBtn");

  // Show alert
  function showAlert(message, type = "success") {
    $alert.removeClass("d-none alert-success alert-danger").addClass(`alert-${type}`).text(message);
    setTimeout(() => $alert.addClass("d-none"), 3000);
  }

  // Show/hide loading
  function showLoading(show = true) {
    $loading.toggle(show);
  }

  // Fetch and display stories
  function displayStories() {
    showLoading(true);
    $.ajax({
      url: apiURL,
      method: "GET",
      dataType: "json",
      success: function (data) {
        $storiesList.empty();
        data.forEach(story => addStoryToDOM(story));
      },
      error: function () {
        showAlert("Failed to load stories", "danger");
      },
      complete: () => showLoading(false)
    });
  }

  // Add story to DOM
  function addStoryToDOM(story) {
    const html = `
      <div class="mb-3 border p-3" data-id="${story.id}">
        <h5>${story.title}</h5>
        <p>${story.content}</p>
        <div>
          <button class="btn btn-sm btn-info btn-edit" data-id="${story.id}">Edit</button>
          <button class="btn btn-sm btn-danger btn-del" data-id="${story.id}">Delete</button>
        </div>
      </div>
    `;
    $storiesList.append(html);
  }

  // Delete story
  $(document).on("click", ".btn-del", function () {
    const id = $(this).data("id");
    if (!confirm("Are you sure you want to delete this story?")) return;

    showLoading(true);
    $.ajax({
      url: `${apiURL}/${id}`,
      method: "DELETE",
      success: function () {
        showAlert("Story deleted successfully!");
        displayStories();
      },
      error: function () {
        showAlert("Failed to delete story", "danger");
      },
      complete: () => showLoading(false)
    });
  });

  // Edit story
  $(document).on("click", ".btn-edit", function () {
    const id = $(this).data("id");

    showLoading(true);
    $.ajax({
      url: `${apiURL}/${id}`,
      method: "GET",
      success: function (story) {
        $createBtn.text("Update").attr("data-id", story.id);
        $("#createTitle").val(story.title);
        $("#createContent").val(story.content);
        $clearBtn.show();
        $("html, body").animate({ scrollTop: $form.offset().top - 50 }, 300);
      },
      error: function () {
        showAlert("Failed to fetch story", "danger");
      },
      complete: () => showLoading(false)
    });
  });

  // Create/Update story
  $form.submit(function (e) {
    e.preventDefault();
    const id = $createBtn.data("id");
    const title = $("#createTitle").val();
    const content = $("#createContent").val();
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiURL}/${id}` : apiURL;

    showLoading(true);
    $.ajax({
      url: url,
      method: method,
      data: { title, content },
      success: function () {
        showAlert(id ? "Story updated successfully!" : "Story created successfully!");
        resetForm();
        displayStories();
      },
      error: function () {
        showAlert("Failed to save story", "danger");
      },
      complete: () => showLoading(false)
    });
  });

  // Clear form
  $clearBtn.click(function (e) {
    e.preventDefault();
    resetForm();
  });

  function resetForm() {
    $createBtn.removeAttr("data-id").text("Create");
    $clearBtn.hide();
    $form[0].reset();
  }

  // Initial load
  displayStories();

});
