import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentName:'',
    currentImg:'',
    posts:[],
    people:[
      {
        name:'Andres Montes',
        img:'https://steamavatar.io/iron-man/Download'
      },{
        name:'Ana Gamarra',
        img:'http://mouse.latercera.com/wp-content/uploads/2018/11/capitana-marvel-1.jpg',

      },{
        name:'Miguel',
        img:'https://avatarfiles.alphacoders.com/757/75732.jpg'
      },{
        name:'Isabella',
        img:'https://los40es00.epimg.net/los40/imagenes/2019/03/14/musica/1552563728_835016_1552566180_noticia_normal.jpg'
      }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
