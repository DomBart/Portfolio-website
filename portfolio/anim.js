var gear = document.getElementById("gear");
//var withtxt = document.getElementById("with");
var introtxt = document.getElementById("pirmas");
var diliustarr = ["img/D_80Sletter_colored_thick.png",
                  "img/D_80Sletter_colored_thick2.png",
                  "img/D_80Sletter_colored_thick3.png",
                  "img/D_80Sletter_colored_thick4.png",
                  "img/D_80Sletter_colored_thick5.png"];
var diliustindex = 0;
var esigncolor = ["#ca777d", "#a971bc", "#6bbbb1", "#9991cc"];
//var esignfont = ["Work Sans", "sans-serif", "Roboto", "Ubuntu"];
var esignindex = 0;

var elem1 = document.getElementById("CO");
var elem2 = document.getElementById("DE");

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("home").style.top = "0";
    } else {
        document.getElementById("home").style.top = "-10vh";
    }
    prevScrollpos = currentScrollPos;
}

//-------------------------------------------------------------

function WordShuffler(holder, opt) {
    var that = this;
    var time = 0;
    this.now;
    this.then = Date.now();

    this.delta;
    this.currentTimeOffset = 0;

    this.word = null;
    this.currentWord = null;
    this.currentCharacter = 0;
    this.currentWordLength = 0;


    var options = {
        fps: 15,
        timeOffset: 5,
        textColor: '#000',
        fontSize: "30vh",
        useCanvas: false,
        mixCapital: false,
        mixSpecialCharacters: false,
        needUpdate: true,
        colors: [
            '#06E1D9', '#E4E4E4','#B14FD2'
        ]
    }

    if (typeof opt != "undefined") {
        for (key in opt) {
            options[key] = opt[key];
        }
    }



    this.needUpdate = true;
    this.fps = options.fps;
    this.interval = 1000 / this.fps;
    this.timeOffset = options.timeOffset;
    this.textColor = options.textColor;
    this.fontSize = options.fontSize;
    this.mixCapital = options.mixCapital;
    this.mixSpecialCharacters = options.mixSpecialCharacters;
    this.colors = options.colors;

    this.useCanvas = options.useCanvas;

    this.chars = [
        'A', 'B', 'C', 'D',
        'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X',
        'Y', 'Z'
    ];
    this.specialCharacters = [
        '!', '§', '$', '%',
        '&', '/', '(', ')',
        '=', '?', '_', '<',
        '>', '^', '°', '*',
        '#', '-', ':', ';', '~'
    ]

    if (this.mixSpecialCharacters) {
        this.chars = this.chars.concat(this.specialCharacters);
    }

    this.getRandomColor = function () {
        var randNum = Math.floor(Math.random() * this.colors.length);
        return this.colors[randNum];
    }

    this.position = {
        x: 0,
        y: 50
    }

    if (typeof holder != "undefined") {
        this.holder = holder;
    }

    this.getRandCharacter = function (characterToReplace) {
        if (characterToReplace == " ") {
            return ' ';
        }
        var randNum = Math.floor(Math.random() * this.chars.length);
        var lowChoice = -.5 + Math.random();
        var picketCharacter = this.chars[randNum];
        var choosen = picketCharacter.toLowerCase();
        if (this.mixCapital) {
            choosen = lowChoice < 0 ? picketCharacter.toLowerCase() : picketCharacter;
        }
        return choosen;

    }

    this.writeWord = function (word) {
        this.word = word;
        this.currentWord = word.split('');
        this.currentWordLength = this.currentWord.length;

    }

    this.generateSingleCharacter = function (color, character) {
        var span = document.createElement('span');
        span.style.color = color;
        span.innerHTML = character;
        return span;
    }

    this.updateCharacter = function (time) {

        this.now = Date.now();
        this.delta = this.now - this.then;



        if (this.delta > this.interval) {
            this.currentTimeOffset++;

            var word = [];

            if (this.currentTimeOffset === this.timeOffset && this.currentCharacter !== this.currentWordLength) {
                this.currentCharacter++;
                this.currentTimeOffset = 0;
            }
            for (var k = 0; k < this.currentCharacter; k++) {
                word.push(this.currentWord[k]);
            }

            for (var i = 0; i < this.currentWordLength - this.currentCharacter; i++) {
                word.push(this.getRandCharacter(this.currentWord[this.currentCharacter + i]));
            }


            if (that.useCanvas) {
                c.clearRect(0, 0, stage.x * stage.dpr, stage.y * stage.dpr);
                c.font = that.fontSize + " sans-serif";
                var spacing = 0;
                word.forEach(function (w, index) {
                    if (index > that.currentCharacter) {
                        c.fillStyle = that.getRandomColor();
                    } else {
                        c.fillStyle = that.textColor;
                    }
                    c.fillText(w, that.position.x + spacing, that.position.y);
                    spacing += c.measureText(w).width;
                });
            } else {

                if (that.currentCharacter === that.currentWordLength) {
                    that.needUpdate = false;
                }
                this.holder.innerHTML = '';
                word.forEach(function (w, index) {
                    var color = null
                    if (index > that.currentCharacter) {
                        color = that.getRandomColor();
                    } else {
                        color = that.textColor;
                    }
                    that.holder.appendChild(that.generateSingleCharacter(color, w));
                });
            }
            this.then = this.now - (this.delta % this.interval);
        }
    }

    this.restart = function () {
        this.currentCharacter = 0;
        this.needUpdate = true;
    }

    function update(time) {
        time++;
        if (that.needUpdate) {
            that.updateCharacter(time);
        }
        requestAnimationFrame(update);
    }

    this.writeWord(this.holder.innerHTML);


    console.log(this.currentWord);
    update(time);
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

//---------------------------------------------------------------------------------------

function switchHover() {
    var myImage = document.getElementById('dilustr');
    if (diliustindex < diliustarr.length-1) {
        diliustindex++;
    }
    else diliustindex = 0;
    myImage.src = diliustarr[diliustindex];
}

function colorHover() {
    var myText = document.getElementById('esign');
    if (esignindex < esigncolor.length-1) {
        esignindex++;
    }
    else esignindex = 0;
    myText.style.color = esigncolor[esignindex];

}


const introPath = {
    values: [{ x: 0, y: -(window.innerWidth*0.18) }]
};
const rectanglePath = {
    values: [{ x: (window.innerWidth * 0.888), y: 0 }]
};

const patternPath = {
    values: [{ x: 0, y: -500}]
}

const gradientPath = {
    values: [{ x: 0, y: (window.innerWidth*0.58)}]
}

const graphPath = {
    values: [{ x: 1000, y: 0}]
}

const toPath = {
    values: [{ x: (window.innerWidth * 0.3), y: -(window.innerHeight*0.3) }]
}

const tween = new TimelineLite();

tween.add(
    TweenLite.to("#rectangle", 0.8, {
        bezier: rectanglePath,
        ease: Power1.easeInOut,
        delay: 0.2
    })
);
tween.add(
    TweenLite.to("#pirmas", 1, {
        bezier: introPath,
        ease: Power1.easeInOut,
    })
);
const tween1 = new TimelineLite();

tween1.add(
    TweenLite.to("#headerph3", 2, {
        bezier: patternPath,
    })
);

const controller1 = new ScrollMagic.Controller();

const scene1 = new ScrollMagic.Scene({
    triggerElement: ".intro",
    duration: 3000,
    triggerHook: 0,
    reverse: true
})
    .setTween(tween1)
    .addTo(controller1);

const tween2 = new TimelineLite();

tween2.add(
    TweenLite.to("#trecias", 2, {
        bezier: [{ x: (window.innerWidth * 0.3), y: 0 }],
        ease: Power1.easeInOut,
    })
);

tween2.add(
    TweenLite.to("#from", 1.5, {
        bezier: [{ x: -(window.innerWidth * 0.2), y: 0 }],
        ease: Power1.easeInOut,
    })
);

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
    triggerElement: ".connector1",
    duration: (window.innerWidth * 0.6),
    triggerHook: 0.9,
    reverse: true
})
    .setTween(tween2)
    .addTo(controller);

