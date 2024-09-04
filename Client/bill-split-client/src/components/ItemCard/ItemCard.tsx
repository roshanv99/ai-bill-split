import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  useContext,
  useEffect,
} from "react";
import "./ItemCard.css";
import {
  Avatar,
  Item,
  ItemUserMap,
  User,
  UserProportions,
} from "../../types/types";
import AvatarContainer from "../AvatarContainer/AvatarContainer";
import { UserItemContext } from "../../context/UserItemContext";

type ItemCardProps = {
  item: Item;
};
const ItemCard = ({ item }: ItemCardProps) => {
  const userItemContext = useContext(UserItemContext);

  const dragoverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("flipped-card");
    event.dataTransfer.dropEffect = "move";
    // if(!event.currentTarget.classList.contains("wiggle"))
    event.currentTarget.classList.add("wiggle");
  };

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove("wiggle");
  };

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    let userData: User = JSON.parse(
      event.dataTransfer.getData("application/json")
    );
    let itemList: Item[] = [...userItemContext.itemList].map((ele: Item) => {
      if (ele.id == item.id) {
        let user: User = {
          name: userData.name,
          gender: userData.gender,
          avatar: userData.avatar,
        };
        return {
          ...ele,
          contributers:
            ele.contributers.length > 0 ? [...ele.contributers, user] : [user],
        };
      } else {
        return ele;
      }
    });
    userItemContext.editItem(itemList);
    event.currentTarget.classList.remove("wiggle");
  };

  useEffect(() => {
    //Future: Try to make this Binary Search for no reason
    //Future: useMemo cuz this is getting called multiple times
    for (let ele of userItemContext.itemList) {
      if (ele.id == item.id) {
        divideProportionsEqually();
        return;
      }
    }
  }, [item.contributers]);

  useEffect(() => {
  }, [userItemContext.itemUserPortion])

  const divideProportionsEqually = () => {
    let userProportions: ItemUserMap = { ...userItemContext.itemUserPortion };
    let noOfContributers = item.contributers.length;
    let newContributers: UserProportions = {};
    console.log(item.id, " ==> ", item.contributers)
    item.contributers.forEach((ele) => {
      newContributers[ele.name] = +((newContributers[ele.name] || 0) + (item.item_quantity / noOfContributers)).toFixed(2);
    });
    
    userProportions[item.id] = newContributers;
    console.log("!!: ", userProportions, newContributers)
    userItemContext.setItemUserPortion(userProportions);
  };

  function flipCard(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    event.currentTarget.classList.toggle("flipped-card");
  }

  return (
    <div
      onDragOver={dragoverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
      onDoubleClick={flipCard}
      className="item-card-parent"
    >
      <div className="card-front">
        <div className="item-card-title">{item.item_name}</div>
        <div className="item-card-info">
          <div className="item-card-info-quantity">
            <label className="sub-heading" htmlFor="">
              Quantity
            </label>
            <span>{item.item_quantity}</span>
            {/* {item.item_quantity > 1 ? <p><a href="">Split</a></p> : null} */}
          </div>
          <div className="item-card-info-price">
            <label className="sub-heading" htmlFor="">
              Price
            </label>
            <span>{item.item_price}</span>
          </div>
        </div>
        <div
          className="item-card-info"
          style={{ flexDirection: "column", overflowY: "auto" }}
        >
          <label className="sub-heading" htmlFor="">
            Contributers
          </label>
          <div className="item-card-contributers">
            {item.contributers?.length == 0 ? (
              <label htmlFor="">No Contributers</label>
            ) : (
              <div className="contributer-list">
                {item.contributers?.map((contributer, index) => (
                  <div key={index} className="contributer-avatar">
                    <AvatarContainer
                      user={{
                        name: contributer.name,
                        gender: contributer.gender,
                        avatar: contributer.avatar,
                      }}
                      showNameFlag={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="card-back">
        <h2 style={{ marginTop: 0 }}>Distribution: </h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Portion</th>
            </tr>
          </thead>
          <tbody>
            {userItemContext.itemUserPortion[item.id] &&
              Object.keys(userItemContext.itemUserPortion[item.id]).map(
                (contributer, index) => (
                  <tr key={index} className="contributer-avatar">
                    <td>{contributer}</td>
                    <td>
                      {userItemContext.itemUserPortion[item.id][contributer]}
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td></td>
                <td>
                {userItemContext.itemUserPortion[item.id] &&
                  Math.ceil(Object.values(userItemContext.itemUserPortion[item.id]).reduce(
                    (partialSum, value) => (partialSum + value),0
                  ))}
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemCard;
