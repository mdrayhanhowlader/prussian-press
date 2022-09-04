/* Load All News Start */
const loadAllNews = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json()
    return data.data.news_category
}

/* Load All News End */


/* Set All Menu Start */
const setAllMenu = async () => {
try {

    const data = await loadAllNews()
    const ul = document.getElementById("news-nav")

    data.forEach(news => {
        const li = document.createElement('li')

        li.innerHTML = `
            <li class="nav-item mx-2">
                <a onclick="showProduct('${news.category_id}')" class="nav-link" href="#">${news.category_name}</a>
            </li>
        `
        ul.appendChild(li)
    })
}
catch (error){
    console.log(error);
}
}
setAllMenu()
/* Set All Menu End */


/* Show All News Start */
const showProduct = async event => {
    try {
        const spinner = document.getElementById('spinner')
        spinner.classList.remove('d-none')
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${event}`)
        const data = await res.json()
        const getNews = data.data

        const cardContainer = document.getElementById('card-container')
        cardContainer.textContent = "";
        spinner.classList.add('d-none')

        if(getNews.length > 0) {
            const newsItem = document.getElementById('news-text')
            newsItem.innerText = getNews.length + " Items Found"

        }else {
            const newsItem = document.getElementById('news-text')
            newsItem.textContent = ""
            newsItem.innerText = "No Items Found"
        }


        getNews.forEach(news => {
            const card = document.createElement('div')
            card.classList.add('col-md-12')

            const {thumbnail_url, title, details, author, total_view, rating, image_url} = news

            card.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0" id="card-container">
                    <div class="col-md-3">
                        <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body">
                          <h5 class="card-title pb-2">${title}</h5>
                          <p class="card-text py-4">${details.length > 200 ? details.slice(0, 200) + '...' : details}</p>
                          <p class="card-text mb-16"><small class="text-muted">Last updated 3 mins ago</small></p>

                          <div class="d-flex flex-row justify-content-between align-items-center pr-md-4">
                                
                            <div class="author d-flex flex-row justify-content-between">
                                <div>
                                    <img style="width: 50px; height: 50px; border-radius: 50%;" class="mx-2" src="${author.img ? author.img : "Not Available"}" />
                                </div>
                                <div>
                                    <h5>${author.name ? author.name : "Author Name is not available"}</h5>
                                    <h6>${author.published_date ? author.published_date : "Publish date is not available"}</h6>
                                </div>
                            </div>

                            <div class="view">
                                <h6>
                                <span>
                                <i class="fa-solid fa-eye"></i>
                                </span> ${total_view ? total_view : "No data available"}<span></span></h6>
                            </div>

                            <div>

                            <a style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#newsModal">
                                <i class="fa-solid fa-angle-right"></i>
                            </a>


                    <div class="modal fade" id="newsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <div>
                                    <img class="w-100" src=${image_url} />
                                    </div>
                                <div class="d-flex flex-column justify-content-center">
                                <h5>${title}</h5>
                                <h6>Author: ${author.name ? author.name : "not Available"}</h6>
                                <p>View: ${total_view ? total_view : "not found"}</p>
                                <p>Published Date: ${author.published_date ? author.published_date : "not found"}</p> 
                                <p>Details: ${details ? details : "Not Found"}</p>
                                </div>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>
                            </div>

                    </div>
                </div>
            </div>
            `

        cardContainer.appendChild(card)

        })

    }
    catch (error){
        console.log(error);
    }
}

/* Show All News End */

showProduct('08')

