import React, { useRef } from "react";
import { mount } from "enzyme";
import Modal from "../modal";
import FullScreenHeading from "../../__internal__/full-screen-heading";
import StyledFullScreenHeading from "../../__internal__/full-screen-heading/full-screen-heading.style";
import StyledDialogFullScreen from "./dialog-full-screen.style";
import DialogFullScreen from "./dialog-full-screen.component";
import StyledContent from "./content.style";
import Button from "../button";
import guid from "../../__internal__/utils/helpers/guid";
import Heading from "../heading";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import IconButton from "../icon-button";
import StyledIconButton from "../icon-button/icon-button.style";
import { StyledHeader, StyledHeading } from "../heading/heading.style";
import Help from "../help";

jest.mock("../../__internal__/utils/helpers/guid");

describe("DialogFullScreen", () => {
  guid.mockImplementation(() => "guid-12345");

  let wrapper;
  let onCancel;

  afterEach(() => {
    if (wrapper.exists(DialogFullScreen)) {
      wrapper.unmount();
    }
  });

  it("should have aria-modal attribute on the dialog container", () => {
    onCancel = jasmine.createSpy("cancel");
    wrapper = mount(
      <DialogFullScreen
        onCancel={onCancel}
        className="foo"
        open
        title="my title"
        subtitle="my subtitle"
      >
        <Button>Button</Button>
        <Button>Button</Button>
      </DialogFullScreen>
    );

    expect(
      wrapper
        .find(StyledDialogFullScreen)
        .getDOMNode()
        .getAttribute("aria-modal")
    ).toBe("true");

    wrapper.unmount();
  });

  it("should not have aria-modal attribute on the dialog container if role is not `dialog`", () => {
    wrapper = mount(
      <DialogFullScreen onCancel={onCancel} open title="my title" role="main">
        <Button>Button</Button>
        <Button>Button</Button>
      </DialogFullScreen>
    );

    expect(
      wrapper
        .find(StyledDialogFullScreen)
        .getDOMNode()
        .getAttribute("aria-modal")
    ).toBe(null);

    wrapper.unmount();
  });

  describe("contentRef", () => {
    it("the content ref should be forwarded", () => {
      let mockRef;

      const WrapperComponent = () => {
        mockRef = useRef();

        return (
          <DialogFullScreen
            onCancel={onCancel}
            className="foo"
            open
            title="my title"
            subtitle="my subtitle"
            contentRef={mockRef}
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );
      };

      wrapper = mount(<WrapperComponent />);

      expect(mockRef.current).toBe(wrapper.find(StyledContent).getDOMNode());

      wrapper.unmount();
    });
  });

  describe("autoFocus", () => {
    jest.useFakeTimers();
    it("should focus the dialog container by default", () => {
      wrapper = mount(
        <DialogFullScreen open>
          <input type="text" />
        </DialogFullScreen>
      );

      jest.runAllTimers();

      const dialogContainer = document.querySelector(
        '[data-element="dialog-full-screen"]'
      );
      expect(document.activeElement).toBe(dialogContainer);

      wrapper.unmount();
    });

    it("should not focus the first element when disableAutoFocus is passed", () => {
      wrapper = mount(
        <DialogFullScreen open disableAutoFocus>
          <input type="text" />
        </DialogFullScreen>
      );

      jest.runAllTimers();

      const firstFocusableElement = document.querySelector("input");
      expect(document.activeElement).not.toBe(firstFocusableElement);

      wrapper.unmount();
    });
  });

  describe("focusFirstElement", () => {
    it("should focus on the element passes as focusFirstElement prop", () => {
      jest.useFakeTimers();
      const Component = () => {
        const secondInputRef = useRef(null);
        return (
          <DialogFullScreen focusFirstElement={secondInputRef} open>
            <input type="text" />
            <input type="text" ref={secondInputRef} />
          </DialogFullScreen>
        );
      };
      wrapper = mount(<Component />);

      jest.runAllTimers();

      const secondFocusableElement = document.querySelectorAll("input")[1];
      expect(document.activeElement).toEqual(secondFocusableElement);

      wrapper.unmount();
    });
  });

  describe("disableContentPadding", () => {
    wrapper = mount(
      <DialogFullScreen
        open
        className="foo"
        title="my title"
        onCancel={onCancel}
        disableContentPadding
      >
        <div>test content</div>
      </DialogFullScreen>
    );

    assertStyleMatch(
      {
        padding: "0",
      },
      wrapper.find(StyledContent)
    );

    wrapper.unmount();
  });

  describe("children", () => {
    it("renders the children passed to it", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          className="foo"
          title="my title"
          onCancel={onCancel}
        >
          <Button>Button</Button>
          <Button>Button</Button>
        </DialogFullScreen>
      );

      expect(wrapper.find(Modal).find(Button).length).toEqual(2);

      wrapper.unmount();
    });
  });

  describe("onOpening", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      wrapper = mount(<DialogFullScreen open={false} />);
      wrapper.setProps({ open: true });
      jest.runAllTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
      wrapper.unmount();
    });

    it("sets overflow hidden to the body", () => {
      expect(window.document.body.style.overflow).toBe("hidden");
    });
  });

  describe("onClosing", () => {
    beforeEach(() => {
      wrapper = mount(
        <DialogFullScreen style={{ overflow: "auto" }} open={false} />
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("recovers an original overflow", () => {
      window.document.body.style.overflow = "auto";
      expect(window.document.body.style.overflow).toBe("auto");
      wrapper.setProps({ open: true });
      expect(window.document.body.style.overflow).toBe("hidden");
      wrapper.setProps({ open: false });
      expect(window.document.body.style.overflow).toBe("auto");
    });
  });

  describe("on unmount", () => {
    beforeEach(() => {
      wrapper = mount(
        <DialogFullScreen style={{ overflow: "auto" }} open={false} />
      );
    });

    it("recovers an original overflow", () => {
      window.document.body.style.overflow = "auto";
      expect(window.document.body.style.overflow).toBe("auto");
      wrapper.setProps({ open: true });
      expect(window.document.body.style.overflow).toBe("hidden");
      wrapper.unmount();
      expect(window.document.body.style.overflow).toBe("auto");
    });
  });

  describe("dialogTitle", () => {
    describe("is a string", () => {
      let mockIds;

      it("renders the title within a heading", () => {
        mockIds = ["foo", "baz"];
        guid
          .mockImplementationOnce(() => mockIds[0])
          .mockImplementationOnce(() => mockIds[1]);
        wrapper = mount(
          <DialogFullScreen open title="my title" subtitle="my subtitle" />
        );
        const heading = wrapper.find(Heading);

        expect(heading.props().title).toEqual("my title");
        expect(heading.props().subheader).toEqual("my subtitle");
        expect(mockIds).toContain(heading.props().titleId);
        expect(mockIds).toContain(heading.props().subtitleId);

        wrapper.unmount();
      });
    });

    describe("is an object", () => {
      beforeEach(() => {
        const titleHeading = <Heading title="my custom heading" />;
        wrapper = mount(
          <DialogFullScreen
            onCancel={onCancel}
            className="foo"
            open
            title={titleHeading}
          >
            <Button>Button</Button>
            <Button>Button</Button>
          </DialogFullScreen>
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it("renders the component in a full screen heading", () => {
        const fullScreenHeading = wrapper.find(FullScreenHeading);
        const heading = fullScreenHeading.find(Heading);

        expect(heading.props().title).toEqual("my custom heading");
      });
    });

    describe("when prop help is passed", () => {
      it("should render Help component", () => {
        wrapper = mount(
          <DialogFullScreen
            open
            title="This is test title"
            help="this is help text"
          />
        );

        expect(wrapper.find(Help).exists()).toBe(true);

        wrapper.unmount();
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      it("include correct component, elements and role data tags on modal", () => {
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            title="Test"
            data-role="baz"
            data-element="bar"
          />
        );

        expect(wrapper.find(Modal).props()["data-element"]).toEqual("bar");
        expect(wrapper.find(Modal).props()["data-role"]).toEqual("baz");

        wrapper.unmount();
      });
    });
  });

  describe("when showCloseIcon is false", () => {
    it("does not render close icon", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          title="Test"
          data-role="baz"
          data-element="bar"
          showCloseIcon={false}
        />
      );
      expect(wrapper.find(IconButton).first().length).toEqual(0);

      wrapper.unmount();
    });
  });

  describe("when onCancel is not provided", () => {
    it("does not render close icon", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onConfirm={() => {}}
          title="Test"
          data-role="baz"
          data-element="bar"
        />
      );
      expect(wrapper.find(IconButton).first().length).toEqual(0);

      wrapper.unmount();
    });
  });

  describe("when onCancel and showCloseIcon are provided", () => {
    it("renders close icon", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          title="Test"
          data-role="baz"
          data-element="bar"
        />
      );
      expect(wrapper.find(IconButton).first().length).toEqual(1);

      wrapper.unmount();
    });
  });

  describe("when headerChildren prop set", () => {
    const HeaderChildren = <div id="header-children">Some content</div>;

    it("renders the content inside of the header", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          title="Test"
          data-role="baz"
          data-element="bar"
          headerChildren={HeaderChildren}
        />
      );
      expect(
        wrapper.find(FullScreenHeading).find("#header-children").length
      ).toEqual(1);

      wrapper.unmount();
    });
  });

  /** Remove this when after Pages is re-written */
  describe("when pagesStyling prop set", () => {
    it("applies the Pages specific styling", () => {
      wrapper = mount(
        <DialogFullScreen
          open
          onCancel={() => {}}
          onConfirm={() => {}}
          data-role="baz"
          data-element="bar"
          pagesStyling
        />
      );

      const styles = wrapper.find(StyledDialogFullScreen);

      assertStyleMatch(
        {
          padding: "0",
        },
        styles,
        { modifier: `${StyledContent}` }
      );

      assertStyleMatch(
        {
          margin: "0",
          position: "absolute",
          right: "33px",
          top: "32px",
          zIndex: "1",
        },
        styles,
        { modifier: `${StyledIconButton}` }
      );

      assertStyleMatch(
        {
          padding: "32px 32px 0",
        },
        styles,
        { modifier: `${StyledFullScreenHeading}` }
      );

      assertStyleMatch(
        {
          width: "auto",
          paddingTop: "4px",
        },
        styles,
        { modifier: `${StyledHeading}` }
      );

      assertStyleMatch(
        {
          width: "100%",
          boxSizing: "content-box",
          margin: "0 0 0 3px",
        },
        styles,
        { modifier: `${StyledHeading} ${StyledHeader}` }
      );

      wrapper.unmount();
    });
  });

  describe("ARIA attributes", () => {
    it("by default, set role to `dialog` and aria-modal to true", () => {
      wrapper = mount(
        <DialogFullScreen open onCancel={() => {}} onConfirm={() => {}} />
      );

      expect(
        wrapper
          .find("[data-element='dialog-full-screen']")
          .first()
          .prop("aria-modal")
      ).toBe(true);

      expect(
        wrapper.find("[data-element='dialog-full-screen']").first().prop("role")
      ).toBe("dialog");

      wrapper.unmount();
    });

    describe("when a title is specified as string", () => {
      it("then the container should have aria-labeledby attribute set to it's header's id", () => {
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            data-role="baz"
            data-element="bar"
            title="Test"
          />
        );

        expect(
          wrapper
            .find("[data-element='dialog-full-screen']")
            .first()
            .prop("aria-labelledby")
        ).toBe("guid-12345");

        wrapper.unmount();
      });
    });

    describe("when a subtitle is specified", () => {
      it("then the container should have aria-describedBy attribute set to it's subtitle id", () => {
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            data-role="baz"
            data-element="bar"
            subtitle="Subtitle"
          />
        );

        expect(
          wrapper
            .find("[data-element='dialog-full-screen']")
            .first()
            .prop("aria-describedby")
        ).toBe("guid-12345");

        wrapper.unmount();
      });
    });

    describe("when the aria-labelledby prop is specified", () => {
      it("then the container should have the same aria-labeledby attribute", () => {
        const titleId = "foo";

        wrapper = mount(
          <DialogFullScreen
            aria-labelledby={titleId}
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            data-role="baz"
            data-element="bar"
            title={<div id={titleId}>Foo</div>}
          />
        );

        expect(
          wrapper
            .find("[data-element='dialog-full-screen']")
            .first()
            .prop("aria-labelledby")
        ).toBe(titleId);

        wrapper.unmount();
      });
    });

    describe("when the role prop is specified", () => {
      it("then the container should have the same role attribute", () => {
        const dialogRole = "foo";
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            data-role="baz"
            data-element="bar"
            role={dialogRole}
          />
        );
        expect(
          wrapper
            .find("[data-element='dialog-full-screen']")
            .first()
            .prop("role")
        ).toBe(dialogRole);

        wrapper.unmount();
      });
    });

    describe("when the aria-label prop is specified", () => {
      it("then the container should have the same aria-label attribute", () => {
        const label = "foo";
        wrapper = mount(
          <DialogFullScreen
            open
            onCancel={() => {}}
            onConfirm={() => {}}
            data-role="baz"
            data-element="bar"
            aria-label={label}
          />
        );
        expect(
          wrapper
            .find("[data-element='dialog-full-screen']")
            .first()
            .prop("aria-label")
        ).toBe(label);

        wrapper.unmount();
      });
    });
  });
});

describe("closeIcon", () => {
  let wrapper;
  let onCancel;

  beforeEach(() => {
    jest.restoreAllMocks();
    onCancel = jest.fn();

    wrapper = mount(
      <DialogFullScreen
        open
        onCancel={onCancel}
        onConfirm={() => {}}
        title="Test"
        data-role="baz"
        data-element="bar"
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("closes when the exit icon is clicked", () => {
    wrapper.find(IconButton).first().simulate("click");
    expect(onCancel).toHaveBeenCalled();
  });

  it("closes when exit icon is focused and Enter key is pressed", () => {
    const icon = wrapper.find(IconButton).first();
    icon.simulate("keyDown", { key: "Enter" });
    expect(onCancel).toHaveBeenCalled();
  });

  it("does not close when exit icon is focused any other key is pressed", () => {
    const icon = wrapper.find(IconButton).first();
    icon.simulate("keyDown", { key: "a" });
    expect(onCancel).not.toHaveBeenCalled();
  });
});
