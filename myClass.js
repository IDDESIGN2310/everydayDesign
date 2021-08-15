class Product{


    constructor(x, y, pName, client, pDesigner, pYear, pDes, sw, sh, image, color){
        this.x = x;
        this.y = y;
        this.pn = pName;
        this.cl = client;
        this.pd = pDesigner;
        this.ye = pYear;
        this.des = pDes;
        this.tw = sw-this.x*2.1;
        this.th = sh*0.5;
        this.gap = sh*0.03;
        this.pn_pos = sw+50;
        this.cl_pos = sw+35 //this.pn_pos+this.gap+20;
        this.pd_pos =this.cl_pos+this.gap;
        this.ye_pos =this.pd_pos+this.gap;
        this.des_pos = sh*0.1;
        this.img_pos = sh*0.05;
        this.img = image;
        this.thumbImag = image;
        this.sw = sw;
        
        
        this.doShowText = false;
        this.clicked = false;
        this.bx = 175//this.sw-this.x-50
        this.by = sw + ( sh-sw )/6//this.sw+100
        this.r = sw*0.15//150
        this.textIcon = loadImage("assets/UI/ticon.png")
        this.mask = loadImage("assets/UI/maskLarge.png")
        this.color = color

        this.fontSize = this.sw*0.035
        this.fontLeadingBody = this.fontSize*1.4
        this.fontLeadingTitle = this.fontSize*1.2

    }


    textToggle(){
        if(dist(this.bx,this.by,mouseX,mouseY)<this.r/2){
             this.doShowText =! this.doShowText ;
        }
    }



    display(){

        // start product image 
        push()
            let offsetImage = 0;
            imageMode(CENTER);
            noTint();
            image(this.img, this.sw/2, this.sw/2, this.sw+offsetImage, this.sw+offsetImage);
            fill(255)
        pop()
        // end product image

        //White bg
        noStroke()
        fill(255)
        rect(0,this.sw, this.sw, this.sw)
        //white bg
        
        //textFont(font_major)
       
        textAlign(LEFT);
        fill(0);

        //textSize(60);
        //textLeading(60);
        //textStyle(BOLD);
        //text(this.pn.toLowerCase(), this.x, 100, this.sw/2-100, this.th);
        //textSize(80);let asc = textAscent()*0.25

        //--- Product title and information --- start//
        textStyle(BOLD)
        //textFont(font_rubik)
        textSize(this.fontSize);
        textLeading(this.fontLeadingTitle);
        let textDetail = this.pn+" ("+ this.ye+")"+"\n"+"Client: "+this.cl+"\n"+"Designer: "+this.pd
        text(textDetail, this.x+this.r+50, this.by-this.r/2+10, this.tw-200, 300);
        //text(textDetail, this.x+this.r+50, this.cl_pos, this.tw-200, 300);
        this.by
        //--- Product title and information -- end //
    
        //---- Show hide product description -- start
        if(this.doShowText){
            textStyle(NORMAL)
            textSize(this.fontSize)
            textLeading(this.fontLeadingBody);
            noStroke();
            fill(255,245)
            rect(0,0,this.sw,this.sw)
            fill(0);
            text(this.des, this.x, 100, this.tw, this.th);
        }
        //--- show hide product descripttion end

        // --- start icon / thumb nail show hide
        push()
        imageMode(CENTER);
            if(this.doShowText){
                fill(255)
                let pwid = textWidth("–")
                
                    
                    //this.thumbImag.mask(this.mask);
                    image(this.thumbImag, this.bx, this.by, this.r, this.r)
                    stroke(0,40)
                    strokeWeight(20)
                    noFill()
                    circle(this.bx, this.by, this.r ,this.r);
                    noStroke()

            }else{
                fill(255)
                let mwid = textWidth("+")
                tint(this.color )
                image(this.textIcon, this.bx, this.by,this.r,this.r)
            
            }
        pop()
        //-- end icon / thumb nail show hide
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