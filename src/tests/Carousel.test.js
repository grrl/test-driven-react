import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../Carousel';
import CarouselButton from '../CarouselButton';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  let wrapper;

  const slides = [
    {
      imgUrl: 'https://example.com/slide1.png',
      description: 'Slide 1',
      attribution: 'Uno Pizzeria',
    },
    {
      imgUrl: 'https://example.com/slide2.png',
      description: 'Slide 2',
      attribution: 'Dos Equis',
    },
    {
      imgUrl: 'https://example.com/slide3.png',
      description: 'Slide 3',
      attribution: 'Three Amigos',
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides} />);
  });

  it('renders a <div>', () => {
    expect(wrapper.type()).toBe('div');
  });

  it('has a initial `slideIndex` of 0', () => {
    expect(wrapper.state('slideIndex')).toBe(0);
  });

  it('renders a CarouselButton named "Prev"', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(0)
        .prop('buttonText')
    ).toBe('Prev');
  });

  it('renders a CarouselButton named "Next"', () => {
    expect(
      wrapper
        .find(CarouselButton)
        .at(1)
        .prop('buttonText')
    ).toBe('Next');
  });

  it('decrements `slideIndex` when Prev is clicked', () => {
    wrapper.setState({ slideIndex: 1 });
    wrapper.find('[data-action="prev"]').simulate('click');
    expect(wrapper.state('slideIndex')).toBe(0);
  });

  it('increments `slideIndex` when Next is clicked', () => {
    wrapper.setState({ slideIndex: 1 });
    wrapper.find('[data-action="next"]').simulate('click');
    expect(wrapper.state('slideIndex')).toBe(2);
  });

  it('renders the current slide as a CarouselSlide', () => {
    let slideProps;
    slideProps = wrapper.find(CarouselSlide).props();

    expect(slideProps).toEqual(slides[0]);

    wrapper.setState({ slideIndex: 1 });
    slideProps = wrapper.find(CarouselSlide).props();

    expect(slideProps).toEqual(slides[1]);
  });
});
