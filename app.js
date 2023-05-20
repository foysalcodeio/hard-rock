
function searchSongs(){
    const searchData = document.getElementById('search-field').value
    const url = `https://api.lyrics.ovh/suggest/${searchData}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            keepData = data
            
            document.getElementById('results').innerHTML = '';
            document.getElementById('lyrics-data').innerHTML = '';

            for(let i=0; i<data.data.length; i++){
                const title = data.data[i].title 
                const albumName = data.data[i].artist.name;
                const id = data.data[i].id
                const image = data.data[i].album.cover_small
                
                document.getElementById('results').innerHTML += `
                    <div id="bg" class="single-result row align-items-center my-3 p-3" onMouseOver="this.style.color='rgb(230, 230, 230)'"
                    onMouseOut="this.style.color='white'">
                        <div class="col-md-1">
                            <img src="${image}">
                        </div>
                        <div class="col-md-7">
                            <h3 class="lyrics-name">${title}</h3>
                            <p class="author lead">Album by <span>${albumName}</span></p>
                        </div>

                        <div class="col-md-3 text-md-right text-center">
                            <a><button class="btn btn-light">Get Lyrics</button></a>
                            <a><button onClick="getDetails(${id})" class="mt-auto p-2 btn btn-dark">Show-Details</button></a>
                        </div>

                    </div>
                    `
                if(i==1){
                    document.getElementById('bg').style.backgroundColor = "rgb(10, 0, 0)";
                }
                if(i==9){
                    break
                }           
            }
        })
}

function getDetails(id){
    for(let i=0; i<10; i++){
        if(keepData.data[i].id == id){
            const songId = keepData.data[i].id;
            const photo = keepData.data[i].album.cover_big
            const songRank = keepData.data[i].rank
            const songTitle = keepData.data[i].title
            const download = keepData.data[i].link
            const preview = keepData.data[i].preview
            //console.log(preview)
            document.getElementById('lyrics-data').innerHTML = `
                <div class="container" style="background-color: rgb(0,0,0); border-radius: 50px"  >
                    <h2 class="text-success mb-4">Song Details</h2>
                    <img src="${photo}">
                    <h2>song ID - ${songId}</h2>
                    <h2>song Title - ${songTitle}</h2>
                    <h2>song Rank - ${songRank}</h2>
                    <h3><a target="_blank" href="${download}">Click me for song download</a></h3>
                    <h3 class="preview"><a target="_blank" href="${preview}">Click me for song preview</a></h3>
                </div>  
            `

        }
    }
}
