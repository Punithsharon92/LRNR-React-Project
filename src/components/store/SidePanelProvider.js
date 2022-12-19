import { useReducer } from "react";

import SidePanelContext from "./sidepanel-context";

const defaultState = { items: [] };

// Reducer Function
const sidePanelReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MAINCONTAINER": {
      // adding new Main Container to the tree.
      let updatedItems = state.items.concat(action.item);

      return {
        items: updatedItems,
      };
    }

    case "ADD_SUBCONTAINER": {
      // Finds the parent element and returns it's Index
      const existingContainerIndex = state.items.findIndex(
        (container) => container.id === action.item.parentId
      );

      // Index of Parent element id used and child is Store in it respectively
      const arrayElement = state.items[existingContainerIndex];
      let updatedItem;
      let updatedItems;

      // Replaces old element of the array with new element updated with children
      updatedItem = {
        ...arrayElement,
        children: [...arrayElement.children, action.item],
      };

      // updating the state
      updatedItems = [...state.items];
      updatedItems[existingContainerIndex] = updatedItem;

      return {
        items: updatedItems,
      };
    }

    case "ADD_LEAF": {
      // getting the Main/Root container index
      const existingMainContainerIndex = state.items.findIndex(
        (container) => container.id === action.item.ancestorId
      );

      // getting the Sub container index
      const existingSubContainerIndex = state.items[
        existingMainContainerIndex
      ].children.findIndex((subcontainer) => {
        return subcontainer.id === action.item.parentId;
      });

      const arrayElement =
        state.items[existingMainContainerIndex].children[
          existingSubContainerIndex
        ];

      let updatedItem;
      let updatedItems;

      // Replaces old element of the array with new element updated with children
      updatedItem = {
        ...arrayElement,
        children: [...arrayElement.children, action.item],
      };

      //checks duplicate element and removes(if dispatch runs twice).
      const check = updatedItem.children.filter((leaf) => {
        return leaf.id === action.item.id;
      });
      if (check.length === 2) {
        updatedItem.children.pop();
      }

      // updating the state
      updatedItems = [...state.items];
      updatedItems[existingMainContainerIndex].children[
        existingSubContainerIndex
      ] = updatedItem;

      return {
        items: updatedItems,
      };
    }
    case "ADD_LEAFCONTENT": {
      // Gets the index of Ancestor
      const ancestorIndex = state.items.findIndex((item) => {
        return item.id === +action.item.allIds.ancestorId;
      });

      // Gets the index of Parent
      const parentIndex = state.items[ancestorIndex].children.findIndex(
        (item) => {
          return item.id === +action.item.allIds.parentId;
        }
      );

      //Get the leaf index
      const leafIndex = state.items[ancestorIndex].children[
        parentIndex
      ].children.findIndex((item) => {
        return item.id === +action.item.allIds.id;
      });

      const arrayElement =
        state.items[ancestorIndex].children[parentIndex].children[leafIndex];

      let updatedItem;
      let updatedItems;

      // // Replaces old element of the array with new element updated with contents
      updatedItem = {
        ...arrayElement,
        content: [action.item.content],
      };

      // updating the state
      updatedItems = [...state.items];
      updatedItems[ancestorIndex].children[parentIndex].children[leafIndex] =
        updatedItem;

      return {
        items: updatedItems,
      };
    }

    case "FETCH_DATA": {
      return {
        items: action.item.items,
      };
    }

    default: {
      return defaultState;
    }
  }
};

const SidePanelProvider = (props) => {
  const [sidePanelState, dispatchActions] = useReducer(
    sidePanelReducer,
    defaultState
  );

  // Function to dispatch add Container
  const addContainerHandler = (item) => {
    dispatchActions({ type: "ADD_MAINCONTAINER", item: item });
  };

  // Function to dispatch add Sub-Container
  const addSubContainerHandler = (item) => {
    dispatchActions({ type: "ADD_SUBCONTAINER", item: item });
  };

  // Function to dispatch add Leaf
  const addLeafHandler = (item) => {
    dispatchActions({ type: "ADD_LEAF", item: item });
  };

  const addLeafContentsHandler = (item) => {
    dispatchActions({ type: "ADD_LEAFCONTENT", item: item });
  };

  const fetchData = (items) => {
    dispatchActions({ type: "FETCH_DATA", item: items });
  };

  //Context Value
  const sidePanelContextValue = {
    items: sidePanelState,
    addContainer: addContainerHandler,
    addSubContainer: addSubContainerHandler,
    addLeaf: addLeafHandler,
    addLeafContents: addLeafContentsHandler,
    fetchData: fetchData,
  };

  return (
    <SidePanelContext.Provider value={sidePanelContextValue}>
      {props.children}
    </SidePanelContext.Provider>
  );
};

export default SidePanelProvider;

