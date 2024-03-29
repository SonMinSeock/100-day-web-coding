const loadCommentsBtnElement = document.getElementById("load-comments-btn");
const commentsSectionElement = document.getElementById("comments");
const commentsFormElement = document.querySelector("#comments-form form");
const commentTitleElement = document.getElementById("title");
const commentTextElement = document.getElementById("text");

function createCommentsList(comments) {
  const commentListElement = document.createElement("ol");

  for (const comment of comments) {
    const commentElement = document.createElement("li");
    commentElement.innerHTML = `
            <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
            </article>
        `;
    commentListElement.appendChild(commentElement);
  }

  return commentListElement;
}

async function fetchCommentsForPost(event) {
  //const postId = event.target.dataset.postid;
  const postId = loadCommentsBtnElement.dataset.postid;
  try {
    const response = await fetch(`/posts/${postId}/comments`);
    //   const response = await fetch(`/posts/${postId}/comments`, {
    //     method: "GET"
    //   });

    if (!response.ok) {
      alert("Fetching comments failed!");
      return;
    }

    const responseData = await response.json();

    if (responseData && responseData.length > 0) {
      const commentListElement = createCommentsList(responseData);

      commentsSectionElement.innerHTML = ``;
      commentsSectionElement.appendChild(commentListElement);
    } else {
      commentsSectionElement.firstElementChild.textContent = `
      해당 포스트의 댓글 없습니다.
      `;
    }
  } catch (error) {
    alert("Getting comments failed!");
  }
}

async function saveComment(event) {
  event.preventDefault();

  const enteredTitle = commentTitleElement.value;
  const enteredText = commentTextElement.value;
  const postId = commentsFormElement.dataset.postid;

  const comment = {
    title: enteredTitle,
    text: enteredText,
  };

  try {
    const res = await fetch(`/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const responseData = await res.json();
      await fetchCommentsForPost();
    } else {
      alert("Could not send comment!");
    }
  } catch (error) {
    alert("Could not send request - maybe try again later!");
  }
}

loadCommentsBtnElement.addEventListener("click", fetchCommentsForPost);
commentsFormElement.addEventListener("submit", saveComment);
