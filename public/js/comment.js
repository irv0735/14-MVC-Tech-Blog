const commentFormHandler = async (event) => {
  event.preventDefault();
  const content = document.querySelector('#comment-content').value.trim();
  const entryID = document.location.href.split("/");
  
  console.log(content)
  if (content) {
    console.log("Submitting post request!")
    const response = await fetch(`/api/blog-entries/${entryID[4]}/add-comment`, {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("Back to comment.js after the post request")
    if(response.ok) {
      // document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.new-comment-form').addEventListener('submit', commentFormHandler);