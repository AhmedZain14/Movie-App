
// side bar
const toggleBtn = document.getElementById('toggleBtn');
const slidingMenu = document.getElementById('slidingMenu');

toggleBtn.addEventListener('click', function () {
    // class change
    slidingMenu.classList.toggle('open-menu');

    // icon change
    if (slidingMenu.classList.contains('open-menu')) {
        toggleBtn.classList.replace('fa-align-justify', 'fa-xmark');
    } else {
        toggleBtn.classList.replace('fa-xmark', 'fa-align-justify');
    }
});

// regex
var validation = {
    name: /^[a-zA-Z ]+$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^01[0125][0-9]{8}$/,
    age: /^(1[0-9]|[2-7][0-9]|80)$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
};

function validate(element, regex) {
    if (regex.test(element.value)) {
        element.style.borderBottomColor = "green";
        element.style.boxShadow = "0 0 10px 10px rgba(0, 255, 0, 0.2)";
        return true;
    } else {
        element.style.borderBottomColor = "red";
        element.style.boxShadow = "0 0 10px 10px rgba(255, 0, 0, 0.3)";
        return false;
    }
}

var allInputs = document.querySelectorAll('.movie-input');
for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener('input', function (e) {
        var inputElement = e.target;
        var type = inputElement.getAttribute('type');
        var placeholder = inputElement.getAttribute('placeholder').toLowerCase();

        if (placeholder.indexOf('name') !== -1) {
            validate(inputElement, validation.name);
        } else if (type === 'email') {
            validate(inputElement, validation.email);
        } else if (placeholder.indexOf('phone') !== -1) {
            validate(inputElement, validation.phone);
        } else if (type === 'number') {
            validate(inputElement, validation.age);
        } else if (type === 'password') {
            validate(inputElement, validation.password);
        }
    });
}






// cards static


// var moviesData = [{
//         title: "The Wrecking Crew",
//         rate: 6.5,
//         date: "2026-01-28",
//         overview: "Estranged half-brothers Jonny and James reunite...",
//         img: "../images/nh43XSQegiFELtR1CyGHeqPMXBA.webp"
//     },
//     {
//         title: "Greenland 2",
//         rate: 7.2,
//         date: "2026-02-05",
//         overview: "The survival continues in the sequel...",
//         img: "../images/nh43XSQegiFELtR1CyGHeqPMXBA.webp"
//     },
//     {
//         title: "The Shadow's Edge",
//         rate: 5.8,
//         date: "2026-01-15",
//         overview: "A mysterious operative must face...",
//         img: "../images/nh43XSQegiFELtR1CyGHeqPMXBA.webp"
//     }
// ];

// var container = document.getElementById('movieContainer');
// var cartoona = "";

// for (var i = 0; i < moviesData.length; i++) {
//     cartoona += `
//         <div class="col-md-4">
//             <div class="movie-card position-relative overflow-hidden rounded-3 shadow">
//                 <img src="${moviesData[i].img}" class="w-100" alt="">
//                 <div class="movie-overlay d-flex align-items-center p-3">
//                     <div class="movie-info text-center w-100">
//                         <h2>${moviesData[i].title}</h2>
//                         <p>${moviesData[i].overview}</p>
//                         <p>Rate: ${moviesData[i].rate}</p>
//                         <p>${moviesData[i].date}</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }
// container.innerHTML = cartoona;





// api

var movieContainer = document.getElementById('movieContainer');
var apiKey = '4dff5deeb272eb6219675fbc8ae589e5';
var apiUrl = 'https://api.themoviedb.org/3/trending/movie/day?api_key=' + apiKey;

function getMovies() {
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var moviesList = data.results;
            displayMovies(moviesList);
        });
}

function displayMovies(list) {
    var cartoona = "";

    for (var i = 0; i < list.length; i++) {
        var posterPath = 'https://image.tmdb.org/t/p/w500' + list[i].poster_path;
        var delay = i * 0.1;
        cartoona += `
            <div class="col-md-4 movie-card-parent" style="animation-delay: ${delay}">
                <div class="movie-card position-relative overflow-hidden rounded-3 shadow ">
                    <img src="${posterPath}" class="w-100" alt="${list[i].title}">
                    <div class="movie-overlay d-flex align-items-center p-3">
                        <div class="movie-info text-center w-100">
                            <h2>${list[i].title}</h2>
                            <p>${list[i].overview.slice(0,150)}...</p> 
                            <p>Rate: <span class="text-warning">${list[i].vote_average}</span></p>
                            <p>${list[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    movieContainer.innerHTML = cartoona;

    revealOnScroll();
}

getMovies();




// api category

var myKey = '4dff5deeb272eb6219675fbc8ae589e5';

function getMoviesByCategory(category) {
    var url = 'https://api.themoviedb.org/3/movie/' + category + '?api_key=' + myKey;
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            displayMovies(data.results);
        });
}

document.getElementById('nowPlaying').addEventListener('click', function () {
    getMoviesByCategory('now_playing');
    slidingMenu.classList.remove('open-menu');
    toggleBtn.classList.replace('fa-xmark', 'fa-align-justify');
});

document.getElementById('popular').addEventListener('click', function () {
    getMoviesByCategory('popular');
    slidingMenu.classList.remove('open-menu');
    toggleBtn.classList.replace('fa-xmark', 'fa-align-justify');
    
});

document.getElementById('topRated').addEventListener('click', function () {
    getMoviesByCategory('top_rated');
    slidingMenu.classList.remove('open-menu');
    toggleBtn.classList.replace('fa-xmark', 'fa-align-justify');
    
});

document.getElementById('upcoming').addEventListener('click', function () {
    getMoviesByCategory('upcoming');
    slidingMenu.classList.remove('open-menu');
    toggleBtn.classList.replace('fa-xmark', 'fa-align-justify');
    
});




// input search

var searchByWordInput = document.getElementById("searchByWord"); 
var myKey = '4dff5deeb272eb6219675fbc8ae589e5';

searchByWordInput.addEventListener("input", function (e) {
    var word = e.target.value; 
    if (word != "") {
        
        searchMovies(word);
    } else {
        
        getMovies();
    }
});

function searchMovies(term) {
    
    var url = 'https://api.themoviedb.org/3/search/movie?api_key=' + myKey + '&query=' + term;
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            
            displayMovies(data.results);
        });
}


// using oop 

function revealOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                
                entry.target.classList.add('show-card');
            } else {
                
                entry.target.classList.remove('show-card');
            }
        });
    }, { 
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    });

    document.querySelectorAll('.movie-card-parent').forEach((card) => {
        observer.observe(card);
    });
}


// to top

let backToTopBtn = document.getElementById('backToTop');
window.onscroll = function () {
    if (window.scrollY > 500) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// pop up
document.getElementById('closePopUp').addEventListener('click', function() {
    document.getElementById('welcomePopUp').style.display = 'none';
});