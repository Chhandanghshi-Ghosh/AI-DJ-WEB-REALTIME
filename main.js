song="";
song2="";
scoreLeftWrist=0;
leftWristX=0;
leftWristY=0;
rightWristY=0;
rightWristX=0;

function preload(){
    song = loadSound("AS IF IT'S YOUR LAST.mp3");
    song2 = loadSound("BOOMBAYAH.mp3");

}

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)

}

function modelLoaded(){
    console.log("Model Loaded!!!!")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)

        scoreLeftWrist=results[0].pose.keypoints[9].score
        console.log('keypoints=' + scoreLeftWrist) 

        leftWristX=results[0].pose.leftWrist.x
        leftWristY=results[0].pose.leftWrist.y
        console.log("Left WristX=" + leftWristX + "Left WristY=" + leftWristY)

        rightWristX=results[0].pose.rightWrist.x
        rightWristY=results[0].pose.rightWrist.y
        console.log("Right WristX=" + rightWristX + "Right WristY=" + rightWristY)

    }
}

function draw(){
    image(video,0,0,600,500);
    fill('#fa0000');
    stroke('#fa0000');

    if(scoreLeftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    number= Number(leftWristY);
    number= toFixed(0);
    volume= number/500;

    document.getElementById("volumeh4").innerHTML='Volume:' + volume;
    song.setVolume(volume);
    console.log('volume=' + volume)
    }
}

function playButton(){
    song.play()
    song.setVolume(0.4)
    song.rate(1)
 }

 function stopButton(){
     song.stop()
     song2.stop()
 }

 function next(){
    song2.play()
    song2.setVolume(0.4)
    song2.rate(1)
    

 }

 