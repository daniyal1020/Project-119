quick_draw_data_set = ['fish', 'clock', 'dragon', 'apple'];
random_number = Math.floor((Math.random()*quick_draw_data_set.length) + 1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById('sketch_name').innerHTML = 'Sketch to be drawn : ' + sketch;
draw_sketch = "";
answer_holder = "";
score = 0;
timer_counter = 0;
timer_check =""; 
function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function draw(){
    strokeWeight(13);
    stroke(0);
    check_sketch();
    if(draw_sketch == sketch){
        answer_holder = 'set';
        score = score + 1;
        document.getElementById('sketch_score').innerHTML = 'Score : ' + score;
    }
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function clearCanvas(){
    background("white");
}

function updateCanvas(){
    background("white");
    random_number = Math.floor((Math.random()*quick_draw_data_set.length) + 1);
    console.log(quick_draw_data_set[random_number]);
    sketch = quick_draw_data_set[random_number];
    document.getElementById('sketch_name').innerHTML = 'Sketch to be drawn : ' + sketch;
}
function check_sketch(){
    timer_counter++;
    document.getElementById('sketch_timer').innerHTML = 'Timer : ' + timer_counter;
    if(timer_counter > 2000){
        timer_counter = 0;
        timer_check = "completed";
    }
    if(timer_check == "completed" || answer_holder == "set"){
        timer_check = "";
        answer_holder = "";
        updateCanvas();
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById('sketch_target').innerHTML = 'Your sketch : ' + result[0].label;
        document.getElementById('sketch_confidence').innerHTML = 'Confidence : ' + Math.round(result[0].confidence * 100) + '%';
    }
}