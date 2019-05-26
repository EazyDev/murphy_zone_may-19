function Search() {

  let fullname = document.getElementById('fullname').value;
  let instahandle = document.getElementById('instahandle').value;
  let twitterhandle = document.getElementById('twitterhandle').value;
  let youtubeURL = document.getElementById('youtubehandle').value;
  youtubehandle = (youtubeURL.split("/")[4])

  var instafollowers = 0;
  var twitterfollowers = 0;
  var youtubefollowers = 0;
  var youtubeviews = 0;
  var youtubecomments = 0;

  Instagram()
    // xhr - instagram thr -twitter , yhr - youtube
    ///Instagram

    function Instagram (){

      let xhr = new XMLHttpRequest;
      var resp = 0;
      xhr.addEventListener('load',function(){
          resp = JSON.parse(this.responseText)
          instafollowers = resp.graphql.user.edge_followed_by.count;
          console.log('insta' + instafollowers)
          Twitter()
      })

      xhr.addEventListener('error',function(){
          console.log('error');
      })

      if(instahandle != '')
      {
        xhr.open('GET',`https://www.instagram.com/${instahandle}/?__a=1`)
        xhr.send()
      }
    }

    //// Twitter
    function Twitter(){
      let thr = new XMLHttpRequest;
      var respt = 0;
      thr.addEventListener('load',function(){
          respt = JSON.parse(this.responseText)
          twitterfollowers = respt[0].followers_count;
          console.log('twitter ' + twitterfollowers + ' ')
          Youtube()
        })
      thr.addEventListener('error',function(){
          console.log('error');
      })

      if(twitterhandle != '')
      {
        thr.open('GET',`https://cors-anywhere.herokuapp.com/https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${twitterhandle}`)
        thr.send()
      }
    }

    //Youtube
    function Youtube(){

      let yhr = new XMLHttpRequest;
      var respy = 0;
      yhr.addEventListener('load',function(){
          respy = JSON.parse(this.responseText)
          //console.log(respy)
          youtubeviews = respy.items[0].statistics.viewCount
          youtubefollowers = respy.items[0].statistics.subscriberCount;
          console.log('youtubeviews' + youtubeviews + 'youtubesubs' + youtubefollowers)
          HTMLInject()
      })

      yhr.addEventListener('error',function(){
          console.log('error');
      })

      if((youtubeURL.includes("channel"))&&(youtubeURL != ''))
      {
        yhr.open('GET',`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubehandle}&key=AIzaSyB0UaawDVmtUHXPTIjkynBql-J1A6OlDbo`)
        yhr.send()
      }
      if((youtubeURL.includes("user"))&&(youtubeURL != ''))
      {
        yhr.open('GET',`https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=${youtubehandle}&key=AIzaSyB0UaawDVmtUHXPTIjkynBql-J1A6OlDbo`)
        yhr.send()
      }

    }

    ///// Inject

    function HTMLInject() {

      //Appending all data to Enter div
        document.getElementById('Enter').innerHTML += `<div> <p>${fullname} -> Instagram : ${instafollowers}</p>
                                                            <p> Twitter : ${twitterfollowers} </p>
                                                            <p> Youtube : Subscribers : ${youtubefollowers} </p>
                                                            <p> Youtube : Views       : ${youtubeviews} </p>  </div>`;

    }




}
