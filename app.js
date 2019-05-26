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
          Twitter()
      })

      if(instahandle != '')
      {
        xhr.open('GET',`https://www.instagram.com/${instahandle}/?__a=1`)
        xhr.send()
      }
      else
      {
        Twitter()
      }
    }

    //// Twitter
    function Twitter(){
      let thr = new XMLHttpRequest;
      var respt = 0;
      thr.addEventListener('load',function(){
          respt = JSON.parse(this.responseText)
          console.log(respt)
          twitterfollowers = respt[0].followers_count;
          console.log('twitter ' + twitterfollowers + ' ')
          Youtube()
        })
      thr.addEventListener('error',function(){
          console.log('error');
          Youtube()
      })

      if(twitterhandle != '')
      {
        thr.open('GET',`https://cors-anywhere.herokuapp.com/https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${twitterhandle}`)
        thr.send()
      }
      else {
        Youtube()
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
          HTMLInject()
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

      if(youtubeURL == '')
      {
        HTMLInject()
      }

    }

    ///// Inject

    function HTMLInject() {

      //Appending all data to Enter div
      console.log(fullname)

        personData.push({name:fullname,nyss_score:Math.ceil((instafollowers*0.4)+(youtubefollowers*0.00015)+(youtubeviews*0.0000015)+(twitterfollowers*0.3)),twitter:twitterfollowers,youtube:youtubefollowers,instagram:instafollowers})
        loadTableData(personData)

    }

}









let sortDirection = false;
let personData = [];
window.onload = function(){
    loadTableData(personData);
}

loadTableData(personData);

function loadTableData(personData){  //this will allows us to enter the data to table
    let tableBody = document.getElementById('Enter');
    let dataHtml="";

    for(let person of personData){
        dataHtml += `<div><tr><td>${person.name}</td><td>${person.nyss_score}</td>
            <td>${person.twitter}</td><td>${person.youtube}</td><td>${person.instagram}</td></tr></div>`;
    }
    //console.log(dataHtml);

    tableBody.innerHTML=dataHtml;
}

function sortColumn(columnName){
    const dataType = typeof personData[0][columnName];
    //console.log(dataType);
    sortDirection = !sortDirection;

    switch(dataType){
        case 'number':sortNumberColumn(sortDirection,columnName);
        break;
        //case 'string':sortStringColumn(sortDirection,columnName);
    }
    //console.log(personData);
    loadTableData(personData);
}

function sortNumberColumn(sort,columnName){
    personData = personData.sort((p1,p2) => {
        return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
    });
}
