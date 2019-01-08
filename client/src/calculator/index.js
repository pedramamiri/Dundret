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
        if(this.classic && this.length >= 190 && this.length <= 200 ){
            this.data.skiLength = 210
            this.data.type = 'classic';
            
        }else if(this.age <= 4 && this.length <= 130){
            this.data.skiLength = this.length
            this.classic ? this.data.type = 'classic' : this.data.type = 'freeStyle';

        }else if(this.age <= 4 && this.length > 130 && this.length <=150){
            this.data.skiLength = {min:this.length + 10, max:this.length + 20}
            this.classic ? this.data.type = 'classic' : this.data.type = 'freeStyle'

        }else if(this.age >= 5 && this.age <= 8 && this.length <= 150){
            this.data.skiLength = {min:this.length + 10, max:this.length + 20}
            this.classic ? this.data.type = 'classic' : this.data.type = 'freeStyle'

        }else{
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