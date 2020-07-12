class Player{

    constructor(no, name){
       this.no = no ;
       this.name = name ;
    }
   
    print(){
       console.log('Name is :'+ this.name);
    }
}

module.exports = Player;