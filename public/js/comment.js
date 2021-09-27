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
  const response = await fetch(`/api/blog-entries/delete-comment/${commentId}`, {
    method: 'DELETE'
  });
  if(response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);

const commentArray = document.querySelectorAll('#delete-comment')
commentArray.forEach(function(singleComment) {
  singleComment.addEventListener('click', function(event) {
    const targetComment = event.target;
    const commentId = targetComment.closest('.single-comment').dataset.id;
    deleteHandler(commentId);
  });
});