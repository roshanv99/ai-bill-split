import React, { useState,createContext, useEffect } from 'react';
import { Item, ItemUserMap, User, UserProportions } from '../types/types';
import { DUMMY_ITEM_RESPONSE } from '../dummy_data';

export type UserItemContextType = {
    userList:User[],
    addUser: (user:User) => void
    itemList:Item[],
    addItem: (item:Item) => void
    removeItem: (item:Item) => void
    editItem: (itemList:Item[]) => void
    itemUserPortion:ItemUserMap,
    setItemUserPortion:(itemUserPortion:ItemUserMap) => void
 }

export const UserItemContext = createContext<UserItemContextType>({
    userList : [],
    addUser:(user:User) => {},
    itemList:[],
    addItem:(item:Item) => {},
    removeItem:(item:Item) => {},
    editItem:(itemList:Item[]) => {},
    itemUserPortion: {},
    setItemUserPortion:(itemUserPortion:ItemUserMap) => {}
});

const UserItemContextProvider = ({children}:any) => {
    const [userList, setUserList] = useState<User[]>(
        [
            {
                "name": "Test User 1",
                "gender": null,
                "avatar": {
                    "id": 1,
                    "gender": null,
                    "color": "#8d5524",
                    "background": "#ffff"
                }
            },
            {
                "name": "Test User 2",
                "gender": null,
                "avatar": {
                    "id": 1,
                    "gender": null,
                    "color": "#8d5524",
                    "background": "#ffff"
                }
            },
            {
                "name": "Test User 3",
                "gender": null,
                "avatar": {
                    "id": 2,
                    "gender": null,
                    "color": "#c68642",
                    "background": "#ffff"
                }
            }
        ]
    );
    const [itemList, setItemList] = useState<Item[]>(DUMMY_ITEM_RESPONSE);
    const [itemUserPortion, setItemUserPortion] = useState<ItemUserMap>({})

    useEffect(()=> {
    },[userList]);



    const addUser = (user:User) => {
        setUserList([...userList,user])
    }

    const addItem = (item:Item) => {
        setItemList([...itemList,item])
    }

    const editItem = (item:Item[]) => {
        setItemList(item)
    }

    const removeItem = (item:Item) => {
        // setItemList([...userList,item])
    }

    
    return <UserItemContext.Provider value={{userList,addUser,itemList,addItem,removeItem,editItem,itemUserPortion, setItemUserPortion}}>{children}</UserItemContext.Provider>;
};

export default UserItemContextProvider;