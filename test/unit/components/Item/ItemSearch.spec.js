import React from "react";
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import { ItemSearch } from "../../../../src/components/Item/ItemSearch";
import { store } from "../../../../src/store";

describe('ItemSearch', () => {
   test('Can search items', () => {
       const component = renderer.create(
           <Provider store={store}>
               <ItemSearch />
           </Provider>
       );

       let tree = component.toJSON();
       expect(tree).toMatchSnapshot();
   });
});
