export type UserFormType = {
    name : string,
    gender : Gender | null,
    avatar : Avatar | null
}

export type User = {
    name:string,
    gender: Gender | null,
    avatar: Avatar | null,
}

export type Item = {
    id:number,
    item_name:string,
    item_quantity: number,
    item_price:number,
    contributers: User[]
}

export type Avatar = {
    id:number,
    gender : Gender | null,
    color : Color,
    background: string
}

export type Gender = 'male' | 'female' | 'NA';
export type Color = '#ffff00' |'#8d5524' | '#c68642' | '#e0ac69' | '#e0ac69' | '#f1c27d' | '#ffdbac';

export const ItemTypes = {
    AVATAR: 'avatar'
  }

export type ItemUserMap = {
    [itemId: number]: UserProportions;
  };
 
export type UserProportions = {
    [userId: string]: number; 
  };
  
export type StepStatus = {
    [level:string] : 'active' | 'done' | 'not-started'
}