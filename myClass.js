class Product{


    constructor(x, y, pName, client, pDesigner, pYear, pDes, sw, sh, image, color){
        this.x = x;
        this.y = y;
        this.pn = pName;
        this.cl = client;
        this.pd = pDesigner;
        this.ye = pYear;
        this.des = pDes;
        this.tw = sw-this.x*3;
        this.th = sh*0.5;
        this.gap = sh*0.03;
        this.pn_pos = sw+0;
        this.cl_pos = sw//this.pn_pos+this.gap+20;
        this.pd_pos =this.cl_pos+this.gap;
        this.ye_pos =this.pd_pos+this.gap;
        this.des_pos = sh*0.1;
        this.img_pos = sh*0.05;
        this.img = image;
        this.sw = sw;
        
        
        this.doShowText = false;
        this.clicked = false;
        this.bx = this.sw-this.x-50
        this.by = this.sw+70
        this.r = 150
        this.textIcon = loadImage("assets/UI/ticon.png")
        this.mask = loadImage("assets/UI/maskLarge.png")
        this.color = color

    }


    textToggle(){
        if(dist(this.bx,this.by,mouseX,mouseY)<this.r/2){
             this.doShowText =! this.doShowText ;
        }
    }



    display(){

        let offsetImage = -200;
        imageMode(CENTER);
        noTint();
        image(this.img, this.sw/2, this.sw/2+100, this.sw+offsetImage, this.sw+offsetImage);
        fill(255)
        noStroke()
        rectMode(CORNER)
        rect(0,this.sw, this.sw, this.sw)
        
        textFont(font_major)
       
        textAlign(LEFT);
        fill(0);
        textSize(60);
        textLeading(60);
        textStyle(BOLD);
        text(this.pn.toLowerCase(), this.x, 100, this.sw/2-100, this.th);


        textFont(font_rubik)
        textLeading(45);
        textSize(40);
        
        let textDetail = " "+"\n"+"Year: "+ this.ye+"\n"+"Client: "+this.cl+"\n"+"Designer: "+this.pd

        text(textDetail, this.x, this.cl_pos, this.tw, 300);

        //text("Year: "+this.ye, this.x, this.ye_pos,this.tw, this.th);
    
        //descriptiom
        if(this.doShowText){
            textSize(40)
            textLeading(60);
            textStyle(BOLD)
            noStroke();
            fill(255,245)
            rect(0,0,this.sw,this.sw)
            fill(0);
            text(this.des, this.x, 100, this.tw, this.th);
        }



        fill(0)
        //circle(this.bx, this.by, this.r ,this.r);

                //textToggle button visual
        fill(125)
        textSize(80);
        let asc = textAscent()*0.25
        
        if(this.doShowText){
            fill(255)
            let pwid = textWidth("–")
           // let mask = 
            
            this.img.mask(this.mask);
            image(this.img, this.bx, this.by, 150, 150)
            stroke(0,40)
            strokeWeight(20)
            noFill()
            circle(this.bx, this.by, this.r ,this.r);
            noStroke()
        }else{
            fill(255)
            let mwid = textWidth("+")
            tint(this.color )
            image(this.textIcon, this.bx, this.by ,150,150)
            //text("+", this.bx-mwid/2, this.by+asc)
        }
    }


}

class UIBtn{
    constructor(x, y, w, h, img, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        //this.img = image;
        //this.t=text;
        this.over = false;
        this.image = img
        this.color = color
       // this.clicked = false;
    }


    display(){
        push();
            imageMode(CENTER);
            tint(this.color )
            image(this.image, this.x, this.y, this.w, this.h)
            fill(0)
        pop();
        fill(255,0,0)
        //circle(this.x, this.y ,10, 10)
        //rect(this.x,this.y,this.w,this.h)
        
    }

    clicked(){
        let result = false;
        if ( mouseX > this.x-this.w/2 && mouseX < this.x+this.w/2 
            && mouseY > this.y-this.h/2 && mouseY < this.y+this.h/2){
                result = true;
                print("clicked_btn")
        }
        return result;
    } 


}