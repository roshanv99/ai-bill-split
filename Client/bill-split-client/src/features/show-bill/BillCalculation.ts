import { UserItemContextType } from "../../context/UserItemContext";
import { Item, User } from "../../types/types";

export type BillType = {
    amount:number,
    item:Item[],
    portion:string[],
}

export default function calculateBill(userItemContext:UserItemContextType) {
    console.log("User-Item Context: ", userItemContext)
    let userBill = new Map<string,BillType>();
    let contri_amount_per_item = 0;
    let item_check_list:string[] = []
    userItemContext.itemList.forEach(ele => {
        //For Each Item: 
        contri_amount_per_item = 0;
        item_check_list = []
        ele.contributers.forEach((ele2:User) => { 
            let elementProportion = ele.item_price * userItemContext.itemUserPortion[ele.id][ele2.name];
            if(item_check_list.includes(ele2.name)) {
                return;
            } else {
                item_check_list.push(ele2.name)
            }
            if(userBill.has(ele2.name)) {
                userBill.set(ele2.name, {
                    amount : userBill.get(ele2.name)!.amount + elementProportion ,
                    item : [...userBill.get(ele2.name)!.item , ele],
                    portion : [...userBill.get(ele2.name)!.portion , `${ele.item_name} : ${elementProportion}`]
                });
            } else {
                userBill.set(ele2.name, {
                    amount : 0 + elementProportion ,
                    item : [ele],
                    portion: [`${ele.item_name} : ${elementProportion}`]
                }); 
            }
        })
    });
    console.log("Final Bill Computed: ", userBill)
    return userBill;
}