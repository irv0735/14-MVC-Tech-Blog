const postId = document.location.href.split("/");

const editFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  
  if (title && content) {
    const response = await fetch(`/api/blog-entries/${postId[5]}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

const deletePost = async (event) => {
  event.preventDefault();
  const response = await fetch(`/api/blog-entries/${postId[5]}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('.edit-blog-form').addEventListener('submit', editFormHandler);
document.querySelector('#delete-post').addEventListener('click', deletePost);