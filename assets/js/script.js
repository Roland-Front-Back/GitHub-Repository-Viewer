const usernameInput = document
  .getElementById("username-input")
  .value.toLowerCase();
const searchBtn = document.getElementById("search-btn");
const userProfileContainer = document.getElementById("user-profile-container");
const repositoryListContainer = document.getElementById(
  "repository-list-container"
);

const username = "roland-front-back";

// GitHub API's
const gitHubUsers = `https://api.github.com/users/${username}/`;
const gitHubRepos = `https://api.github.com/users/${username}/repos`;

const fetchUser = async () => {
  try {
    const res = await fetch(gitHubRepos);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

const fetchRepos = async () => {
  try {
    const res = await fetch(gitHubRepos);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

fetchUser();
fetchRepos();

const showProfileResults = (data) => {
  const { owner } = data;

  userProfileContainer.innerHTML = `
    <div class="user">
    <a href="${url}">Roland</a>
    </div>
    `;
};
