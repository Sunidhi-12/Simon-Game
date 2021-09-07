var level=0;
var started=false;
var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
jQuery(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        newSequence();
        started=true;
    }
})
$(".btn").click(function(e){
    var userChosenColour=e.target.id;
    // var userChosenColour = $(this).attr("id");          ................also this
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animationPress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function newSequence(){
     level++;
   $("#level-title").text("Level "+level);
   var n= Math.floor(Math.random()*4);
   var randomChosenColour=buttonColours[n];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
  
  playSound(randomChosenColour);
  userClickedPattern.length=0;
}
function playSound(name){
    var audio = new Audio(name+".mp3");
    audio.play();
}
function animationPress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startover(){
    level=0;
    started=false;gamePattern.length=0;
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {   console.log("success");
        if(userClickedPattern.length === gamePattern.length){

            setTimeout(newSequence(),1000);
        }
        
    }
    else{
        var audio=new Audio("wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startover();
    }
}