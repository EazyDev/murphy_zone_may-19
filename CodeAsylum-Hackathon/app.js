function Search() {

  let fullname = document.getElementById('fullname').value;
  let instahandle = document.getElementById('instahandle').value;
  let twitterhandle = document.getElementById('twitterhandle').value;
  let youtubehandle = document.getElementById('youtubehandle').value;
  youtubehandle = (youtubehandle.split("/")[4])
  console.log(youtubehandle)
// xhr - instagram thr -twitter , yhr - youtube
///Instagram

  let xhr = new XMLHttpRequest;
  var resp = 0;
  xhr.addEventListener('load',function(){
      resp = JSON.parse(this.responseText)
      console.log(resp.graphql.user.full_name);
      document.getElementById('Enter').innerHTML += `<div> <p>${resp.graphql.user.full_name} : ${resp.graphql.user.edge_followed_by.count}</div>`;
  })

  xhr.addEventListener('error',function(){
      console.log('error');
  })

  xhr.open('GET',`https://www.instagram.com/${instahandle}/?__a=1`)
  xhr.send()

//// Twitter
  let thr = new XMLHttpRequest;
  var respt = 0;
  thr.addEventListener('load',function(){
      respt = JSON.parse(this.responseText)
      console.log(respt[0].followers_count);
      //document.getElementById('Enter').innerHTML += `<div> <p>${resp.graphql.user.full_name} : ${resp.graphql.user.edge_followed_by.count}</div>`;
  })

  thr.addEventListener('error',function(){
      console.log('error');
  })

  thr.open('GET',`https://cors-anywhere.herokuapp.com/https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${twitterhandle}`)
  thr.send()

///// Youtube


  let yhr = new XMLHttpRequest;
  var respy = 0;
  yhr.addEventListener('load',function(){
      respy = JSON.parse(this.responseText)
      console.log(respy.items[0].statistics.videoCount)
  })

  yhr.addEventListener('error',function(){
      console.log('error');
  })

  yhr.open('GET',`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubehandle}&key=AIzaSyB0UaawDVmtUHXPTIjkynBql-J1A6OlDbo`)
  yhr.send()


}