const controller2 = new ScrollMagic.Controller();

const scene2 = new ScrollMagic.Scene({
    triggerElement: ".container3",
    trigggerHook: 1,
    reverse: false
})
    .on("start", function (event) {
        elem1.style.opacity = "1";
        elem2.style.opacity = "1";
        var dataText = new WordShuffler(elem1, {
            textColor: 'black',
            timeOffset: 18,
            mixCapital: true,
            mixSpecialCharacters: true
        });
        var dataText = new WordShuffler(elem2, {
            textColor: 'black',
            timeOffset: 18,
            mixCapital: true,
            mixSpecialCharacters: true
        });

    })
    .addTo(controller2);

if (isMobileDevice() === false) {

    const tween3 = new TimelineLite();

    tween3.add(
        TweenLite.to(".blacksection", 1, {
            bezier: [{ x: (window.innerWidth), y: 0 }],
            ease: Power3.easeInOut,
        })
    );


    const controller3 = new ScrollMagic.Controller();

    const scene3 = new ScrollMagic.Scene({
        triggerElement: ".container3",
        duration: 2000,
        triggerHook: 0,
    })
        .setTween(tween3)
        .setPin(".container3")
        .addTo(controller3);
}

const tween4 = new TimelineLite();

tween4.add(
    TweenLite.to("#gradientoverlay", 1, {
        bezier: gradientPath,
    })
);

const controller4 = new ScrollMagic.Controller();

const scene4 = new ScrollMagic.Scene({
    triggerElement: ".connector1",
    duration: (window.innerHeight*2.2),
    triggerHook: 0.8,
    reverse: true
})
    .setTween(tween4)
    .addTo(controller4);

const tween5 = new TimelineLite();

tween5.add(
    TweenLite.to("#to", 1, {
        bezier: toPath,
        ease: false,
    }),
);

const controller5 = new ScrollMagic.Controller();

const scene5 = new ScrollMagic.Scene({
    triggerElement: ".connector2",
    duration: (window.innerHeight * 2),
    triggerHook: 1,
    reverse: true
})

    .setTween(tween5)
    .addTo(controller5);

window.onresize = keistipoz;

function keistipoz() {
    TweenLite.to("#rectangle", 1, {
        bezier: [{ x: (window.innerWidth * 0.888), y: 0 }]
    })
    TweenLite.to("#pirmas", 1, {
        bezier: [{ x: 0, y: -(window.innerWidth * 0.18) }]
    })
    TweenLite.to(".blacksection", 1, {
        bezier: [{ x: -(window.innerWidth), y: 0 }]
    })
    TweenLite.to("#trecias", 1, {
        bezier: [{ x: (window.innerWidth * 0.3), y: 0 }],
    })
    TweenLite.to("#from", 1, {
        bezier: [{ x: -(window.innerWidth * 0.2), y: 0 }],
    })
    tween2.clear(true);
    scene.removeTween(true);
    tween3.clear(true);
    tween3.add(
        TweenLite.to(".blacksection", 1, {
            bezier: [{ x: (window.innerWidth), y: 0 }],
            ease: Power3.easeInOut,
        })
    );
    scene3.removeTween(true);
    scene3.setTween(tween3);
    scene3.update(true);
};
