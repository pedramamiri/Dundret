function Calculator(specifi){
    
    this.length    = specifi.length;
    this.age       = specifi.age;
    this.classic   = specifi.classic;
    this.freeStyle = specifi.freeStyle;
    this.data      = {}

    this.calculation = ()=>{
        if(this.age <= 4){
            this.data.skiLength = this.length
            this.classic ? this.data.type = 'classic' : this.data.type = 'freeStyle';

        }else if(this.age >= 5 && this.age <= 8){
            this.data.skiLength = {min:this.length + 10, max:this.length + 20}
            this.classic ? this.data.type = 'classic' : this.data.type = 'freeStyle'

        }else if(this.age > 8){
            if(this.classic){
                if(this.length > 207){
                    this.data.err = 'its not legal'
                }else{
                    this.data.skiLength = this.length + 20
                    this.data.type = 'classic';
                }
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