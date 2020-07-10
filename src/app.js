import { http } from "./http";
import { ui } from "./ui";

document.addEventListener("DOMContentLoaded", getData);
document.getElementById("submit").addEventListener("click", submitPost);
document.getElementById('posts').addEventListener('click', deleteItem)
document.getElementById('posts').addEventListener('click', editItem)

// event delegation for back button
// document.getElementById('main').addEventListener('click', backButtonClick)

function getData() {
  http
    .get("http://localhost:3000/posts")
    .then((data) => ui.showItem(data))
    .catch((err) => console.log(err));
}

function submitPost(e) {
  let id = document.getElementById('id').value;
  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;

  if (title === '' || body === '') {
    ui.showAlert("please fill out the form", 'danger')
  } else {
    if (id === '') {
      // Add State
      let data = {
        title,
        body,
      };
      http
        .post("http://localhost:3000/posts", data)
        .then((data) => {
          getData()
          ui.clearField()
          ui.showAlert("item added to the list", 'success')
        }
        )
        .catch((err) => console.log(err));
    } else {
      let data = {
        id,
        title,
        body,
      };
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          getData()
          ui.changeState("add")
          ui.clearField()
          ui.showAlert("item Update to the list", 'success')
        }
        )
        .catch((err) => console.log(err));
    }
  }


}

function deleteItem(e) {
  e.preventDefault()
  if (e.target.className === 'fa fa-remove') {
    const id = e.target.parentElement.dataset.id
    http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        getData()

        ui.showAlert("item deleted from the list", 'danger')
      })
      .catch(err => console.log(err))
  }


}

function editItem(e) {
  if (e.target.className == 'fa fa-pencil') {
    const id = e.target.parentElement.dataset.id
    const body = e.target.parentElement.previousElementSibling.textContent
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
    const object = {
      id,
      title,
      body
    }
    ui.showEditState(object)
  }
}

// function backButtonClick(e) {
//   e.preventDefault()
//   if (e.target.id = 'back') {
//     ui.changeState('add')
//   } else {

//   }
// }