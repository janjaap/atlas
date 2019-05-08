import React from 'react';
import { mount } from 'enzyme';
import withModalBehaviour from './withModalBehaviour';

describe('withModalBehaviour HOC', () => {
  it('should set the state.open to true when event is triggered', () => {
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    const FakeComponent = () => (
      <div />
    );
    const ReactComponent = withModalBehaviour(FakeComponent);
    const component = mount(<ReactComponent id="foo" />);
    const instance = component.instance();

    expect(instance.state.open).toBe(false);
    map.openForm_foo({});
    expect(instance.state.open).toBe(true);
  });
});
