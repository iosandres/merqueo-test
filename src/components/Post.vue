<template>
    <div class="container mtop-2 pab-0 pal-0 par-0">
        <div class="post-header">
            <img v-bind:src="postReceived.url" alt="Avatar" class="mleft-1">
            <div class="content-post-header">
                <div class="post-group-titles">
                    <span class="normal-title">{{this.postReceived.name}}</span>
                    <span class="subtitle">{{this.postReceived.hour}}</span>
                </div>
                <div class="post-description mtop-1">
                    <p>{{this.postReceived.description}}</p>

                </div>
                <transition name="fade">
                    <div class="modal-reactions" v-if="showReaction">
                        <button class="reaction like" @click="addReaction('like')"></button>
                        <button class="reaction fun" @click="addReaction('fun')"></button> 
                        <button class="reaction angry" @click="addReaction('angry')"></button>   
                    </div>
                </transition>
                
                <div class="post-group-buttons mtop-1 mbo-2">
                    <button class="btn btn-radius white pal-0" @click="showModalReaction()" :disabled="disableReaction">Reaccionar</button>
                    <button class="btn btn-radius white pal-0" @click="showInputComment()">Comentar</button>
                </div>
            </div>
        </div>
        <div class="post-reactions border-bottom border-top pag-05">
            <div class="group-reactions">
                <div class="reaction like" v-if="reactions.likeReaction"></div>
                <div class="reaction fun " v-if="reactions.funReaction"></div>
                <div class="reaction angry " v-if="reactions.angryReaction"></div>
                <span class="small-title mleft-1 wei600">{{this.reactions.number}}</span>
            </div>

            <span class="subtitle">{{postReceived.comments.length}} Comentarios</span>
            
        </div>
        <div class="post-comments back-color-comments">
            <div class="post-comments-content pag-05"  v-show="postReceived.comments.length>0" v-for="(item, index) in postReceived.comments" :key="index">
                <img v-bind:src="item.url"  alt="Avatar">
                <div class="post-comments-description">
                    <div class="coments-description-name mar-1">
                        <span class="small-title">{{item.name}}</span>
                        <span class="subtitle">{{item.hour}}</span>
                    </div>
                    
                    <p>{{item.description}}</p>
                </div>  
            </div>
            <div class="flex-center">
                <input type="text" class="input border mtop-1 mbo-1 pag-1" v-if="comentar" v-model="comment.description" @keyup.enter="addComment()" placeholder="Escribe un commentario">
            </div>
            
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    props:['postReceived', 'indexPost'],
    data(){
        return{
            reactions:{
                index:0,
                number:this.postReceived.reactions.number? this.postReceived.reactions.number:0,
                likeReaction:this.postReceived.reactions.likeReaction?this.postReceived.reactions.likeReaction:false,
                funReaction:this.postReceived.reactions.funReaction?this.postReceived.reactions.funReaction:false,
                angryReaction:this.postReceived.reactions.angryReaction?this.postReceived.reactions.angryReaction:false
            },
            showReaction:false,
            comentar:false,
            comments:[], 
            comment:{
               index:0, 
               name:this.$store.state.currentName,
               hour: moment().startOf('hour').fromNow(),
               url: this.$store.state.currentImg,
               description:''
           },
           disableReaction:false
        }
    },
    methods: {
        showInputComment(){
            this.comentar = true;
        },
        addComment(){
            if(this.comment.description!=''){
                this.comment.name = this.$store.state.currentName;
                this.comment.hour = moment().fromNow();
                this.comment.url = this.$store.state.currentImg;
                this.comment.index = this.indexPost;
                this.$emit("pushComment",this.comment)
                this.comment = {}
            }
            
            
        },
        showModalReaction(){
            this.showReaction = true;
        },
        hideModalReaction(){
            this.showReaction = false;
        },
        addReaction(typeReaction){
            //si currentName == 
            this.reactions.number += 1;
            this.disableReaction=true;
            switch (typeReaction){
                case 'like':
                    this.reactions.likeReaction = true;
                    break;
                case 'fun':
                    this.reactions.funReaction = true;
                    break;
                case 'angry':
                    this.reactions.angryReaction = true;
                    break;
                            
            }
            this.hideModalReaction();
            this.reactions.index = this.indexPost;
            this.$emit('pushReaction',this.reactions);

        }
    },


}
</script>
<style lang="scss">

.post-header{
    display: flex;
    justify-content: space-between;
    img{
        width: 8%;
        height: 46px;
        border-radius: 50%;
    }
    .content-post-header{
        width: 80%;
        .post-group-titles{
            display: flex;
            flex-direction: column;
            .normal-title{
                font-size: 16px;
                font-weight: 600;
            }
        }
    }
}
.post-reactions{
    display:flex;
    justify-content: space-between;
    span{
        display: flex;
        align-items: center;
    }
    .group-reactions{
        display: flex;
        span{
            margin-top:0.5rem;
        }
    }
}
.post-comments{
    .post-comments-content{
        display: flex;
        justify-content: space-between;
        img{
            width: 8%;
            height: 46px;
            border-radius:50%;
        }
        .post-comments-description{
            display:flex;
            width: 80%;
            .coments-description-name{
                display: flex;
                flex-direction: column;
            }
            p{
                width: 80%;
            }
        }
    }
    input{
        width: 90%;
        background-color: #fff;

    }
    
    
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 2s
}
.fade-enter, .fade-leave-to {
        opacity: 0
}
</style>

