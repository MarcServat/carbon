import React from "react";
import { mount } from "enzyme";
import Textbox from ".";
import InputIconToggle from "../../__internal__/input-icon-toggle";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import InputPresentation from "../../__internal__/input/input-presentation.component";
import InputPresentationStyle from "../../__internal__/input/input-presentation.style";
import FormField from "../../__internal__/form-field";
import StyledValidationIcon from "../../__internal__/validations/validation-icon.style";
import StyledPrefix from "./__internal__/prefix.style";
import Label from "../../__internal__/label";
import FormFieldStyle from "../../__internal__/form-field/form-field.style";
import CharacterCount from "../../__internal__/character-count";
import I18nProvider from "../i18n-provider";
import baseTheme from "../../style/themes/base";
import Tooltip from "../tooltip";
import StyledHelp from "../help/help.style";
import { StyledFormField, ErrorBorder, StyledHintText } from "./textbox.style";
import StyledValidationMessage from "../../__internal__/validation-message/validation-message.style";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import InputIconToggleStyle from "../../__internal__/input-icon-toggle/input-icon-toggle.style";

jest.mock("../../__internal__/utils/helpers/guid", () => () => "mocked-guid");

describe("Textbox", () => {
  testStyledSystemMargin(
    (props) => <Textbox {...props} />,
    undefined,
    (component) => component.find(FormFieldStyle),
    { modifier: "&&&" }
  );

  it("renders a counter", () => {
    const wrapper = mount(<Textbox value="test string" characterLimit="100" />);

    expect(wrapper.find(CharacterCount).text()).toBe("11/100");
  });

  it("renders a counter with an over limit warning", () => {
    const wrapper = mount(
      <Textbox
        value="test string"
        characterLimit="10"
        enforceCharacterLimit={false}
        warnOverLimit
      />
    );

    assertStyleMatch(
      {
        color: baseTheme.colors.error,
      },
      wrapper.find(CharacterCount)
    );
  });

  it("sets max length", () => {
    const wrapper = mount(<Textbox value="test string" characterLimit="100" />);

    expect(wrapper.find(CharacterCount).text()).toBe("11/100");
    expect(wrapper.find("input").prop("maxLength")).toBe("100");
  });

  it("supports a separate onClick handler passing for the icon", () => {
    const onClick = jest.fn();
    const iconOnClick = jest.fn();

    const wrapper = mount(
      <Textbox
        value="foobar"
        inputIcon="search"
        onClick={onClick}
        iconOnClick={iconOnClick}
      >
        normal children
      </Textbox>
    );
    const icon = wrapper.find(InputIconToggle);
    icon.simulate("click");
    expect(iconOnClick).toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  });

  describe("validation icon", () => {
    const validationTypes = ["error", "warning", "info"];
    it.each(validationTypes)(
      "when %s prop passed as string render proper validation icon by the input",
      (type) => {
        const wrapper = mount(
          <Textbox label="Label" {...{ [type]: "Message" }} />
        );
        expect(
          wrapper.find(InputPresentation).find(StyledValidationIcon).exists()
        ).toBe(true);
      }
    );
    it.each(validationTypes)(
      `when %s prop passed as string and validationOnLabel
     as true render proper validation icon on the label`,
      (type) => {
        const wrapper = mount(
          <Textbox label="Label" {...{ [type]: "Message" }} validationOnLabel />
        );
        expect(
          wrapper.find(FormField).find(StyledValidationIcon).exists()
        ).toBe(true);
      }
    );

    describe("overriding the tooltip position", () => {
      it.each([
        ["top", true],
        ["bottom", true],
        ["left", true],
        ["top", false],
        ["bottom", false],
        ["left", false],
      ])(
        "should pass the expected value rather than the default ('right')",
        (tooltipPosition, onLabel) => {
          const wrapper = mount(
            <Textbox
              label="Label"
              error="Message"
              validationOnLabel={onLabel}
              tooltipPosition={tooltipPosition}
            />
          );

          const { position } = wrapper.find(Tooltip).props();

          expect(position).toEqual(tooltipPosition);
        }
      );
    });
  });

  describe("when the prefix prop is set", () => {
    it("then a StyledPrefix should be rendered with this prop value", () => {
      const prefixValue = "bar";
      const wrapper = mount(<Textbox value="foo" prefix={prefixValue} />);
      expect(wrapper.find(StyledPrefix).exists()).toBe(true);
      expect(wrapper.find(StyledPrefix).text()).toBe(prefixValue);
    });
  });

  describe("required", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<Textbox value="foo" label="Required" required />);
    });

    it("the required prop is passed to the input", () => {
      const input = wrapper.find("input");
      expect(input.prop("required")).toBe(true);
    });

    it("the isRequired prop is passed to the label", () => {
      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });

  describe("Prefix", () => {
    it("should have expected styles", () => {
      assertStyleMatch(
        {
          alignSelf: "center",
          fontWeight: "900",
          marginRight: "8px",
        },
        mount(<StyledPrefix>abc</StyledPrefix>)
      );
    });
  });

  describe("positionedChildren", () => {
    it("passes positionedChildren prop to the InputPresentation component", () => {
      const Component = () => <div />;
      const wrapper = mount(<Textbox positionedChildren={<Component />} />);
      expect(
        wrapper.find(InputPresentation).props().positionedChildren
      ).toEqual(<Component />);
    });
  });

  describe("i18n", () => {
    it.each([
      ["en-GB", "0/1,000,000"],
      ["fr-FR", "0/1 000 000"],
    ])("displays %s format", (locale, limit) => {
      const wrapper = mount(<Textbox value="" characterLimit="1000000" />, {
        wrappingComponent: I18nProvider,
        wrappingComponentProps: {
          locale: {
            locale: () => locale,
          },
        },
      });

      expect(wrapper.find(CharacterCount).text()).toBe(limit);
    });
  });

  describe("label help", () => {
    it("passes the expected values to the help component", () => {
      const text = "foo";
      const wrapper = mount(
        <Textbox value="" label={text} labelHelp={text} helpAriaLabel={text} />
      );

      expect(wrapper.find(StyledHelp).prop("aria-label")).toEqual(text);
    });
  });

  describe("size", () => {
    it.each(["extra-small", "small", "medium", "large"])(
      "applies the expected styling when component is %s",
      (size) => {
        const wrapper = mount(<Textbox size={size} />);

        assertStyleMatch(
          {
            fontSize: size === "large" ? "16px" : "14px",
          },
          wrapper.find(StyledFormField),
          { modifier: `${InputPresentationStyle}` }
        );
      }
    );

    it("applies the expected styling when size is extra-small and has inputIcon", () => {
      const wrapper = mount(
        <Textbox size="extra-small" inputIcon="settings" />
      );

      assertStyleMatch(
        {
          paddingRight: "10px",
        },
        wrapper.find(StyledFormField),
        { modifier: `${InputPresentationStyle}` }
      );

      assertStyleMatch(
        {
          marginLeft: "-4px",
        },
        wrapper.find(StyledFormField),
        { modifier: `${InputIconToggleStyle}` }
      );
    });
  });

  describe("new validations", () => {
    const renderWithNewValidations = ({ error, warning }) =>
      mount(
        <CarbonProvider validationRedesignOptIn>
          <Textbox
            labelHelp="Example hint text"
            error={error}
            warning={warning}
            labelAlign="left"
            labelInline
            labelWidth={100}
            reverse
          />
        </CarbonProvider>
      );

    describe("label width and align props", () => {
      it("default to undefined", () => {
        const wrapper = renderWithNewValidations({});
        const { labelAlign, labelInline, reverse, labelWidth } = wrapper
          .find(StyledFormField)
          .props();

        expect(labelAlign).toEqual(undefined);
        expect(labelInline).toEqual(undefined);
        expect(reverse).toEqual(undefined);
        expect(labelWidth).toEqual(undefined);
      });
    });

    describe("disabled", () => {
      it("applies the expected styling to the input icon", () => {
        const wrapper = mount(<Textbox disabled inputIcon="home" />);

        assertStyleMatch(
          {
            cursor: "not-allowed",
          },
          wrapper.find(StyledFormField),
          { modifier: `${InputIconToggleStyle}` }
        );

        assertStyleMatch(
          {
            color: baseTheme.readOnly.textboxIconColor,
          },
          wrapper.find(StyledFormField),
          { modifier: `${InputIconToggleStyle} span` }
        );
      });
    });

    describe("readOnly", () => {
      it("applies the expected styling to the input icon", () => {
        const wrapper = mount(<Textbox readOnly inputIcon="home" />);

        assertStyleMatch(
          {
            cursor: "not-allowed",
          },
          wrapper.find(StyledFormField),
          { modifier: `${InputIconToggleStyle}` }
        );

        assertStyleMatch(
          {
            color: baseTheme.readOnly.textboxIconColor,
          },
          wrapper.find(StyledFormField),
          { modifier: `${InputIconToggleStyle} span` }
        );
      });
    });

    describe("hint", () => {
      it("is visible when the prop is passed", () => {
        const wrapper = renderWithNewValidations({});
        expect(wrapper.find(StyledHintText).exists()).toEqual(true);
      });
    });

    describe("new validation design", () => {
      it("error message is visible when the prop is passed", () => {
        const wrapper = renderWithNewValidations({ error: "error" });
        expect(wrapper.find(ErrorBorder).exists()).toEqual(true);
        expect(wrapper.find(StyledValidationMessage).exists()).toEqual(true);
      });

      it("warning message is visible when the prop is passed", () => {
        const wrapper = renderWithNewValidations({ warning: "warning" });
        expect(wrapper.find(ErrorBorder).exists()).toEqual(true);
        expect(wrapper.find(StyledValidationMessage).exists()).toEqual(true);
      });
    });
  });
});
