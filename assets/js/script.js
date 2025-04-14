const searchBtn = document.getElementById("search-btn");
const userProfileContainer = document.getElementById("user-profile-container");
const repositoryListContainer = document.getElementById(
  "repository-list-container"
);

const fetchUser = async (username) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
      throw new Error("User not found!");
    }
    const data = await res.json();
    console.log("This is for the user", data);
    showProfileResults(data);
  } catch (err) {
    userProfileContainer.innerHTML = `<div class="error-div"><p class="error">${err.message}&#128556</p></div>`;
  }
};

const fetchRepos = async (username) => {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!res.ok) {
      throw new Error("Failed to fetch repo-lists");
    }
    const data = await res.json();
    console.log("This is for the user repo list", data);
    showRepoResults(data);
  } catch (err) {
    console.log(err);
  }
};

const showProfileResults = (data) => {
  const {
    login,
    name,
    html_url,
    public_repos,
    followers,
    following,
    avatar_url,
    bio,
    location,
  } = data;
  userProfileContainer.innerHTML = `
    <div class="user-img">
    <img src="${avatar_url}" alt="${login}" class="user-avatar">
    </div>
    <div class="user-location">
    <p class="location">${location}</p>
    </div>
    <div class="user-info">
    <h2 class="username"><a href="${html_url}">${login}</a></h2>
      <h4 class="name"><span>Name: </span>${name}<h4>
      <p class="bio"><span>Bio: </span>${bio}</p>
    </div>
    <div class="user-social">
    <p class="repos">&#128193 Public repos: ${public_repos}</p>
    <p class="followers">&#128100 Followers: ${followers}</p>
    <p class="following">&#128100 Following: ${following}</p>
    </div>
  `;
};

const showRepoResults = (data) => {
  repositoryListContainer.innerHTML = data
    .map((data) => {
      const {
        name,
        html_url,
        description,
        stargazers_count,
        forks_count,
        updated_at,
        language,
      } = data;
      return `
    <div class="repo-div">
    <div class="repo-link"><a href="${html_url}" target="_blank" class="repo-name">${name}</a>
    <span class="repo-lang">Language: ${language}</span>
    </div>
    <div class="repo-desc">Description: ${description}</div>
    <div class="repo-footer">
    <span class="repo-star">Stars: ${stargazers_count}</span>
    <span class="repo-fork">Forks: ${forks_count}</span>
    <span class="repo-update">Updated: ${updated_at}</span>
    </div>
    </div>
    `;
    })
    .join("");
};

searchBtn.addEventListener("click", () => {
  const usernameInput = document.getElementById("username-input").value.trim();

  if (!usernameInput) {
    alert("Please enter a username!");
    return;
  }

  fetchUser(usernameInput);
  fetchRepos(usernameInput);
});
