let search = document.querySelector('#generator')

search.addEventListener('submit', function(e) {
  e.preventDefault()
  let data = new FormData(search);
  let queryString = ""
  let isFirst = true

  for(let pair of data.entries()) {
    //data entries function returns a list of lists
    //use a for loop to build a querystring
    if(isFirst){
      queryString += "?"
      isFirst = false
    }else{
      queryString += "&"
    }
    queryString += `${pair[0]}=${pair[1]}`;
  }


  fetch(`/api${queryString}`)
    .then(response => response.json())
    .then((data) => {
      document.getElementById("result").textContent = data.name
    });
})
