const URL = 'https://www.googleapis.com/youtube/v3/playlistItems'
const id = "PLhURsu87NO8u4SufTuhLST2umbNKuYj92";
const API_key = 'AIzaSyBjwNNmFU6rxbPEgLOtAoEz184wW-ZFfAI'
const params = {
  part: "snippet",
  playlistId: id,
  key: API_key,
  maxResults: 25
}

axios
  .get(URL, { params: params })
  .then(response => {
    const data = response.data
    console.log(data)
    // reference the main video in the DOM
    const mainVideo = document.querySelector('iframe.main-video')
    // set the default source to the first video in the array from the api
    mainVideo.src = `https://www.youtube.com/embed/${data.items['0'].snippet.resourceId.videoId}`
    // pass the data along to the next .then()
    return data
  })
  .then(data => {
    // call the resultsLoop function, passsing the data along as its only parameter
    resultsLoop(data)
  })
  .catch(error => {
    console.log(error)
  })

function resultsLoop(data) {
  // get the container and main video DOM elements
  const cardContainer = document.querySelector('.container')
  const mainVideo = document.querySelector('iframe.main-video')

  data.items.forEach(item => {
    // for each of the data, store the thumb, title, description, and vidId in a variable
    const thumb = item.snippet.thumbnails.default.url
    const title = item.snippet.title
    const description = `${item.snippet.description.substring(0, 250)}...`
    const vidId = item.snippet.resourceId.videoId

    // now append a new card to the card container at each iteration. The youtubeCardCreator handles the shape of the card
    cardContainer.appendChild(youtubeCardCreator(thumb, title, description, vidId, mainVideo))
  })
}


function youtubeCardCreator(thumb, titleText, descText, dataKey, main) {
// create DOM elements that will be that will be appended onto each new card
  const card = document.createElement('article')
  card.classList.add('video-article')
  card.setAttribute('data-key', dataKey)

  const image = document.createElement('img')
  image.classList.add('thumb')
  image.src = thumb
  image.alt = 'YouTube Video Thumbnail'
  card.appendChild(image)

  const details = document.createElement('div')
  card.appendChild(details)

  const title = document.createElement('h4')
  title.textContent = titleText
  details.appendChild(title)

  const desc = document.createElement('p')
  desc.textContent = descText
  details.appendChild(desc)

<<<<<<< HEAD
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
  
=======
  const pullMain = function(main) {
    return pullMain(main)
  }

>>>>>>> 18ec6116d9d358315b4d969fc893d43119471f08
//   attach a click listener that will call the changeVidSource function, which, well, changes the main video source :)
  card.addEventListener('click', () => {
    changeVidSource(main)
    // after changing the main vid source, scroll to the top to view the video
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })

  function changeVidSource(main) {
//   dynamically updates the main video source based on the dataKey, which is the ID of the video of the clicked card
    main.src = `https://www.youtube.com/embed/${dataKey}`
  }

  return card
}
