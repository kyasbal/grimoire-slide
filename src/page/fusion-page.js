const Tweenable = require('shifty');
const $$ = gr('#canvas');
const transition = new Tweenable();
const fp = $$(".fusion-page");
fp.on("build",function(i){
  const fusionShader = $$("mesh.fusion-shader");
    const grLogo = $$("mesh.gr-logo");
  switch(i){
    case 1:
      transition.tween({
        from: {
          progress: 0,
        },
        to: {
          progress: 1,
        },
        duration: 1000,
        easing: "easeInOutQuad",
        step: (state) => {
          fusionShader.setAttribute('progress', state.progress);
          grLogo.setAttribute('color',`rgba(255,255,255,${state.progress})`)
        },
      });
  }
});

fp.on("hide",function(){
  $$("mesh.fusion-shader").setAttribute("progress","0");
  $$("mesh.gr-logo").setAttribute('color','rgba(255,255,255,0)');
});