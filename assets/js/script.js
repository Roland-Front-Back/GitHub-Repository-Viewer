const searchBtn = document.getElementById("search-btn");
const userProfileContainer = document.getElementById("user-profile-container");
const repositoryListContainer = document.getElementById(
  "repository-list-container"
);

const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "just now";
};

const truncateDescription = (text, maxLength = 45) => {
  if (!text) return "No description available";

  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength).trim() + "...";
};

const fetchUser = async (username) => {
  const loadingPopup = showPopup("Loading user profile...");

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
      throw new Error("User not found!");
    }
    const data = await res.json();
    document.body.removeChild(loadingPopup);
    showProfileResults(data);
  } catch (err) {
    document.body.removeChild(loadingPopup);
    showPopup(`${err.message} &#128556;`, true);
    userProfileContainer.innerHTML = "";
    repositoryListContainer.innerHTML = "";
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

const fetchRepos = async (username) => {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated$per_page=10`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch repo-lists");
    }
    const data = await res.json();
    showRepoResults(data);
  } catch (err) {
    showPopup("Failed to load repositories", true);
  }
};

const showRepoResults = (data) => {
  if (data.length === 0) {
    repositoryListContainer.innerHTML = `<div class="error-div"><p class="error">No repositories found</p></div>`;
    return;
  }

  const recentRepos = [...data]
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    .slice(0, 10);

  repositoryListContainer.innerHTML = recentRepos
    .map((repo) => {
      const {
        name,
        html_url,
        description,
        stargazers_count,
        forks_count,
        updated_at,
        language,
      } = repo;
      return `
        <div class="repo-div">
          <div class="repo-link">
            <a href="${html_url}" target="_blank" class="repo-name">${name}</a>
            <span class="repo-lang" data-language="${language}">&#128218Language: ${language}</span>
          </div>
          <div class="repo-desc">&#128196Description: ${truncateDescription(
            description
          )}</div>
          <div class="repo-footer">
            <span class="repo-star">&#127775Stars: ${stargazers_count}</span>
            <span class="repo-fork">&#128205Forks: ${forks_count}</span>
            <span class="repo-update">&#127793Updated: ${getRelativeTime(
              updated_at
            )}</span>
          </div>
        </div>
      `;
    })
    .join("");

  if (data.length > 10) {
    repositoryListContainer.innerHTML += `
      <div class="view-more-container">
        <p>Showing 10 of ${data.length} repositories</p>
        <a href="https://github.com/${data[0].owner.login}?tab=repositories" 
           target="_blank" 
           class="view-more-btn">
          View All on GitHub
        </a>
      </div>
    `;
  }
};

searchBtn.addEventListener("click", () => {
  const usernameInput = document.getElementById("username-input").value.trim();

  if (!usernameInput) {
    showPopup("Please enter a username!", true);
    return;
  }

  userProfileContainer.innerHTML = "";
  repositoryListContainer.innerHTML = "";

  fetchUser(usernameInput);
  fetchRepos(usernameInput);
});

const showPopup = (message, isError = false) => {
  const popup = document.createElement("div");
  popup.className = "popup-overlay";
  popup.innerHTML = `
    <div class="popup-content">
      <button class="popup-close">&times;</button>
      <div class="popup-text">${message}</div>
    </div>
  `;

  document.body.appendChild(popup);

  // Close popup when clicking X or anywhere outside
  popup.querySelector(".popup-close").addEventListener("click", () => {
    document.body.removeChild(popup);
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      document.body.removeChild(popup);
    }
  });

  // Auto-close error messages after 2 seconds
  if (isError) {
    setTimeout(() => {
      if (document.body.contains(popup)) {
        document.body.removeChild(popup);
      }
    }, 2000);
  }

  return popup;
};
