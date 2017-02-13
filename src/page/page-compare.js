const gr = require('grimoirejs').default;
const $ = require('jquery');
const {swifter} = require('./easing');
require('./threejs-main')('#threejs-container .box', 512, 512);
require('./jquery-main')('#jquery-container .box');
require('./grimoire-main')('#compare-canvas', 'mesh');

const $$ = gr('#canvas');

const ace = require('brace');
require('brace/mode/javascript');
const editorConfig = [
  {
    id: 'jquery-editor',
    mode: 'javascript',
  },
  {
    id: 'threejs-editor',
    mode: 'javascript',
  },
  {
    id: 'grimoire-editor',
    mode: 'javascript',
  },
];
editorConfig.forEach((v) => {
  $(`#${v.id}`).on('keyup', (e) => {
    e.stopPropagation();
  });
});
const editors = editorConfig.map((v) => ace.edit(v.id));
editors.forEach((editor, i) => {
  editor.getSession().setMode(`ace/mode/${editorConfig[i].mode}`);
  editor.renderer.setShowGutter(false);
  editor.setFontSize(30);
});

$$('.compare').on('show', () => {
});
$$('.compare').on('build', (i) => {
  switch (i) {
    case 1:
      $('#jquery-container').fadeIn(500, swifter);
      $('#threejs-container').css({
        left: '50%',
      }).fadeIn(500, swifter);
      // $('#background .container').animate({
      //   left: '25%',
      //   right: 'auto',
      // }, 500, swifter).promise().then((this_) => {
      //   $(this_).css({
      //     width: '50%',
      //     left: 'auto',
      //     right: 0,
      //   });
      //   $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
      // });
      break;
    case 2:
      $('#jquery-container .flex').animate({
        height: 300,
      }, 500, swifter);
      $('#threejs-container .flex').animate({
        height: 300,
      }, 500, swifter);
      // $('#compare-editors').delay(500).fadeIn(500, swifter);
      break;
    case 3:
      $('#jquery-container').animate({
        left: '-50%',
      }, 500, swifter);
      $('#threejs-container').animate({
        left: '0%',
      }, 500, swifter);
      $('#grimoire-container .flex').css({
        height: 300,
      });
      $('#grimoire-container').css({
        left: '100%',
      }).show().animate({
        left: '50%',
      }, 500, swifter);
      // $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
      // $$('.compare').find('mesh').setAttribute('scale', 0.8); // find is not work?
      // $$('.compare mesh').setAttribute('scale', 1.6);
      break;
    case 4:
      $('#threejs-container').css({
        transform: 'scale(1)',
      })
      $({
        scale: 1,
      }).animate({
        scale: 0.3,
      }, {
        duration: 500,
        easing: swifter,
        step(now) {
          $('#threejs-container').css({
            transform: `scale(${now})`,
          });
        },
        queue: false,
      })
      $('#threejs-container').fadeOut(500, swifter);
      $('#jquery-container').delay(200).animate({
        left: '0%',
      });
      break;
  }
});
$$('.compare').on('hide', (i) => {
  console.log('hide compare');
  // $('#background .container').removeAttr('style');
  $('.compare-container').hide().removeAttr('style');
  $('.compare-container .flex').removeAttr('style');
  // $$('goml').single().getComponent('CanvasInitializer')._onWindowResize();
});