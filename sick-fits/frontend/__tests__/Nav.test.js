import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeUser, fakeCartItem } from '../lib/testUtils';

const notSignedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: null } }
  }
];

const signedInMocks = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me: fakeUser() } }
  }
];

const signedInMocksWithCartItems = [
  {
    request: { query: CURRENT_USER_QUERY },
    result: {
      data: {
        me: {
          ...fakeUser(),
          cart: [fakeCartItem(), fakeCartItem(), fakeCartItem()]
        }
      }
    }
  }
];

describe('<Nav/>', () => {
  it('Renders a minimal nav when signed out', async () => {
    const wrapper = mount(
      <MockedProvider mocks={notSignedInMocks}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    console.log(wrapper.debug());
    const nav = wrapper.find('ul[data-test="nav"]');
    console.log(nav.debug());
    expect(toJSON(nav)).toMatchSnapshot();
  });

  it('Renders full nav when user is authenticated', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocks}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    console.log(nav.debug());
    expect(nav.children().length).toBe(6);
    expect(nav.text()).toContain('Sign Out');
    // expect(toJSON(nav)).toMatchSnapshot();
  });

  it('Renders the amount of items in the cart', async () => {
    const wrapper = mount(
      <MockedProvider mocks={signedInMocksWithCartItems}>
        <Nav />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    const nav = wrapper.find('ul[data-test="nav"]');
    // console.log(nav.debug());
    const count = nav.find('div.count');
    console.log(count.debug());
    expect(toJSON(count)).toMatchSnapshot();
  });
});
