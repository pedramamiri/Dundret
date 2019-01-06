function Calculator(specifi){
    
    this.length    = specifi.length;
    this.age       = specifi.age;
    this.classic   = specifi.classic;
    this.freeStyle = specifi.freeStyle;
    this.data      = {
        err:{
            status:false,
            msg:""
        }
    }

    this.calculation = ()=>{
        if(this.classic && this.length > 207 ){
            this.data.err = {status :true,msg:'Klassiska skidor tillverkas bara till längder upp till 207cm'}
        }else if(this.age <= 4){
            this.data.skiLength = this.length
            this.classic ? this.data.type = 'classic' : this.data.type = 'freeStyle';

        }else if(this.age >= 5 && this.age <= 8){
            this.data.skiLength = {min:this.length + 10, max:this.length + 20}
            this.classic ? this.data.type = 'classic' : this.data.type = 'freeStyle'

        }else if(this.age > 8){
            if(this.classic){
                this.data.skiLength = this.length + 20
                this.data.type = 'classic';
            }
            if(this.freeStyle){
                this.data.skiLength = {min:this.length + 10 , max:this.length + 15}
                this.data.type = 'freeStyle';
            }
        }
        return this.data

    }
        
    return {
        calculation : this.calculation
    }

}

module.exports = { Calculator };