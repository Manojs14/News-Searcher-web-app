const apiKey= '3ec52b677f3f4b969ac6878649648289'

const blogContainer= document.getElementById("bolg-container");
const searchField=document.getElementById('search-input')
const searchButton=document.getElementById('search-button')


async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apiKey=${apiKey}`
        const response=await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return data.articles;


    } catch(error){
        console.error("Error Fetching random news ", error)
        return[ ]
    }
}

searchButton.addEventListener('click', async ()=>{
    const query=searchField.value.trim()
    if(query !== ""){
        try{
            const articles= await fetchNewsQuery(query)
            displayBlogs(articles)

        }catch(error){
            console.log("Error Fetching random news by query", error)
        }
    }
})


async function fetchNewsQuery(query){ 
    try{
    const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`
    const response=await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    if(data.totalResults=== 0){
        document.querySelector(".Nonews h1").style.display="flex";
        document.querySelector(".bolg-container").style.display="none";
    }
    else{
        document.querySelector(".Nonews h1").style.display="none";
    return data.articles;
    }

} catch(error){
    console.error("Error Fetching random news ", error)
    return[ ]
}
}

  function displayBlogs(articles){
    blogContainer.innerHTML=""
    articles.forEach((article ) => {
        const blogCard =document.createElement("div");
        blogCard.classList.add("blog-card");

        const img=document.createElement("img");
        img.src=article.urlToImage || "https://placehold.jp/600x400.png";
        img.alt=article.title || "Image title not avilable";


        const title=document.createElement("h2");
        const truncatedTitle = article.title && article.title.length >30? article.title.slice(0,30) + "...."
        : article.title || "No title Available"; title.textContent = truncatedTitle;

        const description =document.createElement("p");
        const truncatedDes =article.description&&  article.description.length >120? article.description.slice(0,120) + "...."
        : article.description || "No Description Available"; description.textContent = truncatedDes;


        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        })
        blogContainer.appendChild(blogCard);
    });
  }  

    (async ()=>{
        try{
           const articles= await fetchRandomNews();
           displayBlogs(articles);
        } catch(error){
            console.error("Error Fetching random news ", error);
        }
    })();

