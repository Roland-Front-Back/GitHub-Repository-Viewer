GitHub Rpository Viewer 🔍

A sleek, futuristic GitHub profile search application that displays user information and repositories with a neon-inspired UI.

Features ✨

- Search any GitHub username
- Display user profile information:
  - Avatar
  - Bio
  - Location
  - Social stats (repos, followers, following)
- Show latest 10 repositories (sorted by most recent update)
- Responsive design that works on all devices
- Beautiful neon-themed UI with glowing effects
- Loading states and error handling

Technologies Used 🛠️

- HTML5
- CSS3 (with custom properties and animations)
- JavaScript (ES6+)
- GitHub API

Installation 💻

1. Clone the repository:
```bash
git clone https://github.com/your-username/github-profile-finder.git
Open index.html in your browser

(No dependencies or build steps required - works directly in the browser!)

How to Use 🚀
Enter a GitHub username in the search field

Click "Search" or press Enter

View the user's profile information and latest repositories

Click on any repository to open it on GitHub

Customization 🎨
You can easily customize the colors by editing the CSS variables in the :root selector:

css
Copy
:root {
  --Main-bg-color: #0a0a12;
  --Text-primary: #e0e0ff;
  --Accent-purple: #7f00ff;
  --Accent-blue: #00f0ff;
  /* ... */
}
API Usage ℹ️
This project uses GitHub's public API:

User data: https://api.github.com/users/{username}

Repositories: https://api.github.com/users/{username}/repos

Note: The API has rate limits (60 requests per hour for unauthenticated requests).

Future Improvements 🔮
Add authentication for higher API rate limits

Implement repository sorting options

Add dark/light mode toggle

Add local search history

Contributing 🤝
Contributions are welcome! Please open an issue or pull request.

License 📄
This project is licensed under the MIT License.

Made with ❤️ and JavaScript
