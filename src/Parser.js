
const { Tokenizer } = require('../src/Tokenizer');




// recrusive parser class
class Parser {
    // Parses a string and returns an AST

    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
        //this.lookahead = null;
    }

    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        this.lookahead = this._tokenizer.getNextToken()// predictive parsing 
        console.log('Lookahead-->',this.lookahead);


        // Parse recursively
        return this.Program();

    }

    _eat(tokenType) {
        console.log('INSIDE _eat-->');
        const token = this.lookahead;
        console.log('Token-->',token);
        console.log('TokenType-->',tokenType);
        
        if(token == null){
            throw new SyntaxError('Unexpected end of input');
        }

        if(token.type !== tokenType){
            throw new SyntaxError(`Expected ${tokenType} but found ${token.type}`);
        }
        
        this._lookahead = this._tokenizer.getNextToken();
        return token;
    }

    // Main Entry point. Numberical Literal
    Program(){
        console.log('INSIDE Program-->');
        return {
            type:'Program',
            body: this.Literal(),
        }
    }

    // There are two types of literals:
    // 1. Numeric literals
    // 2. String literals
    Literal(){
        switch(this.lookahead.type){
            case 'NUMBER': return this.NumberLiteral();
            case 'STRING': return this.StringLiteral();
            
        }
    }


    // This comes from the tokenizer; retunrs the ast nodes
    // What this means is that it only recognizes numeric literals rn
    NumbericalLiteral(){
        console.log('INSIDE NumbericalLiteral-->');
        const token = this._eat('NUMBER');
        return {
            type: 'NumbericalLiteral',
            value: Number(token.value),
        }
    }

    StringLiteral(){
        console.log('INSIDE StringLiteral-->');
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1,-1),
        }
    }


}

module.exports = { Parser };

