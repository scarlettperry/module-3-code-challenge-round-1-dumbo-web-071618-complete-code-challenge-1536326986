document.addEventListener('DOMContentLoaded', function() {

  const imageId = 84 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //STEP 1 QUERY
  const imageLink = document.getElementById('image') //img tag
  const imageName = document.getElementById('name') //h4 tag
  const imageLikes = document.getElementById('likes') //span tag
  const imageComments = document.getElementById('comments') //ul tag

  //STEP 2 QUERY
  const likeButton = document.getElementById('like_button')
  likeButton.addEventListener("click", increaseLikes)

  //STEP 4 QUERY
  const commentForm = document.getElementById('comment_form')
  const commentInput = document.getElementById('comment_input')
  commentForm.addEventListener("submit", addComment)

  //STEP 5 QUERY
  const dataContainer = document.getElementById('image_card')
  dataContainer.addEventListener("click", deleteComment)

  fetch(imageURL)
    .then(resp => resp.json())
    .then(image => addImageToDom(image))

  //append image data to DOM
  function addImageToDom(image) {
    imageLink.src = `${image.url}`
    imageName.innerText = image.name
    imageLikes.innerText = image.like_count

    image.comments.forEach(comment => {
      let bulletPoint = document.createElement("li")
      bulletPoint.innerText = comment.content
      let deleteButton = document.createElement("button")
      deleteButton.dataset.id = comment.id
      deleteButton.className = "delete-comment"
      deleteButton.innerText = "x"
      bulletPoint.append(deleteButton)
      imageComments.appendChild(bulletPoint)
    })
  }

  //increase likes
  function increaseLikes(event) {
    parentButton = event.target.parentNode
    spanTag = parentButton.querySelector("#likes")
    spanTag.innerText = parseInt(spanTag.innerText) + 1

    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: 84})
    })
  }

  //add new comment
  function addComment(event) {
    event.preventDefault()
    let newComment = commentInput.value
    let newBulletPoint = document.createElement("li")
    newBulletPoint.innerText = newComment
    let newDeleteButton = document.createElement("button")
    newDeleteButton.className = "delete-comment"
    newDeleteButton.innerText = "x"
    newBulletPoint.append(newDeleteButton)
    imageComments.append(newBulletPoint)
    commentInput.value = ""

    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 84,
        content: newComment
      })
    })
  }

  //delete comment
  function deleteComment(event) {
    if (event.target.className === "delete-comment") {
      commentId = event.target.dataset.id
      event.target.parentNode.remove()
      fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
        method: "DELETE"
      })
    }
  }



})//doc event listener
