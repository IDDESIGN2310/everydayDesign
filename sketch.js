let data ={};
let products =[];
let sw = 0;
let sh = 0;
let shgap = 0;
let pImags = [];
let maxNum = 35;
let doShowUIforNextPrev = true;

let iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false );
let ua = navigator.userAgent.toLowerCase();
let isAndroid = ua.indexOf("android") > -1;

let currentId = 0;
let nextBtn
let prevBtn
let nextGroupBtn  
let prevGroupBtn
let font_major
let font_rubik
let samLogo
let monashLogo
let pointToRight
let pointToLeft
let nextGroupColor
let prevGroupColor
let currentGroup
let nextGroupID
let prevGroupID
let currentGroupColor
let ca_r = [203, 0, 88, 50, 95, 252, 246, 202, 255]
let ca_g = [190, 0, 55, 76,184, 114, 22, 205, 205]
let ca_b = [144, 0, 32, 181, 71, 44, 38, 206, 51]

function preload() {
  data = loadJSON('assets/contents.json');
  sw = windowWidth;
  sh = windowHeight;
  shgap = sh/100

  /*let pdata = data['products'];

  for(let i=0; pdata.length;i++){
    pImags[i].push ( loadImage ("assets/p_imgs"+pdata[i]+".jpg") )
  }*/
  //loading font
  font_major = loadFont('assets/fonts/RubikMonoOne-Regular.ttf')
  //loadFont('assets/fonts/Rubik-Italic-VariableFont_wght.ttf')
  font_rubik = loadFont('assets/fonts/Rubik-VariableFont_wght.ttf')
  samLogo = loadImage("assets/UI/samlogo_rescale.png")
  monashLogo = loadImage("assets/UI/monashlogo_rescale.png")
  pointToLeft = loadImage("assets/UI/pointToLeft.png")
  pointToRight = loadImage("assets/UI/pointToRight.png")

  
}

function loadData(){
  let productData = data['products']
  let mColor = color(0)
  for(let i=0; i< productData.length; i++){
    let p = productData[i]
    //print(p)
    designer = p.Designer1+" "+p.Designer2;
    img = loadImage ("assets/p_imgs/"+p.Img_name+".jpg")
    products.push(new Product(
      sw*0.1, 
      sw*0.1, 
      p.Product, 
      p.Client,
      designer,
      p.Year, 
      p.Description,sw,sh,
      img,
      mColor
        ),
      );
  }


  pixelDensity(2.0); 
}


function setup() {
  print(sw)
  createCanvas(sw, sh);

  currentGroup = 0;
  currentGroupColor = color( ca_r[currentGroup],ca_g[currentGroup],ca_b[currentGroup])
  
  loadData();
  print(pixelDensity())
  uiSetup();

  finNexPreGroup(currentGroup,nextGroupBtn, prevGroupBtn)
}

function draw() {

  background(255);

  //current product
  products[abs(currentId)].color = currentGroupColor
  products[abs(currentId)].display();

  if(doShowUIforNextPrev){
      nextBtn.color = currentGroupColor
      prevBtn.color = currentGroupColor
      nextBtn.display()
      prevBtn.display()

      nextGroupBtn.color = nextGroupColor
      nextGroupBtn.display()
      prevGroupBtn.color = prevGroupColor
      prevGroupBtn.display()

      //current Group indicator
      push()
        imageMode(CORNER)
        tint(currentGroupColor)
        let scaleOfIndicator = 4
        let indicatorW = 85*scaleOfIndicator
        let indicatorH = 99*scaleOfIndicator
        image(pointToLeft, sw-indicatorW*0.7, -(indicatorH)/2, indicatorW, indicatorH)
      pop()
    //  nextBtn.CheckOvered() 
  }
  fill(255,0,0)
  //ellipse(mouseX, mouseY, 50, 50)
  footer(100, sh-shgap*10, 200, 69,1.5)

 // ellipse(sw/2, sh-600, 50, 50)
}

  function mouseClicked(){
    products[currentId].textToggle();
    if(nextBtn.clicked()){
      npAction(1, 0, 9, currentGroup)
    }
    if(prevBtn.clicked()){
      npAction(-1,0,9,currentGroup)
    }

    if(nextGroupBtn.clicked()){
      npGAction(1)
      finNexPreGroup(currentGroup, nextGroupBtn, prevGroupBtn)
    } 
    if( prevGroupBtn.clicked()){
      npGAction(-1)
      finNexPreGroup(currentGroup, nextGroupBtn, prevGroupBtn)
    }
  }



function uiSetup(){
  let colorNextPrevBtn = color(0, 120)

  // next/prev items
  let npSize = 100
  let aspectio = 85/99
  let uipos = sh-shgap*25
  nextBtn = new UIBtn(sw/2+50, uipos, 100*aspectio, 100,pointToRight, colorNextPrevBtn)
  prevBtn = new UIBtn(sw/2-50, uipos, 100*aspectio, 100,pointToLeft, colorNextPrevBtn)
  
  // next/prev group
  let groupBtnSize = 250;
  nextGroupBtn = new UIBtn(sw-groupBtnSize*aspectio/2,uipos,groupBtnSize*aspectio,groupBtnSize, pointToLeft, colorNextPrevBtn)
  prevGroupBtn = new UIBtn(groupBtnSize*aspectio/2,uipos,groupBtnSize*aspectio ,groupBtnSize, pointToRight, colorNextPrevBtn)

}

function npAction(direction, min , max, cG){
  let loopMin = cG*9
  let loopMax = loopMin + max

  //if(currentId >= min && currentId <= max){
  currentId = constrain( (currentId+direction), loopMin, loopMax)
  //}
  print(currentId)
}

function npGAction(direction){
    currentGroup = constrain( (currentGroup+direction), 0, 8)
    print( currentGroup)
   
}

function footer(x, y, w, h, scale){
  push()
    imageMode(CORNER)
    noTint()
    image(samLogo, sw/2-w*scale, y, w*scale, h*scale)
    image(monashLogo, sw/2+30, y, w*scale, h*scale)
  pop()
}

function finNexPreGroup(curID, nextGbtn, preGbtn){
    if (curID == 8){
      nextGroupID = 0;
      prevGroupID = curID -1;
    }else if (curID == 0){
      nextGroupID = curID+1;
      prevGroupID = 8;
    }else{
      nextGroupID = curID +1;
      prevGroupID = curID -1;
    }

    nextGroupColor = color( ca_r[nextGroupID],ca_g[nextGroupID],ca_b[nextGroupID])
    prevGroupColor = color( ca_r[prevGroupID],ca_g[prevGroupID],ca_b[prevGroupID])
    currentGroupColor = color( ca_r[curID],ca_g[curID],ca_b[curID])
    print(nextGroupID)

    currentId = 9 * curID;

}
/*
need to add this part for android / ISO
if(isAndroid){
  function mouseClicked(){
    products[currentId].textToggle();
    if(nextBtn.clicked()){
      nextAction()
    }
  }
}else if(ios){
  function mouseReleased(){
    products[currentId].textToggle();
    if(nextBtn.clicked()){
      nextAction()
    }
  }
}else{
  }
}
*/
