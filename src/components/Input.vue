<template>
    <div class="container mt-4">
        <div class="form">
            <div class="input-form">
                <input type="text" v-model="post.description" class="input none-border" name="state" autocomplete="off">
                <label for="state" class="label-state">
                    <span class="normal-title">Escribe aqui tu estado</span>
                </label>
            </div>
        </div>
        <button class="btn btn-radius success mt-2 float-r" @click="toPost()">Publicar</button>
    </div>
    
</template>

<script>
import moment from 'moment';
export default {
    name:'Input',
    data(){
        return{
            post:{
                description:'',
                hour: moment().startOf('hour').fromNow(),
                name:'',
                comments:[],
                url: '',
                reactions:{
                    number:0,
                    likeReaction:false,
                    funReaction:false,
                    angryReaction:false,
                }
            }
        }

    },
    methods:{
        toPost(){
            if(this.post.description!=""){
                this.post.hour = moment().fromNow();
                this.post.name = this.$store.state.currentName;
                this.post.url = this.$store.state.currentImg;
                this.post.reactions = {
                        number:0,
                        likeReaction:false,
                        funReaction:false,
                        angryReaction:false,
                    }
                this.$emit("pushPost",this.post)
                this.post={
                    description:'',
                    hour: moment().startOf('hour').fromNow(),
                    name:this.$store.state.currentName,
                    comments:[],
                    url: this.$store.state.currentImg
                }
            }
            
        }
    },
    

    
}
</script>

<style lang="scss">
@import '../scss/Variables/variables.scss';
.form{
    display: flex;
    flex-direction:column;
    font-size: 16px;
    position: relative;
    width: 100%;
    height: 50%;
    overflow: hidden;
    label{
        position: absolute;
        bottom: 0px;
        left:0px;
        width: 100%;
        height: 100%;
        pointer-events: none;
        ::after{
            content: "";
            position: absolute;
            bottom: -1px;
            left:0px;
            height: 100%;
            width: 100%;
            border-bottom: 3px solid $primaryColor;
            transform: translateX(-100%);
            transition: transform  0.3s ease;
        }
        .normal-title{
            position: absolute;
            bottom: 15px;
            left:0px;
            transition: all 0.3s ease;
        }
    }
    input {
        &:focus + label::after{
            transform: translateX(0%);
        }
        &:focus + label .normal-title {
            transform: translateY(-125%);
            font-size: 14px;
            
        }
        
        
        
        
    }
    
    
}

</style>


