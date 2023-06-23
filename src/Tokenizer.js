
class Tokenizer {

    // TODO: 
    // Pull out the token from a stream
    init(string){
        this._string = string;
        this._cursor = 0; // keep  track of each character
    }

    hasMoreTokens(){
        return this._cursor < this._string.length;
    }

    EOF() {
        return this._cursor == this._string.length;
    }

    getNextToken(){
        if(!this.hasMoreTokens()){
            return null;
        }
        const string = this._string.slice(this._cursor);

        // Numbers; these are just state machines
        if(!Number.isNaN(Number(string[0]))){
            let number = '';
            while(!Number.isNaN(Number(string[this._cursor]))){
                number += string[this._cursor++];
            }

            return {
                type: 'NUMBER',
                value: number,
            };
        }
        
        // Strings
        if(string[0] === '"'){
            // collect all the characters
            let characters = '';
            do {
                characters += string[this._cursor++];
            }while(string[this._cursor] !== '"' && !this.EOF());
            
            characters += this._cursor++;
            
            return {
                type: 'STRING', // token type
                value: characters,
            };
        }

        return null;
    }
}


module.exports = {
    Tokenizer,

}

