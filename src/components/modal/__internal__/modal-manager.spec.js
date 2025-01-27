import ModalManager, { ModalManagerInstance } from "./modal-manager";

describe("ModalManager", () => {
  describe("when the addModal method has been called", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const mockModal1 = { foo: "foo" };
    const mockModal2 = { bar: "bar" };

    it("then the element passed in an attribute should be the topmost element", () => {
      ModalManager.addModal(mockModal1, cb1);
      expect(ModalManager.isTopmost(mockModal1)).toBe(true);
      expect(cb1).not.toHaveBeenCalled();

      ModalManager.addModal(mockModal2, cb2);
      expect(ModalManager.isTopmost(mockModal1)).toBe(false);
      expect(ModalManager.isTopmost(mockModal2)).toBe(true);
      expect(cb1).toHaveBeenCalledWith(false);
      expect(cb2).not.toHaveBeenCalled();
    });

    it("global variable window.__CARBON_INTERNALS_MODAL_LIST should have the Modals added", () => {
      expect(window.__CARBON_INTERNALS_MODAL_LIST.length).toEqual(2);
      expect(window.__CARBON_INTERNALS_MODAL_LIST[0]).toEqual({
        modal: mockModal1,
        setTriggerRefocusFlag: cb1,
      });
      expect(window.__CARBON_INTERNALS_MODAL_LIST[1]).toEqual({
        modal: mockModal2,
        setTriggerRefocusFlag: cb2,
      });
    });
  });

  describe("when the clearList method has been called", () => {
    const mockModal = { foo: "bar" };

    beforeEach(() => {
      ModalManager.addModal(mockModal);
    });
    it("then the element passed in an attribute should not be the topmost element", () => {
      expect(ModalManager.isTopmost(mockModal)).toBe(true);
      ModalManager.clearList();
      expect(ModalManager.isTopmost(mockModal)).toBe(false);
    });

    it("global variable window.__CARBON_INTERNALS_MODAL_LIST should have no Modals added", () => {
      expect(window.__CARBON_INTERNALS_MODAL_LIST[0]).toEqual({
        modal: mockModal,
        setTriggerRefocusFlag: undefined,
      });
      ModalManager.clearList();
      expect(window.__CARBON_INTERNALS_MODAL_LIST.length).toEqual(0);
    });
  });

  describe("when the removeModal method has been called", () => {
    const cb1 = jest.fn();
    const cb2 = jest.fn();

    const mockModal1 = { foo: "foo" };
    const mockModal2 = { bar: "bar" };

    beforeEach(() => {
      ModalManager.clearList();
    });

    describe("and the param matches a Modal in the list", () => {
      it("should not be the topmost element", () => {
        ModalManager.addModal(mockModal1, cb1);
        ModalManager.addModal(mockModal2, cb2);
        ModalManager.removeModal(mockModal2);
        expect(ModalManager.isTopmost(mockModal2)).toBe(false);
        expect(cb1).toHaveBeenCalledWith(true);

        ModalManager.removeModal(mockModal1);

        expect(ModalManager.isTopmost(mockModal1)).toBe(false);
      });

      it("does not trigger refocus if no callback is found for passed modal", () => {
        ModalManager.addModal(mockModal1);
        ModalManager.addModal(mockModal2);
        ModalManager.removeModal(mockModal2);
      });

      it("should no longer be in the global variable window.__CARBON_INTERNALS_MODAL_LIST", () => {
        ModalManager.addModal(mockModal1, cb1);
        ModalManager.addModal(mockModal2, cb2);
        expect(window.__CARBON_INTERNALS_MODAL_LIST.length).toEqual(2);
        expect(window.__CARBON_INTERNALS_MODAL_LIST[0]).toEqual({
          modal: mockModal1,
          setTriggerRefocusFlag: cb1,
        });
        expect(window.__CARBON_INTERNALS_MODAL_LIST[1]).toEqual({
          modal: mockModal2,
          setTriggerRefocusFlag: cb2,
        });
        ModalManager.removeModal(mockModal2);
        expect(window.__CARBON_INTERNALS_MODAL_LIST.length).toEqual(1);
        expect(window.__CARBON_INTERNALS_MODAL_LIST[0]).toEqual({
          modal: mockModal1,
          setTriggerRefocusFlag: cb1,
        });
        ModalManager.removeModal(mockModal1);
        expect(window.__CARBON_INTERNALS_MODAL_LIST.length).toEqual(0);
      });
    });

    describe("and the param does not match a Modal in the list", () => {
      it("then nothing happens", () => {
        const mockModal = { foo: "bar" };

        ModalManager.addModal(mockModal);
        ModalManager.removeModal({ some: "value" });
      });
    });
  });

  describe("when the global variable window.__CARBON_INTERNALS_MODAL_LIST already has modals", () => {
    it("the modalList should also contain them", () => {
      const mockModal1 = { foo: "foo" };
      const mockModal2 = { bar: "bar" };
      window.__CARBON_INTERNALS_MODAL_LIST = [
        { modal: mockModal1 },
        { modal: mockModal2 },
      ];
      const Manager = new ModalManagerInstance();

      expect(Manager.isTopmost(mockModal1)).not.toBe(true);
      expect(Manager.isTopmost(mockModal2)).toBe(true);
      Manager.removeModal(mockModal2);
      expect(Manager.isTopmost(mockModal1)).toBe(true);
    });
  });
});
