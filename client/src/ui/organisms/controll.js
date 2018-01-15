import React, { Component } from 'react'
import { connect } from 'react-redux'
import InputRange from 'react-input-range'
import {
  FlexWrap,
} from '../'
import { setBorderFromCanvas, setGifImage } from '../../redux/actions/gif'
import playIcon from '../../assets/img/play.png'
import pauseIcon from '../../assets/img/pause.png'
import getBanner from '../../helpers/get-banner'
import { compressExt } from '../../config'
/* eslint-disable  radix */

const ControllWrapp = FlexWrap.extend`
  border-radius: 0 0 5px 5px;
  background: #808080;
  align-items: center;
  height: 90px;
  & img {
    margin: 0 35px;
    cursor: pointer;
  } & .set-screen {
    display: flex;
    width: 140px;
    height: 100%;
    background: #c8c8c8;
    margin-left: 40px;
    align-items: center;
    cursor: pointer;
    text-align: center;
    color: #3c638a;
    padding: 0 15px;
  } & .minimal-width {
    margin-left: 0;
    background: #efefef;
    color: #969696;
  }
`

class Controll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      duration: props.instance.timeline.duration,
      isPlay: false,
    }
    this.playStart()
  }

  removeOldBorder = () => {
    const { wnd, exportRoot } = this.props

    if (typeof wnd.s !== 'undefined') {
      exportRoot.removeChild(wnd.s)
    }
  }

  playStart = () => {
    const { instance } = this.props

    setInterval(() => {
      if (!this.state.isPlay
        || this.state.step > this.state.duration) return

      this.setState({ step: parseInt(this.state.step) + 1 }, () => {
        instance.gotoAndStop(this.state.step)
      })
    }, 30)
  }

  changeTimeLine = (value) => {
    this.setState({ step: value }, () => {
      const { instance } = this.props

      instance.gotoAndStop(this.state.step)
    })
  }

  render() {
    const { duration, isPlay } = this.state
    const { setImageFromGif, w, resize } = this.props

    return (
      <ControllWrapp
        className="controllrange"
        width="100%"
      >
        {!isPlay && (
          <img
            alt="play"
            src={playIcon}
            onClick={() => this.setState({ isPlay: true })}
          />
        )}
        {isPlay && (
          <img
            alt="repat"
            src={pauseIcon}
            onClick={() => this.setState({ isPlay: false })}
          />
        )}
        <InputRange
          formatLabel={value => `${value}мск`}
          maxValue={duration}
          minValue={1}
          value={this.state.step}
          onChange={this.changeTimeLine}
        />
        <div
          role="button"
          className="set-screen"
          onClick={() => {
            setImageFromGif(
              getBanner(true).canvas.toDataURL(`image/${compressExt}`, 1),
              w,
            )
          }}
        >
          Заскринить кадр
        </div>
        {!resize.isFixed && (
          <div
            role="button"
            className="set-screen minimal-width"
          >
            минимальная ширина
          </div>
        )}
      </ControllWrapp>
    )
  }
}

export const ControllWithHoc = connect(
  state => ({
    w: state.gifs.w,
    h: state.gifs.h,
    nameFolder: state.archiveUpload.treeFolders.name,
    nameFile: state.archiveUpload.nameHtml,
    resize: state.resize,
  }),
  dispatch => ({
    onSetBorder: (data) => {
      dispatch(setBorderFromCanvas(data))
    },
    setImageFromGif: (base64, w) => {
      dispatch(setGifImage(base64, w))
    },
  }),
)(Controll)
