import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { render as testingLibRender } from "@testing-library/react";
import "jest-styled-components";
import configureStore from "redux-mock-store";
import { initialState } from "../redux/rootReducer";

const mockStore = configureStore();

type TargetType = React.ComponentElement<any, any> | React.ElementType;

type Props = {
  target: TargetType;
  initialState: Record<string, unknown>;
  path?: Array<string>;
};

export const TargetWithMockState: React.ElementType = ({
  target,
  initialState,
  path,
}: Props) => {
  const MockedTarget: React.ElementType = () => (
    <Provider store={mockStore(initialState)}>{target}</Provider>
  );

  return path ? (
    <MemoryRouter initialEntries={path}>
      <MockedTarget />
    </MemoryRouter>
  ) : (
    <MockedTarget />
  );
};

export const createBasicSnapshotTest = (
  target: TargetType,
  path?: Array<string>,
  state?: Record<string, unknown> | Array<unknown>
) => {
  it("should match snapshot via react-test-renderer.", () => {
    const tree = renderer
      .create(
        <TargetWithMockState
          target={target}
          path={path}
          initialState={{ ...initialState, ...state }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
};

export const render = (
  target: TargetType,
  path?: Array<string>,
  state?: Record<string, unknown> | Array<unknown>
) =>
  testingLibRender(
    <TargetWithMockState
      target={target}
      path={path}
      initialState={{ ...initialState, ...state }}
    />
  );
