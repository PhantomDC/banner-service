import React from 'react'
import { connect } from 'react-redux'
import {
  FlexWrap,
  Carousel,
  CarouselItem,
  ChangeImage,
} from '../'
import WithActiveImage from '../../hocs/with-active-image'


const ItemWithActive = WithActiveImage(CarouselItem)

const CompressImageWrap = ({ carousel }) => (
  <FlexWrap
    width="100%"
    fd="column"
    ai="center"
  >
    <Carousel
      component={<ItemWithActive />}
      carousel={carousel}
      width={180}
    />
    <ChangeImage />
  </FlexWrap>
)

export const CompressImage = connect(state => ({
  carousel: state.carousel,
}))(CompressImageWrap)
