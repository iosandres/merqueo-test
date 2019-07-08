<template>
  <div id="app">
    <nav class="nav wi-100">
      <span>Hola {{this.$store.state.currentName}}</span>
    </nav>
    <Input  @pushPost="addPostToList($event)"/>
    <Post  @pushReaction="addReaction($event)" v-for="(item, index) in $store.state.posts" :key="index" :indexPost="index" :postReceived="item" @pushComment="addNewComment($event)"/>
  </div>
</template>

<script>
import Input from '@/components/Input.vue'
import Post from '@/components/Post.vue'

export default {
  name: 'App',
  components:{ Input, Post},
  data () {
    return {
      posts:[],
      temp_posts:[]
    }
  },
  methods: {
    addPostToList(newPost){
      
      this.$store.state.posts.push(newPost)
      localStorage.setItem("posts",JSON.stringify(this.$store.state.posts));
    },
    addNewComment(newComment){
      this.$store.state.posts[newComment.index].comments.push(newComment);
      localStorage.setItem("posts",JSON.stringify(this.$store.state.posts));
    },
    addReaction(newReaction){
      this.$store.state.posts[newReaction.index].reactions = newReaction
      localStorage.setItem("posts",JSON.stringify(this.$store.state.posts));
    }
  },
  mounted() {

      let randomIndex = Math.floor(Math.random()* this.$store.state.people.length);
      this.$store.state.currentName = this.$store.state.people[randomIndex].name;
      this.$store.state.currentImg = this.$store.state.people[randomIndex].img;
      if(localStorage.getItem("posts")!=undefined){
        this.$store.state.posts = JSON.parse(localStorage.getItem("posts"));      
      }else{
        this.$store.state.posts = []
      }


      
    
    
  },
 
  
}
</script>

<style lang="scss" src="./scss/main.scss"></style>

