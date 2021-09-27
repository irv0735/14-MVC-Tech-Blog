const entryID = document.location.href.split("/");

const commentFormHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector('#comment-content').value.trim();
   
  console.log(content)
  if (content) {
    const response = await fetch(`/api/blog-entries/${entryID[4]}/comment`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
    if(response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const deleteHandler = async (commentId) => {
  const response = await fetch(`/api/blog-entries/delete-comment`, {
    method: 'DELETE',
    body: JSON.stringify({id: commentId})
  });
  if(response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);
document.querySelectorAll('#delete-comment').addEventListener('click', function(event) {
  let selectedComment =  event.target.closest('.single-comment').dataset.id;
  console.log(selectedComment);
  deleteHandler(selectedComment);
  });