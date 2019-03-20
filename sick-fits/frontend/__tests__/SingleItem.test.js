import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import wait from 'waait';
import SingleItem, { SINGLE_ITEM_QUERY } from '../components/SingleItem';
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeItem } from '../lib/testUtils';

describe('<SingleItem> ', () => {
  it('Renders with proper data', async () => {
    const mocks = [
      {
        // When someone makes a reqeust with this query and variable combo
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        // Return this faked data (mocked data)
        result: {
          data: {
            item: fakeItem()
          }
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="123" />
      </MockedProvider>
    );
    // console.log(wrapper.debug());
    expect(wrapper.text()).toContain('Loading…');
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    expect(toJSON(wrapper.find('h2'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('img'))).toMatchSnapshot();
    expect(toJSON(wrapper.find('p'))).toMatchSnapshot();
  });

  it('Errors with a not found item', async () => {
    const mocks = [
      {
        request: { query: SINGLE_ITEM_QUERY, variables: { id: '123' } },
        result: {
          errors: [{ message: 'Item Not Found!' }]
        }
      }
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <SingleItem id="123" />
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    // console.log(wrapper.debug());
    const item = wrapper.find('[data-test="graphql-error"]');
    console.log(item.debug());
    expect(item.text()).toContain('Shoot!Item Not Found');
    expect(toJSON(item)).toMatchSnapshot();
  });
});
