var audioList = [(new Audio('assets/audio1.mp3')), (new Audio('assets/audio2.mp3'))];

function jukeBox(){
  this.toPlay = audioList[0]

  this.index = 0
  this.tracking

  this.setSound = function(theSound){
    toPlay = theSound;

  }
  this.play = function(){
    try{
      this.tracking.pause()
      this.toPlay.play()
    }
    catch(e){
      console.log(e)
      console.log(this.toPlay)
      this.toPlay.play()
    }
  }
  this.pause = function(){
    this.toPlay.pause();
  }
  this.stop = function(){
    this.toPlay.pause();
    this.toPlay.currentTime = 0;
  }
  this.selectOverRide = function (num){
    console.log(num)
    this.tracking = this.toPlay
    this.toPlay = audioList[num]
    console.log(this.toPlay)
    this.index = num
    document.getElementById("playState").innerText = document.getElementById(num).innerText;

  }
  this.random = function(){
    this.tracking = this.toPlay
    //console.log(audioList.length)
    this.index = Math.floor(Math.random()*(audioList.length))
    console.log(this.index)
    this.toPlay = audioList[this.index]
    document.getElementById("playState").innerText = document.getElementById(this.index).innerText;
  }
  this.next = function(){
    if(audioList.length-1 > this.index){
      this.tracking = this.toPlay
      this.toPlay = audioList[this.index+1]
      this.index++
      document.getElementById("playState").innerText = document.getElementById(this.index).innerText;
      console.log(this.toPlay)
    }
  }
  this.prev = function(){
    this.tracking = this.toPlay
    if(this.index>=1){
      this.toPlay = audioList[this.index-1]
      this.index--
      document.getElementById("playState").innerText = document.getElementById(this.index).innerText;
      console.log(this.toPlay)
    }
  }

}

var jB = new jukeBox();

var tag = false

document.getElementById("hamburger").addEventListener("click", function(event){
//  if(tag === false){
  document.getElementById("menu").style.display = "inline"
  document.getElementById("hamburger").style.display = "none"
  document.getElementById("exitMenu").style.display = "inline"
  //document.getElementById("hamburger").innerText = "X"
  console.log(tag);
  //tag = true
  console.log(tag);

//  }
  /*else {
    document.getElementById("menu").style.display = "none"
    document.getElementById("hamburger").style.display = "inline"
    document.getElementById("exitMenu").style.display = "none"
    //document.getElementById("hamburger").innerText = "="

    tag = false*/


  //}
  console.log(document.getElementById("menu"))
})

document.getElementById("exitMenu").addEventListener("click", function(event){

    document.getElementById("menu").style.display = "none"
    document.getElementById("hamburger").style.display = "inline"
    document.getElementById("exitMenu").style.display = "none"
    console.log(document.getElementById("menu"))
})

var listArray = [document.getElementById("1"),document.getElementById("2")];
for(var i = 0; i<listArray.length; i++){
  document.getElementsByTagName("li")[i].addEventListener("click", function(event){
    console.log(event.target.id)
    jB.selectOverRide(event.target.id)
  })
}

document.getElementById("play").addEventListener("click", function(event){
  jB.play();
})

document.getElementById("pause").addEventListener("click", function(event){
  jB.pause();
})

document.getElementById("stop").addEventListener("click", function(event){
  jB.stop();
})

document.getElementById("random").addEventListener("click", function(event){
  jB.random();
})

document.getElementById("next").addEventListener("click", function(event){
  jB.next();
})

document.getElementById("back").addEventListener("click", function(event){
  jB.prev();
})

document.querySelector("form").addEventListener('submit', function(e){
  e.preventDefault();

  $.ajax({
    url: "https://api.spotify.com/v1/search",
    data:{
      q:document.getElementById("search").value,
      type:"track"
    },
    success: function(response){
      if(response.tracks.total > 0){
        var trackName = document.getElementById("search").value
        console.log(response);
        $("#trackList").append("<li id =" +(listArray.length) +">"+trackName+"</li>")
        audioList.push(new Audio(response.tracks.items[0].preview_url))
        listArray.push(document.getElementById(listArray.length+1));
        console.log(response.tracks.items[0].preview_url)
        document.getElementById(listArray.length-1).addEventListener("click", function(event){
        jB.selectOverRide(event.target.id)
        })
    }

    }
  })

})
