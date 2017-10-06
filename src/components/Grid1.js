'use strict';

import React from 'react';
import PropTypes from "prop-types"
import {CopyToClipboard} from "react-copy-to-clipboard"

const Grid = ({ dataArr, select }) => {
  if (!dataArr) return null
  let first = true
  const giphs = dataArr.map((imgObj) => {
    let img, id

    img = imgObj.images.fixed_width_small// 100px w
    id = imgObj.id

    if (first) {
      first = false
      // active
    }

    return (
      <CopyToClipboard text={img.url} onCopy={(t, res) => {console.log("copied ?", res)}}>
        <img width={img.width} height={img.height} src={img.url}
             className="m-1 giph" key={id} onClick={onClick} />
      </CopyToClipboard>
    )

    function onClick() {
      select(imgObj)
    }
  }, null)

  return (
      <div className="bg-tertiary d-flex flex-wrap">
        {giphs}
      </div>
    )
}

Grid.propTypes = {
  dataArr: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired
}

export default Grid
