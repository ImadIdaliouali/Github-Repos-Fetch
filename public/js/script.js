const input = document.querySelector('.user-input input');
const button = document.querySelector('.user-input i');
const repositoriesdiv = document.querySelector('.repos-data');

button.addEventListener("click", getRepositories);

function getRepositories() {
    if (input.value == '') {
        repositoriesdiv.textContent = "Please Enter a Username";
    }
    else {
        let req = new XMLHttpRequest();
        req.open('GET', `https://api.github.com/users/${input.value}/repos`);
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                repositoriesdiv.innerHTML = '';
                let repositories = JSON.parse(req.response);
                repositories.forEach(repos => {
                    let reposDiv = document.createElement('div');
                    reposDiv.setAttribute('class', 'repos');
                    let name = document.createElement('p');
                    name.textContent = repos.name;
                    let infoDiv = document.createElement('div');
                    infoDiv.setAttribute('class', 'repos-info');
                    let starsDiv = document.createElement('div');
                    starsDiv.setAttribute('class', 'stars');
                    let stars = document.createElement('p');
                    stars.textContent = repos.stargazers_count;
                    let starIcon = document.createElement('i');
                    starIcon.setAttribute('class', 'fa-solid fa-star');
                    starsDiv.appendChild(stars);
                    starsDiv.appendChild(starIcon);
                    let url = document.createElement('a');
                    url.setAttribute('target', '_blank')
                    url.href = repos.html_url;
                    let openIcon = document.createElement('i');
                    openIcon.setAttribute('class', 'fa-solid fa-up-right-and-down-left-from-center');
                    url.appendChild(openIcon);
                    infoDiv.appendChild(starsDiv);
                    infoDiv.appendChild(url);
                    reposDiv.appendChild(name);
                    reposDiv.appendChild(infoDiv);
                    repositoriesdiv.appendChild(reposDiv);
                });
            }
        }
        req.send();
    }
}