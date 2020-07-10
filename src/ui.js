class UI {
  constructor() {
    this.postCon = document.getElementById('postContainer');
    this.post = document.getElementById("posts");
    this.title = document.getElementById("title");
    this.body = document.getElementById("body");
    this.submitBtn = document.getElementById("submit");
    this.formEnd = document.getElementsByClassName("form-end")[0];
    this.id = document.getElementById('id')
    this.state = "add";
  }

  showItem(posts) {
    let output = "";
    posts.forEach((post) => {
      output += `<div class="card mt-3">
        <div class="card-body">
          <div class="card-title"> <strong>${post.title}</strong></div>
          <div class="card-text mb-3">${post.body}</div>
          <a href="" class="edit-item card-link" data-id="${post.id}" >
            <i class="fa fa-pencil"></i>
          </a>
          <a href="" class="delete-item card-link" data-id="${post.id}" >
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>`;
    });
    this.post.innerHTML = output;
  }

  showEditState(data) {
    this.title.value = data.title
    this.body.value = data.body
    this.id.value = data.id
    this.changeState('edit')
  }
  changeState(type) {
    if (type == 'edit') {
      this.submitBtn.className = 'post-submit btn btn-secondary btn-block'
      this.submitBtn.textContent = "Update Post"
      const backButton = document.createElement('button')
      backButton.className = 'post-submit btn btn-primary btn-block back'
      backButton.id = 'back'
      backButton.appendChild(document.createTextNode("GO BACK"))
      const parent = document.getElementById('main')
      const child = document.getElementsByClassName('form-end')[0]
      parent.insertBefore(backButton, child)
      let self = this
      backButton.addEventListener("click", function () { self.changeState('add') })
    } else {
      this.submitBtn.className = 'post-submit btn btn-primary btn-block';
      this.submitBtn.textContent = "Post It";
      document.getElementById("back").remove()
      this.clearField()
    }
  }
  clearField() {
    this.title.value = ''
    this.body.value = ''
  }
  showAlert(message, className) {
    alert = document.createElement('div')
    alert.className = `alert alert-${className} mt-3`
    alert.appendChild(document.createTextNode(message))

    this.postCon.insertBefore(alert, this.post)
    setTimeout(() => {
      document.getElementsByClassName(`alert alert-${className}`)[0].remove()
    }, 2000)
  }

}

export const ui = new UI();
