// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018-2022  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import KeymapDB from "@api/focus/keymap/db";
import React from "react";
import useTheme from "@mui/material/styles/useTheme";

const db = new KeymapDB();

const Key = (props) => {
  const theme = useTheme();

  let shape;
  const stroke = props.active
    ? theme.palette.primary.light
    : theme.palette.grey[500];

  if (props.palmKey) {
    shape = (
      <ellipse
        fill={props.color}
        stroke={stroke}
        strokeWidth="5.5"
        cx="610.765"
        cy="953.469"
        rx="75.6"
        ry="56.001"
        transform={props.shape}
      />
    );
  } else {
    shape = (
      <path
        fill={props.color}
        stroke={stroke}
        strokeWidth="3.5"
        d={props.shape}
      />
    );
  }

  const keyIndex = parseInt(props.row) * 16 + parseInt(props.col);
  let extraLabel;
  const key = props.keyObj;

  let legendClass = "";
  let mainLegendClass = "";
  const legend = key && db.format(key, { layerNames: props.layerNames });
  if (key && (legend.main || "").length <= 1 && !legend.hint)
    legendClass = "short-legend";
  if (key && (legend.main || "").length <= 1) mainLegendClass = "short-legend";

  if (props.extraLabelTransform && legend?.hint) {
    extraLabel = (
      <g transform={props.extraLabelTransform}>
        <text
          x={props.x}
          y={props.y - 3}
          className={legendClass}
          fill={theme.palette.getContrastText(props.color)}
        >
          {legend?.hint}
        </text>
      </g>
    );
  }

  return (
    <g
      onClick={props.onClick}
      className="key"
      data-key-index={keyIndex}
      data-layer={props.layer}
      data-led-index={props.ledIndex}
    >
      {shape}
      <g transform={props.primaryLabelTransform}>
        <text
          x={props.x}
          y={props.y}
          fill={theme.palette.getContrastText(props.color)}
          className={mainLegendClass}
        >
          {legend?.main}
        </text>
      </g>
      {extraLabel}
    </g>
  );
};

export default Key;
