objects = []
status_1 = ""

function preload() 
{
    video = createVideo('video.mp4')
}
function setup() 
{
    canvas = createCanvas(500, 400)
    canvas.center()
    video.hide()
}
function start() 
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status_1").innerHTML = "Status = Object Detecting"
}
function modelLoaded() 
{
    console.log("Model IS Loaded")
    status_1 = true
    video.loop()
    video.speed(1)
    video.volume(0)
}
function gotResult(error, results) 
{
    if (error) 
    {
        console.log("error")
    } 
    else 
    {
        console.log("results")
        objects = results
    }
}
function draw() 
{
    image(video, 0, 0, 500, 400)

    if (status_1 != "") 
    {
        objectDetector.detect(video, gotResult)
        for(i=0; i < objects.length; i++)
        {
            document.getElementById("status_1").innerHTML = "Status : Objects Detected"
            document.getElementById("det_obj").innerHTML = "The number of objects detected are:"+ objects.length

            fill("red")
            
            percent = floor(objects[i].confidence * 100)
            object_name = objects[i].label + " "+ percent + "%"

            text(object_name, objects[i].x +15, objects[i].y +15)

            noFill()
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width)
        }
    }
}