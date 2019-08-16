const URL = 'https://www.googleapis.com/youtube/v3/playlistItems'
// const id = "PLhURsu87NO8u4SufTuhLST2umbNKuYj92";
const id = 'PL6IZsZ1jgdAike3Rpu1Su4nC6dWRerTj6'
const API_key = 'AIzaSyDhkWMhb6OAvIVLkrmwbxnI8J7k5A5XQnU' // this is my personal api key. you can generate your own on the google developer console
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
    const mainVideo = document.querySelector('iframe.main-video')
    mainVideo.src = `https://www.youtube.com/embed/${data.items['0'].snippet.resourceId.videoId}`
    return data
  })
  .then(data => {
    resultsLoop(data)
  })
  .catch(error => {
    console.log(error)
  })

function resultsLoop(data) {
  const cardContainer = document.querySelector('.container')
  const mainVideo = document.querySelector('iframe.main-video')

  data.items.forEach(item => {
    const thumb = item.snippet.thumbnails.default.url
    const title = item.snippet.title
    const description = `${item.snippet.description.substring(0, 250)}...`
    const vidId = item.snippet.resourceId.videoId

    cardContainer.appendChild(youtubeCardCreator(thumb, title, description, vidId, mainVideo))
  })
}


function youtubeCardCreator(thumb, titleText, descText, dataKey, main) {
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

  const pullMain = function (main) {
    return pullMain(main)
  }

  card.addEventListener('click', () => {
    changeVidSource(main)
  })

  function changeVidSource(main) {
    main.src = `https://www.youtube.com/embed/${dataKey}`
  }

  return card
}
