import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  FlexWrap,
  Text,
} from '../'

/* eslint-disable react/no-array-index-key */

const extensions = [
  '.jpg', '.png', '.jpeg',
]

const Folder = Text.extend`
  border-bottom: 1px solid #eaecef;
  padding: 10px 0;
  box-sizing: border-box;
  margin: 0;
  color: #0366d6;
  cursor: pointer;
`
const TreeWrap = FlexWrap.extend`
  
`

export class RenderTree extends Component {
  addImage = (img) => {
    const { folders, archiveName } = this.props

    if (img.type === 'file'
        && extensions.indexOf(img.extension) !== -1) {
      this.props.onAddImage({
        path: img.path,
        originalSize: img.size,
        name: img.name,
        replacer: 'decompress',
        type: 'process',
      })
    }
  }

  render() {
    const { folders, onAddImage, deep, archiveName } = this.props

    return (
      <FlexWrap
        w="100%"
        fd="column"
      >
        <Folder
          onClick={() => this.addImage(folders)}
        >
          {folders.name}
        </Folder>
        <FlexWrap
          fd="column"
          w="100%"
        >
          {
            folders.children && folders.children.map((item, key) => (
              <RenderTree
                folders={item}
                archiveName={archiveName}
                key={key}
                onAddImage={onAddImage}
                deep={key}
              />
            ))
          }
        </FlexWrap>
      </FlexWrap>
    )
  }
}

RenderTree.propTypes = {
  folders: PropTypes.shape({
    name: PropTypes.string,
    children: PropTypes.array,
    type: PropTypes.string,
    size: PropTypes.number,
  }).isRequired,
  archiveName: PropTypes.string.isRequired,
  onAddImage: PropTypes.func.isRequired,
  deep: PropTypes.number,
}

RenderTree.defaultProps = {
  deep: 0,
}
