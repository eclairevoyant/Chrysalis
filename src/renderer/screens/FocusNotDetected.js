// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
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

import React from "react";

import Focus from "../../api/focus";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import Typography from "@mui/material/Typography";

import { toast } from "react-toastify";

import i18n from "../i18n";
import { navigate } from "../routerHistory";
import { PageTitle } from "../components/PageTitle";

const FocusNotDetected = (props) => {
  let focus = new Focus();
  const focusDeviceDescriptor =
    props.focusDeviceDescriptor || focus.focusDeviceDescriptor;

  const reconnect = async () => {
    try {
      await props.onConnect({
        path: focus._port.path,
        focusDeviceDescriptor: focusDeviceDescriptor,
      });
    } catch (err) {
      toast.error(err.toString());
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PageTitle title={i18n.t("focus-not-detected.title")} />
      <Card
        sx={{
          margin: 4,
          maxWidth: "50%",
        }}
      >
        <CardHeader
          avatar={
            <Avatar>
              <KeyboardIcon />
            </Avatar>
          }
          title={focusDeviceDescriptor.info.displayName}
          subheader={focus._port && focus._port.path}
        />
        <CardContent>
          <Typography component="p" gutterBottom>
            {i18n.t("focus-not-detected.contents", {
              buttonName: i18n.t("app.menu.firmwareUpdate"),
            })}
          </Typography>
          {focus._port && (
            <Typography component="p" gutterBottom>
              {i18n.t("focus-not-detected.reconnectDescription", {
                buttonName: i18n.t("focus-not-detected.reconnect"),
              })}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {focus._port && (
            <Button color="secondary" onClick={reconnect}>
              {i18n.t("focus-not-detected.reconnect")}
            </Button>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="primary"
            variant="outlined"
            onClick={async () => {
              await navigate("/firmware-update");
            }}
          >
            {i18n.t("focus-not-detected.gotoUpdate", {
              buttonName: i18n.t("app.menu.firmwareUpdate"),
            })}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default FocusNotDetected;
