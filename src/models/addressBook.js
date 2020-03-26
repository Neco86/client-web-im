const AddressBookModel = {
  namespace: 'addressBook',
  state: {
    activeMenu: [],
  },
  reducers: {
    setActiveMenu(state, { activeMenu }) {
      return {
        ...state,
        activeMenu,
      };
    },
  },
};
export default AddressBookModel;
