import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Chat from "./Chat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faWindowMinimize } from "@fortawesome/free-solid-svg-icons";

describe("Chat", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => (wrapper = shallow(<Chat />)));

  // it('should render correctly', () => expect(wrapper).toMatchSnapshot());
  it("should render a header", () => {
    expect(wrapper.find(".header").length).toEqual(1);
  });

  it("should render a <div />", () => {
    expect(wrapper.find("div").length).toEqual(7);
  });

  it("renders minimize and close icon Component", () => {
    expect(wrapper.containsMatchingElement(<FontAwesomeIcon icon={faWindowMinimize} />)).toEqual(true);
    expect(wrapper.containsMatchingElement(<FontAwesomeIcon icon={faTimes} />)).toEqual(true);
  });

  it("should write multiple text inside <div />", () => {
    const input = wrapper.find("input");

    input.simulate("focus");

    input.simulate("keypress", { key: "Enter", currentTarget: { value: "Hello" } });
    expect(wrapper.find(".messages").text()).toBe("Hello");

    input.simulate("keypress", { key: "Enter", currentTarget: { value: "there" } });
    expect(wrapper.find(".messages").text()).toBe("there");
  });
});
