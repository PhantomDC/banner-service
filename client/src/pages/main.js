import React from 'react'
import {
  RootContainer,
  ArchiveBlock,
  CompressImage,
  FlexWrap,
  ShowBannerWithArchive,
  CarouselBtn,
} from '../ui'


export const Main = () => (
  <RootContainer>
    <FlexWrap
      fd="column"
      width="100%"
    >
      <ArchiveBlock />
      <CompressImage />
      {/* <ShowBannerWithArchive/> */}
    </FlexWrap>
  </RootContainer>
)
