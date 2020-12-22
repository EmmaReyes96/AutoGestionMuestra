import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class Usuario {
    constructor(
       public name: string,
       public email: string,
       public google?: string,
       public img?: string,
       public uid?: string  
       
    ){}

    get imgUrl(){
        if(this.img){
            if(this.img.includes('https' || 'http')){
                return this.img;
            }else{
                return `${ base_url }/uploads/user/${ this.img }`;                
            }
        }else{
            return `${ base_url }/uploads/user/not-avalible.png`;
        }
    }
}
