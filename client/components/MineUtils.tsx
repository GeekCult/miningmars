

export class MineUtils {
    
    public getNr(){
        return  Math.floor(Math.random() * 5);
    }
    
    public randomNumber(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
};

export const mineUtils = new  MineUtils();