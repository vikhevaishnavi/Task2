document.addEventListener('DOMContentLoaded', function () {
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');

    // Fetch posts when the page loads
    fetchPosts();

    // Add event listener to handle form submission
    postForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            const data = await response.json();
            const newPost = createPostElement(data);
            postsContainer.prepend(newPost);
            postForm.reset();
        } else {
            alert('Error submitting post');
        }
    });

    // Function to fetch posts from the server
    async function fetchPosts() {
        const response = await fetch('/posts');
        const data = await response.json();

        data.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    }

    // Function to create HTML element for a post
    function createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const titleHeader = document.createElement('h2');
        titleHeader.textContent = post.title;

        const contentParagraph = document.createElement('p');
        contentParagraph.textContent = post.content;

        postDiv.appendChild(titleHeader);
        postDiv.appendChild(contentParagraph);

        return postDiv;
    }
});