import { Item } from "./types/types";

export const DUMMY_RESPONSE = [
  {
    items: [
      { item_name: "SNOW BERRY", item_quantity: 2, item_price: 375.0 },
      { item_name: "TENNESSEE", item_quantity: 1, item_price: 650.0 },
      {
        item_name: "TRUFFLE MAC N CHEESE",
        item_quantity: 1,
        item_price: 500.0,
      },
      { item_name: "FIVE SPICE CHICKEN", item_quantity: 1, item_price: 450.0 },
      { item_name: "COSMOPOLITION", item_quantity: 1, item_price: 550.0 },
      { item_name: "NOT A BALI COFFEE", item_quantity: 1, item_price: 650.0 },
    ],
    tax_component: 266.62,
    service_charge: 319.5,
  },
];

export const DUMMY_ITEM_RESPONSE:Item[] = [
      {
        id: 1, item_name: "SNOW BERRY", item_quantity: 2, item_price: 375.0,
        contributers: []
      },
      {
        id: 2, item_name: "TENNESSEE", item_quantity: 1, item_price: 650.0,
        contributers: []
      },
      {
        id: 3,
        item_name: "TRUFFLE MAC N CHEESE",
        item_quantity: 1,
        item_price: 500.0,
        contributers: []
      },
      {
        id: 4, item_name: "FIVE SPICE CHICKEN", item_quantity: 1, item_price: 450.0,
        contributers: []
      },
      {
        id: 5, item_name: "COSMOPOLITION", item_quantity: 1, item_price: 550.0,
        contributers: []
      },
      {
        id: 6, item_name: "NOT A BALI COFFEE", item_quantity: 1, item_price: 650.0,
        contributers: []
      },
    ]