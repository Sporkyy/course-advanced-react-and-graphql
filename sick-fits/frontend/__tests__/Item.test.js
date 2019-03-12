import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 4000,
  description: 'This item is really cool!',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg'
};

describe('<Item/>', () => {
  it('Renders and matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  // it('Renders the image properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const img = wrapper.find('img');
  //   expect(img.props().src).toBe(fakeItem.image);
  //   expect(img.props().alt).toBe(fakeItem.title);
  // });

  // it('Renders the pricetag and title', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   // console.log(wrapper.debug());
  //   const PriceTag = wrapper.find('PriceTag');
  //   // console.log(PriceTag.debug());
  //   // console.log(PriceTag.children().text());
  //   expect(PriceTag.children().text()).toBe('$50');
  //   expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  // });

  // it('Renders out the buttons properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   console.log(wrapper.debug());
  //   const buttonList = wrapper.find('.buttonList');
  //   expect(3 === buttonList.children().length);
  //   // console.log(buttonList.debug());
  //   expect(buttonList.find('Link')).toHaveLength(1);
  //   expect(buttonList.find('Link').exists()).toBeTruthy();
  //   expect(buttonList.find('AddToCart').exists()).toBeTruthy();
  //   expect(buttonList.find('DeleteItem').exists()).toBeTruthy();
  // });
});
