function Search() {
    let username = document.getElementById('username').value;
    console.log(username);
    
    let xhr = new XMLHttpRequest;
    var resp = 0;
    xhr.addEventListener('load',function(){
        resp = JSON.parse(this.responseText)
        console.log(resp.graphql.user.full_name);\
        document.getElementById('Enter').innerHTML += `<div> <p>${resp.graphql.user.full_name}</div>`;
    })

    xhr.addEventListener('error',function(){
        console.log('error');
    })

    xhr.open('GET',`https://www.instagram.com/${username}/?__a=1`)
    xhr.send()

   
}