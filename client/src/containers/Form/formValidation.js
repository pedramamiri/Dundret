function Validator(data){

    this.length    = data.length;
    this.age       = data.age;
    this.classic   = data.classic;
    this.freeStyle = data.freeStyle;
    this.res       = {};


    this.validate = ()=>{
        if (isNaN(this.length) || typeof this.length !== 'number' || this.length < 70 || this.length > 300){
            return this.res = {
                success:false,
                err:'kontrollera längden'
            }
        }
        if(isNaN(this.length) || typeof this.age !== 'number' || this.age < 1 || this.age > 100 ){
            return this.res = {
                success:false,
                err:'kontrollera ålden'
            }
        }
        if(!this.classic && !this.freeStyle){
            return this.res = {
                success:false,
                err:'välja en typ'
            }
        }
        if(this.classic && this.freeStyle){
            return this.res = {
                success:false,
                err:'kontrollera typen'
            }
        }
        
        return this.res = {
            success:true,
            err:false
        } 
    }

    return {
        validate : this.validate
    }
}

module.exports = { Validator };